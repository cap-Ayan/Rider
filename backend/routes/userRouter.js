
const express = require('express');
const{body}=require('express-validator');

const userRouter = express.Router();
const { register } = require('../controllers/userController.js');

userRouter.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
   
], register);
// userRouter.get('/test',(req,res)=>{
//     res.send("User route is working")
// });

module.exports = userRouter;