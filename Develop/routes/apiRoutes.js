const router = require('express').Router();
const path = require('path');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const notesApi = require('../db/db.json')

const readFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);

const getNotes = function() {
    return readFile('./db/db.json', 'utf8');
}

const writeNotes = function() {
    return writeFile('./db/db.json', JSON.stringify(notesApi));
}

// const writeValues = function(values) {
//     JSON.stringify(fs.writeFileSync('./db/db.json'));
// }


router.get('/notes', (req, res) => {
    getNotes();
    res.json(notesApi);
});

router.post('/notes', (req, res) => {
    let updatedNote = req.body;
    let id = uuidv4();
    updatedNote.id = id;
    notesApi.push(updatedNote);
    writeNotes();
    res.json(updatedNote);
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    let notes = getNotes(); 
    let updatedNotes = notes.filter(note => note.id !== id);
    writeNotes(updatedNotes);
    res.json(updatedNotes);  
    getNotes()
   
});

module.exports = router;