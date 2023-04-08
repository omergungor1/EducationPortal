const express = require('express');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createCourse, getAllCourses, getCourse, enrollCourse, releaseCourse, deleteCourse, updateCourse } = require('../controllers/courseController');

const Router = express.Router();

Router.route('/').post(roleMiddleware(["teacher", "admin"]), createCourse);
Router.route('/').get(getAllCourses);
Router.route('/:slug').get(getCourse);
Router.route('/:slug').delete(deleteCourse);
Router.route('/:slug').put(updateCourse);
Router.route('/enroll').post(enrollCourse);
Router.route('/release').post(releaseCourse);


module.exports = Router;