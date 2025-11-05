const express = require('express');
const{body}=require('express-validator');
const protect = require('../middlewares/capAuth.js');

const captainRouter = express.Router();
const { register } = require('../controllers/captainController.js');
const{login}=require('../controllers/captainController.js');
const{logout}=require('../controllers/captainController.js');
const{getCaptain}=require('../controllers/captainController.js');


captainRouter.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate number is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.type').isIn(['car','bike','auto']).withMessage('Vehicle type must be car, bike, or auto')
   
], register);

captainRouter.post('/login',[
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],login);



captainRouter.get('/logout',logout);

captainRouter.get('/profile',protect,getCaptain);





module.exports = captainRouter;