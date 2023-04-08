const Category = require('../models/Categories');

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        req.flash('success', `${category.name} has been created successfully!`);
        res.status(201).redirect('/users/dashboard');
    } catch (err) {
        req.flash('error', `An error occured!`);
        res.status(400).redirect('/users/dashboard');
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        req.flash('success', `${category.name} has been deleted successfully!`);
        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        req.flash('error', `An error occured!`);
        res.status(400).redirect('/users/dashboard');
    }

    // try {
    //     const category = await Category.create(req.body);
    //     res.status(201).json({
    //         status: 'success',
    //         category
    //     });
    // } catch (err) {
    //     res.status(400).json({
    //         status: 'fail',
    //         message: err
    //     });
    // }
}
