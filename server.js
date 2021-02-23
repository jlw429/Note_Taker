const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');
const arrayDB = './public/db/db.json';

// Express App and PORT
const app = express();
const PORT = process.env.PORT || 8080;

// Express Middleware Functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// HTML Routes - notes.html and index.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// GET /api/notes Route - reads db.json file and returns the data array of objects in JSON format
app.get('/api/notes', (req, res) => {
  readFileAsync(arrayDB, 'utf-8')
    .then((data) => {
      res.json(JSON.parse(data));
    })
    .catch((err) => {
      throw err;
    });
});

// POST /api/notes - creates a new object based on user input and adds it to db.json in JSON format
app.post('/api/notes', async (req, res) => {
  try {
    const data = await readFileAsync(arrayDB, 'utf-8');

    const notes = JSON.parse(data);

    const newNote = req.body;
    const newNoteId = notes.length + 1;
    const noteData = {
      id: newNoteId,
      title: newNote.title,
      text: newNote.text,
    };

    notes.push(noteData);
    res.json(noteData);
    console.log(noteData);

    await writeFileAsync(arrayDB, JSON.stringify(notes, null, 2));
    console.log('note created!');
  } catch (err) {
    throw err;
  }
});

// DELETE /api/notes/:id - deletes the note object based on specific id and returns the rewritten db.json in JSON format
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const noteID = req.params.id;

    const data = await readFileAsync(arrayDB, 'utf-8');

    const notes = JSON.parse(data);

    notes.forEach((element, index) => {
      if (parseInt(element.id) === parseInt(noteID)) {
        notes.splice(index, 1);
      }
    });

    const notesSTR = JSON.stringify(notes, null, 2);

    await writeFileAsync(arrayDB, notesSTR);

    res.json(JSON.parse(notesSTR));
    console.log('note deleted!');
  } catch (err) {
    throw err;
  }
});

// Server Port LISTEN
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
