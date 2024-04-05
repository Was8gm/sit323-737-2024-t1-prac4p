const express = require('express');
const app = express();
const port = 3000;
function validateInput(req, res, next) {
    const { num1, num2 } = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
        const error = new Error('Invalid input numbers');
        error.status = 400; 
        next(error); 
    } else {
        next(); 
    }
}
app.get('/add',validateInput,(req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) + parseFloat(num2);
    res.send(  'the result is: '+result  );
});

app.get('/subtract', validateInput,(req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) - parseFloat(num2);
    res.send( 'the result is: '+result  );
});

app.get('/multiply',validateInput,(req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) * parseFloat(num2);
    res.send( 'the result is: '+result  );
});

app.get('/divide',validateInput,(req, res) => {
    const { num1, num2 } = req.query;
    if (parseFloat(num2) === 0) {
        res.status(400).send(' Cannot divide by zero');
    } else {
        const result = parseFloat(num1) / parseFloat(num2);
        res.send( 'the result is: '+result );
    }
});

//optimization
app.get('/power', validateInput, (req, res) => {
    const { base, exponent } = req.query;
    const result = Math.pow(parseFloat(base), parseFloat(exponent));
    res.send('the result is: '+result );
});

app.get('/sqrt', (req, res, next) => {
    const { number } = req.query;
    if (!number || isNaN(number) || parseFloat(number) < 0) {
        const error = new Error('Invalid input number. Number must be non-negative.');
        error.status = 400;
        return next(error);
    }
    const result = Math.sqrt(parseFloat(number));
    res.send('the result is: '+result );
});

app.get('/modulo', validateInput, (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) % parseFloat(num2);
    res.send('the result is: '+result );
});




app.use((err, req, res,next) => {
    const status = err.status || 500;
    res.status(status).send({ error: err.message });
});

app.listen(port, () => {
    console.log(`Calculator microservice listening at http://localhost:${port}`);
});
