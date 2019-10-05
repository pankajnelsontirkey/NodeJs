const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes...';
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    console.log(chalk.green('New note added!'));
  } else {
    console.log(chalk.red('Note with the title already exists'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  if (!notes.length) {
    console.log(chalk.red('No notes exist. nothing to remove.'));
  } else {
    const updatedNotes = notes.filter(note => note.title !== title);
    if (updatedNotes.length === notes.length) {
      console.log(chalk.bgRed('Note with given title was not found.'));
    } else {
      saveNotes(updatedNotes);
      console.log(chalk.bgGreen('Note was removed.'));
    }
  }
};

const readNote = title => {
  const notes = loadNotes();
  const foundNote = notes.find(note => note.title === title);

  if (!foundNote) {
    console.log(chalk.red('Note not found!'));
  } else {
    console.log(chalk.green('Title: ' + foundNote.title));
    console.log('Body: ' + foundNote.body);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (!notes.length) {
    console.log(chalk.red.inverse('No notes found.'));
  } else {
    console.log(chalk.yellow('Your notes: '));
    notes.forEach(note => {
      console.log(note.title);
    });
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
