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
            data.map(data => {
                data.noteContent = Buffer.from(data.noteContent).toString();
            })
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

        let noteId = req.params.id;

        let sql = `SELECT * FROM notes WHERE noteId = ${noteId}`;

        connection.query(sql, (err, data) => {
            if (err) {
                console.log('error', err);
            }
            data.map(data => {
                data.noteContent = Buffer.from(data.noteContent).toString();
            })
            res.json(data);
        })
    })
});

/********************** Add new note *************************/
router.post("/add", function(req, res) {
    let newNote = req.body;

    //escape method to sanitize inputs (to avoid sql injection attacks)
    let escTitle = connection.escape(newNote.title);
    let escContent = connection.escape(newNote.content);

    console.log('esc title:', escTitle);
    console.log('esc content:', escContent);

    connection.connect((err) => {
        if (err) {
            console.log('error', err);
        }

        //? ? as placeholders for title and content values
        let sql = `INSERT INTO notes (noteTitle, noteContent) VALUES (?, ?)`;

        //save escaped values in array
        let escValues = [escTitle, escContent];

        //pass escaped values as parameter in query method
        connection.query(sql, escValues, (err, data) => {
            if (err) {
                console.log('error', err);
            }
            res.json(data);
        })
    })
})    

/********************** Update note *************************/
router.put("/edit/:id", function(req, res) {
    let updatedNote = req.body;
    let noteId = req.params.id;

    console.log('noteId:', noteId);

    connection.connect((err) => {
        if (err) {
            console.log('error', err);
        }

        let sql = `UPDATE notes SET noteTitle = '${updatedNote.title}', noteContent = '${updatedNote.content}' WHERE noteId = ${noteId}`;

        connection.query(sql, (err, data) => {
            if (err) {
                console.log('error', err);
            }
            res.json(data);
        })
    })
}) 

module.exports = router;