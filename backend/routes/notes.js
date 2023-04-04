var express = require('express');
var router = express.Router();

const mysql = require('mysql2');

/* GET notes listing. */
router.get('/', function(req, res, next) {

    req.app.locals.con.connect((err) => {
        if (err) {
            console.log('error', err);
        }

        let sql = `SELECT * FROM notes`;

        req.app.locals.con.query(sql, (err, data) => {
            if (err) {
                console.log('error', err);
            }
            console.log('data from query:', data);
            res.json(data);
        })
    })
});

module.exports = router;

      

