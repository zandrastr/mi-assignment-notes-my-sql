var express = require('express');
var router = express.Router();

const connection = require('../conn')
//const mysql = require('mysql2');

/********************** Get all notes *************************/
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

/********************** Get one note *************************/
router.get('/:id', function(req, res, next) {

    connection.connect((err) => {
        if (err) {
            console.log('error', err);
        }

        //let noteId = req.params.noteId;
        let noteId = 2;

        let sql = `SELECT * FROM notes WHERE noteId = ${noteId}`;

        connection.query(sql, (err, data) => {
            if (err) {
                console.log('error', err);
            }
            res.json(data);
        })
    })
});

/********************** Add new note *************************/
router.post("/add", function(req, res) {
    let newNote = req.body;

    connection.connect((err) => {
        if (err) {
            console.log('error', err);
        }

        let sql = `INSERT INTO notes (noteTitle, noteContent) VALUES ('${newNote.title}', '${newNote.content}')`;

        connection.query(sql, (err, data) => {
            if (err) {
                console.log('error', err);
            }
            res.json(data);
        })
    })
})    

module.exports = router;