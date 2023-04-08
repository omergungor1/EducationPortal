const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Categories');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (err) {
        const errors = validationResult(req);
        errors.array().forEach(error => req.flash('error', ' ' + error.msg));

        res.status(400).redirect('/register');
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                //User Session
                if (same) {
                    req.session.userID = user._id;
                    res.status(200).redirect('/users/dashboard');
                } else {
                    req.flash('error', 'Your password is not correct!');
                    res.status(400).redirect('/login');
                }
            });
        } else {
            req.flash('error', 'User is not exist!');
            res.status(400).redirect('/login');
        }

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Login Error: ' + err
        });
    }
}

exports.logoutUser = async (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(200).redirect('/');
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID }).populate('courses');
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });
    const users = await User.find();
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        categories,
        courses,
        users,
        user
    });
}