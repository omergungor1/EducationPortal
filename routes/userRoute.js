const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const { createUser, loginUser, logoutUser, getDashboardPage } = require('../controllers/authController');
const User = require('../models/User');

const Router = express.Router();

Router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email is required')
            .custom((userEmail) => {
                return User.findOne({ email: userEmail }).then(user => {
                    if (user) {
                        return Promise.reject('Email already in use');
                    }
                })
            }),

        body('email').not().isEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    createUser); //http://localhost:3000/users/signup
Router.route('/login').post(loginUser); //http://localhost:3000/users/login
Router.route('/logout').get(logoutUser); //http://localhost:3000/users/logout
Router.route('/dashboard').get(authMiddleware, getDashboardPage); //http://localhost:3000/users/logout


module.exports = Router;