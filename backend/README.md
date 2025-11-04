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