const router = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const notesApi = require('../db/db.json')


const getNotes = function() {
    return JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
}

const writeNotes = function() {
    JSON.stringify(fs.writeFileSync('./db/db.json'));
}

const writeValues = function(values) {
    JSON.stringify(fs.writeFileSync('./db/db.json'));
    
}


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
    let updatedNotes = notes.filter(note => note.id === id);
    writeValues(updatedNotes);
    res.json(updatedNotes);  
   
});

module.exports = router;