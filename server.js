const express = require('express');
const app = express();
const port = 3000;

app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) + parseFloat(num2);
    res.send({ result });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) - parseFloat(num2);
    res.send({ result });
});

app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) * parseFloat(num2);
    res.send({ result });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (parseFloat(num2) === 0) {
        res.status(400).send('Error: Cannot divide by zero');
    } else {
        const result = parseFloat(num1) / parseFloat(num2);
        res.send({ result });
    }
});

// Error handling for invalid numbers
app.use((req, res, next) => {
    if (!req.query.num1 || !req.query.num2 || isNaN(req.query.num1) || isNaN(req.query.num2)) {
        res.status(400).send('Error: Invalid input numbers');
    } else {
        next();
    }
});

app.listen(port, () => {
    console.log(`Calculator microservice listening at http://localhost:${port}`);
});
