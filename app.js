const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);

app.get('/', (req, res) => {
    // res.send(200, 'Hello World');
    res.status(200).send('Hello World');
});