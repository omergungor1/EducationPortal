const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();
const port = process.env.PORT || 3000;


//Database Connection
mongoose.connect('mongodb://localhost:27017/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
});

// mongoose.connect('mongodb://localhost:27017/pcat-test-db', { useNewUrlParser: true, useUnifiedTopology: true });

// Veritabanı bağlantı başarılı
mongoose.connection.on('connected', () => {
    console.log('Mongoose bağlantısı başarılı!');
});

// Veritabanı bağlantı hatası
mongoose.connection.on('error', (err) => {
    console.log('Mongoose bağlantı hatası: ' + err);
});

//Template Engine
app.set('view engine', 'ejs');
app.set('videws', './views');

//Global Variables
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: 'mongodb://localhost:27017/smartedu-db' })
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//Rotes
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);