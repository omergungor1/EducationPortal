const express = require('express');
const { createCategory } = require('../controllers/categoryController');

const Router = express.Router();

Router.route('/').post(createCategory); //.get(getAllCategories); //http://localhost:3000/categories


module.exports = Router;