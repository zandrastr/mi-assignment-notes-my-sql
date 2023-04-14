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
                //.replace method with regular expression to remove backslashes (that were added by the .escape method in post and put)
                //.slice method to extract a part of the string (removes the first and last ' ' that were added by the .escape metod) 
                data.noteContent = Buffer.from(data.noteContent).toString().replace(/\\/g, '').slice(1, -1);
                data.noteTitle = data.noteTitle.replace(/\\/g, '').slice(1, -1);
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
                //.replace method with regular expression to remove backslashes (that were added by the .escape method in post and put)
                //.slice method to extract a part of the string (removes the first and last ' ' that were added by the .escape metod) 
                data.noteContent = Buffer.from(data.noteContent).toString().replace(/\\/g, '').slice(1, -1);
                data.noteTitle = data.noteTitle.replace(/\\/g, '').slice(1, -1);
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

    //escape method to sanitize inputs (to avoid sql injection attacks)
    let escUpdatedTitle = connection.escape(updatedNote.title);
    let escUpdatedContent = connection.escape(updatedNote.content);

    console.log('noteId:', noteId);

    connection.connect((err) => {
        if (err) {
            console.log('error', err);
        }

         //? as placeholders
        let sql = `UPDATE notes SET noteTitle = ?, noteContent = ? WHERE noteId = ${noteId}`;

        //save escaped values in array
        let escUpdatedValues = [escUpdatedTitle, escUpdatedContent];

        //pass escaped values as parameter in query method
        connection.query(sql, escUpdatedValues, (err, data) => {
            if (err) {
                console.log('error', err);
            }
            res.json(data);
        })
    })
}) 

module.exports = router;