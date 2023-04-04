require('dotenv').config()
const mysql = require('mysql2');

connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'notes',
    password: process.env.SQL_PASSWORD,
    database: 'notes'
})

module.exports = connection;