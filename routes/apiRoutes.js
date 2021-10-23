const path = require('path');
const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/notes', (req, res) => {

  // Log that a POST request was received
  console.info(`${req.method} request received to submit note`);

  // Destructuring assignment for the items in req.body
  const {title, note } = req.body;

  // If all the required properties are present
  if (title && note) {
    // Variable for the object we will save
    const newNote = {
      title,
      note,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting new note');
  }});

// router.delete('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/notes.html'))
// });

module.exports = router;