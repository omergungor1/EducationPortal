const express = require('express');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const { getAboutPage, getIndexPage, getRegisterPage, getLoginPage, getContactPage, sendEmail } = require('../controllers/pageController');

const Router = express.Router();

Router.route('/').get(getIndexPage);
Router.route('/about').get(getAboutPage);
Router.route('/register').get(redirectMiddleware, getRegisterPage);
Router.route('/login').get(redirectMiddleware, getLoginPage);
Router.route('/contact').get(getContactPage);
Router.route('/contact').post(sendEmail);


module.exports = Router; 