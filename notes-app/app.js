const chalk = require('chalk');

const yargs = require('yargs');

const getNotes = require('./notes');

// add, remove, read, list

// Create add command
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
    console.log(`Title: `, argv.title);
    console.log(`Body: `, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Removes a note.',
  handler: function() {
    console.log('Removing a note...');
  }
});

yargs.command({
  command: 'list',
  describe: 'List all notes.',
  handler: function() {
    console.log(`Listing all notes...`);
  }
});

yargs.command({
  command: 'read',
  describe: 'Read a note.',
  handler: function() {
    console.log(`Reading a note...`);
  }
});

console.log(yargs.argv);
