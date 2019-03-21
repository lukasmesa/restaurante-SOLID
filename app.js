const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addCategoriaPage, addCategoria, deleteCategoria, editCategoria, editCategoriaPage} = require('./routes/Categoria');
const port = 4000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'restaurante_solid'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app

app.get('/', getHomePage);
app.get('/add', addCategoriaPage);
app.get('/edit/:codigo', editCategoriaPage);
app.get('/delete/:codigo', deleteCategoria);
app.post('/add', addCategoria);
app.post('/edit/:codigo', editCategoria);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});