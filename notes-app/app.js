const chalk = require('chalk');

const yargs = require('yargs');

const notes = require('./notes');

// add, remove, read, list

// Add
yargs.command({
  command: 'add',
  describe: 'Adds a new note.',
  builder: {
    title: {
      describe: 'Note title.',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Content of the note',
      demand: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Remove
yargs.command({
  command: 'remove',
  describe: 'Removes a note with given title.',
  builder: {
    title: {
      describe: 'Title of note to remove',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title);
  }
});

// List
yargs.command({
  command: 'list',
  describe: 'List all notes.',
  handler: function() {
    console.log(`Listing all notes...`);
    notes.listNotes();
  }
});

// Read
yargs.command({
  command: 'read',
  describe: 'Read a note.',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.readNote(argv.title);
  }
});

yargs.argv;
