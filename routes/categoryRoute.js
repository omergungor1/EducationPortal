const express = require('express');
const { createCategory, deleteCategory } = require('../controllers/categoryController');

const Router = express.Router();

Router.route('/').post(createCategory); //.get(getAllCategories); //http://localhost:3000/categories
Router.route('/:id').delete(deleteCategory); //.get(getAllCategories); //http://localhost:3000/categories


module.exports = Router;