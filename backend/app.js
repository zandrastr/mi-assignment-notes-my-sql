//require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');

const connection = require('./conn')

var app = express();

// app.locals.con = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'notes',
//     password: process.env.SQL_PASSWORD,
//     database: 'notes'
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);

module.exports = app;
