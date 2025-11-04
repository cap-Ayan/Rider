
const express = require('express');
const{body}=require('express-validator');
const protect = require('../middlewares/protect.js');

const userRouter = express.Router();
const { register } = require('../controllers/userController.js');
const { login } = require('../controllers/userController.js');
const { logout } = require('../controllers/userController.js');
const { getProfile } = require('../controllers/userController.js');



userRouter.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
   
], register);
userRouter.post('/login',[ body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')], login);
userRouter.get('/logout', logout);
userRouter.get('/profile', protect, getProfile);

// userRouter.get('/test',(req,res)=>{
//     res.send("User route is working")
// });

module.exports = userRouter;