const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//Template Engine
app.set('view engine', 'ejs');
app.set('videws', './views');

//Middlewares
app.use(express.static('public'));



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);

//Rotes

app.get('/', (req, res) => {
    // res.send(200, 'Hello World');
    res.status(200).render('index', {
        page_name: 'index'
    });
});

app.get('/about', (req, res) => {
    res.status(200).render('about', {
        page_name: 'about'
    });
});