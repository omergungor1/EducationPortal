const Course = require('../models/Course');
const Category = require('../models/Categories');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID
        });
        req.flash('success', 'Course created successfully!');
        res.status(201).redirect('/courses');
    } catch (err) {
        req.flash('error', 'An Error Occured!');
        res.status(400).redirect('/courses');
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories;
        const query = req.query.search;
        const category = await Category.findOne({ slug: categorySlug });

        let filter = {};

        if (categorySlug) {
            filter = { category: category._id };
        }

        if (query) {
            filter = { name: query };
        }

        if (!query && !categorySlug) {
            filter.name = {};
            filter.category = null;
        }

        const courses = await Course.find({
            $or: [
                { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
                { category: filter.category }
            ]
        }).sort('-createdAt').populate('user');
        const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({ slug: req.params.slug }).populate('user');
        const categories = await Category.find();
        res.status(200).render('course', {
            course,
            user,
            categories,
            page_name: 'courses'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.userID });
        await user.courses.addToSet({ _id: req.body.course_id });
        await user.save();
        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.releaseCourse = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.userID });
        await user.courses.pull({ _id: req.body.course_id });
        await user.save();
        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndRemove({ slug: req.params.slug });
        req.flash('error', `${course.name} has been deleted successfully!`);

        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        let { name, description, category } = req.body;

        course.name = name;
        course.description = description;
        course.category = category;
        await course.save();

        req.flash('success', `${course.name} has been updated successfully!`);

        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}