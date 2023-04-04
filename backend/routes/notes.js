var express = require('express');
var router = express.Router();

const connection = require('../conn')
//const mysql = require('mysql2');

/* GET notes listing. */
router.get('/', function(req, res, next) {

    connection.connect((err) => {
        if (err) {
            console.log('error', err);
        }

        let sql = `SELECT * FROM notes`;

        connection.query(sql, (err, data) => {
            if (err) {
                console.log('error', err);
            }
            console.log('data from query:', data);
            res.json(data);
        })
    })
});

module.exports = router;