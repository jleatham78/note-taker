const router = require('express').Router();
const path = require('path');
const util = require('util');
const uuidv1 = require('uuid');
const fs = require('fs');
const notesApi = require('../db/db.json')

const readFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);

const read = function() {
    return readFile('./db/db.json', 'utf8');
}

const write = function() {
    return writeFile('./db/db.json', JSON.stringify(notesApi));
}


// const findNotes = function() {
//     read().then((notes) => {
//         let returnedNote = [JSON.parse(notes)]
//         return returnedNote;
//     })
// }

// const addNotes = function() {
//     write()
// //add users input to db.json
// }

router.get('/notes', (req, res) => {
    read();
    res.json(notesApi);
});

router.post('/notes', (req, res) => {
    let updatedNote = req.body;
    notesApi.push(updatedNote);
    write();
});

module.exports = router;