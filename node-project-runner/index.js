#!/usr/bin/env node

// chokidar js to detect file changes
const chokidar = require('chokidar');

const debounce = require('lodash.debounce');

// caporal js to create cli command tool with documentation
// naming to follow documentation convention
const program = require('caporal');

const fs = require('fs');

// to run a child process or program
const { spawn } = require('child_process');

program
  .version('0.0.1')
  // [] - optional argument that command will take, second str is for documentation
  //  { filename: 'test.js' }
  .argument('[filename]', 'Name of a file to execute!')
  // run above command & args
  .action(async ({ filename }) => {
    // If user not provided filename, will default to index.js
    const name = filename || 'index.js';

    // check to see if file exists
    try {
      await fs.promises.access(name);
    } catch (err) {
      throw Error('Could not find the file ' + name);
    }

    const start = debounce(() => {
      console.log('STARTING USERS PROGRAM');

      // 'child_process' standard node default module to execute js code from within node program
      // basically allowing node js to run other program in our machine

      // first arg is command name, file to execute & stdio is to pass child events to our program
      spawn('node', [name], { stdio: 'inherit' });
    }, 100);

    chokidar
      .watch('.')
      // handling specific events with 'on' event listeners in node

      // 'add'event is to create or read files
      .on(
        'add',
        // add event gets call all the time when there is a change
        // Debouncing add event to resolve above issue calling function way to often
        start
      )

      .on('change', () => start)

      // on delete
      .on('unlink', () => start);
  });

// process.argv property returns an array containing the command-line arguments
program.parse(process.argv);
