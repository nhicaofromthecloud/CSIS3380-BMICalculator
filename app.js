const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("bmi", { bmi: '', age: '', weight: '', height: '' });
});

app.post('/', (req, res) => {
    let age = parseFloat(req.body.age);
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height) / 100;
    let bmi = weight / Math.pow(height, 2);
    let result = bmi.toFixed(1);

    // Store the results 
    req.app.locals.bmi = result;
    req.app.locals.age = age;
    req.app.locals.weight = weight;
    req.app.locals.height = req.body.height;

    // Redirect to a GET endpoint to display the results.
    res.redirect("/result");
});

app.get("/result", (req, res) => {
    const { bmi, age, weight, height } = req.app.locals; //destructuring assignment
    
    // Reset variable after retrieving the values.
    req.app.locals.bmi = undefined;
    req.app.locals.age = undefined;
    req.app.locals.weight = undefined;
    req.app.locals.height = undefined;

    res.render("bmi", { bmi, age, weight, height });
});

app.listen(3000, () => {
    console.log('Server started on 3000.');
});