const nodemailer = require('nodemailer');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
    try {
        const courses = await Course.find().sort('-createdAt').limit(2);
        const totalCourses = await Course.countDocuments();
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalTeachers = await User.countDocuments({ role: 'teacher' });

        res.status(200).render('index', {
            page_name: 'index',
            totalCourses,
            totalStudents,
            totalTeachers,
            courses
        });

    } catch (err) {

        req.flash('error', 'An Error Occured!');
        res.status(400).render('index', {
            page_name: 'index'
        });
    }
}


exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: 'about'
    });
}

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: 'register'
    });
}

exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login'
    });
}

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact'
    });
}

exports.sendEmail = async (req, res) => {
    try {
        const outputMessage = `
        <h1>Message Details</h1>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: SmartEdu Contact Form</li>
        </ul>
        <h1>Message</h1>
        <p>${req.body.message}</p>
        
        <h3>Message Sent From SMARTEDU</h3>
        `;

        // Mailer-------------------------------------------------------

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'aimee6@ethereal.email',
                pass: 'XJ9MbDSxw6VN3GvuSu'
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"SmartEdu Contackt 👻" <aimee6@ethereal.email>', // sender address
            to: "omergungorco@gmail.com", // list of receivers
            subject: "SmartEdu Contact Form New Message ✔", // Subject line
            html: outputMessage, // html body
        });

        // console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        // Mailer-------------------------------------------------------

        req.flash('success', 'Message Sent Successfully');
        res.status(200).redirect('/contact');
    } catch (error) {
        req.flash('error', 'An Error Occured!');
        res.status(200).redirect('/contact');
    }

}