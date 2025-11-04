# Users API — Register Endpoint

POST /api/users/register

## Description
Register a new user account. On success the server creates a user, signs a JWT and sets it as an HTTP-only cookie named `token`.

## Required headers
- `Content-Type: application/json`

## Request body (JSON)
- `name` (string) — required, minimum 3 characters
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters

Validation rules (express-validator)
- `body('name').notEmpty().withMessage('Name is required')`
- `body('email').isEmail().withMessage('Invalid email format')`
- `body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')`

## Example request (curl)
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'
```

## Responses

- 201 Created  
  Description: User created successfully. Response includes user object and sets `token` cookie.
  Example:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": {
      "_id": "64a1f3...",
      "name": "Alice",
      "email": "alice@example.com",
      "socketId": null
    }
  }
  ```

- 400 Bad Request  
  Description: Validation failed. Response contains an `errors` array from express-validator.
  Example:
  ```json
  {
    "errors": [
      { "msg": "Invalid email format", "param": "email", "location": "body" }
    ]
  }
  ```

- 500 Internal Server Error  
  Description: Unexpected server or database error. Check server logs for the full stack trace.
  Example:
  ```json
  { "success": false, "error": "Internal server error" }
  ```

## Notes / Troubleshooting
- Ensure the server registers body-parsing middleware before routes:
  ```js
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  ```
- Ensure `process.env.JWT_SECRET` is defined for JWT signing.
- If `req.body` is empty, confirm the client sets `Content-Type: application/json` and the server uses `express.json()`.
- Check MongoDB connection and unique email constraint when saving users (duplicate emails will cause a 500 unless handled).

## GET /api/users/profile

Description
- Retrieve the authenticated user's profile. The route is protected by the `protect` middleware which reads a JWT from an HTTP-only cookie named `token`.

Required headers / cookies
- Cookie: `token=<JWT>` (sent automatically by browser if the cookie is set)
- When testing with curl, send the cookie header: `-H "Cookie: token=<JWT>"` or use `-b "token=<JWT>"`

Authentication
- The `protect` middleware verifies the JWT using `process.env.JWT_SECRET` and loads the user into `req.user`.
- Ensure `cookie-parser` middleware is registered in the app: `app.use(cookieParser());`

Example request (curl)
```bash
# using a raw token
curl -X GET http://localhost:3000/api/users/profile \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# using a cookie jar (login -> use saved cookie)
curl -c cookies.txt -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"secret123"}'
curl -b cookies.txt -X GET http://localhost:3000/api/users/profile
```
- 200 ok  
  Description: Authenticated — returns the user object loaded by the middleware.
  Example:
  ```json
  {
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "_id": "64a1f3...",
    "name": "Alice",
    "email": "alice@example.com",
    "socketId": null
  }
  }
  ```
  - 401 Unauthorized
  Description: No token provided or token invalid/expired.
  Example
  ```json
  { "success": false, "message": "Unauthorized" } 
  ```
- 500 Internal Server Error  
  Description: Unexpected server or database error. Check server logs for the full stack trace.
  Example:
  ```json
  { "success": false, "error": "Internal server error" }
  ```
 ## Notes / Troubleshooting

 - The protect middleware reads req.cookies.token. Make sure cookie-parser is used: app.use(cookieParser()).

- Ensure process.env.JWT_SECRET is set and matches the value used to sign tokens on login/register.

 - If you receive 401 even after login, verify the cookie was set (HTTP-only cookies are not visible to JS in browser devtools as a security measure — inspect response headers or use curl).Responses

- 200 OK
Description: Authenticated — returns the user object loaded by the middleware.

## POST /api/users/login

Description
- Authenticate an existing user. On success the server verifies credentials, signs a JWT and sets it as an HTTP-only cookie named `token`.

Required headers
- `Content-Type: application/json`

Request body (JSON)
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters

Validation rules (express-validator)
- `body('email').isEmail().withMessage('Invalid email format')`
- `body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')`

Example request (curl)
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'
```
## Responses

- 200 ok  
  Description: Credentials valid. Response includes user object and sets `token` cookie.
  Example:
  ```json
  {
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "_id": "64a1f3...",
    "name": "Alice",
    "email": "alice@example.com",
    "socketId": null
  }
  }
  ```
  - 400 Bad Request  
  Description: Validation failed. Response contains an `errors` array from express-validator.
  Example:
  ```json
  {
    "errors": [
      { "msg": "Invalid email format", "param": "email", "location": "body" }
    ]
  }
  ```
- Invalid credentials:
Example:
  ```json
    
  { "success": false, "error": "Invalid credentials" }

- 500 Internal Server Error  
  Description: Unexpected server or database error. Check server logs for the full stack trace.
  Example:
  ```json
  { "success": false, "error": "Internal server error" }
  ```
  ## Notes / Troubleshooting

 - The protect middleware reads req.cookies.token. Make sure cookie-parser is used: app.use(cookieParser()).

- Ensure process.env.JWT_SECRET is set and matches the value used to sign tokens on login/register.

 - If you receive 401 even after login, verify the cookie was set (HTTP-only cookies are not visible to JS in browser devtools as a security measure — inspect response headers or use curl).Responses

- 200 OK
Description: Authenticated — returns the user object loaded by the middleware.