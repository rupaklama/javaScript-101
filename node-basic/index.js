#!/usr/bin/env node
// this first line is also required for Node.js scripts to be installed and run properly on macOS and Windows
// creating our own custom script 'bin' in package.json to execute index.js from anywhere in our machine

// common js module syntax
// note - The 'require' function & 'module' object makes possible to share code across other modules in node js
// Require Cache - is an object which stores the result after file import
// console.log(require.cache);
// const message = require('./myScript');
const { error } = require('console');
const fs = require('fs');

const util = require('util');

const chalk = require('chalk');

const path = require('path');

// fs module provides promise implementation for the lstat
const lstat = fs.promises.lstat;

// note - process.argv property returns an array containing the command-line arguments passed
// when the Node.js process was launched.
// console.log(process.argv);

// passing additional args for path dir
const targetDir = process.argv[2] || process.cwd();

// readdir - Reads the contents of a current directory
// note - Callback argument has access to Error Object & Data in all the functions in node
fs.readdir(targetDir, async (err, fileNames) => {
  if (err) {
    // throw new Error(err);
    console.log(err);
    return;
  }

  const statPromises = fileNames.map(filename => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let [index, item] of allStats.entries()) {
    // console.log(fileNames[index], item.isFile());

    if (item.isFile()) {
      console.log(fileNames[index]);
    } else {
      console.log(chalk.red(fileNames[index]));
    }
  }
});

// handling Async lstat function using promise
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };

// same as above with node util tool
// const lstat = util.promisify(fs.lstat);

// const counterObject = require('./myScript');

// console.log(message);

// note - imported module is pass as arguments into an invisible node function to execute here
// The arguments are functions, Object & file paths
// console.log(arguments); exports, require, module, __filename, __dirname
// console.log(module);

// console.log(counterObject.getCounter());
// counterObject.incrementCounter();

// console.log(counterObject.getCounter());

// importing it again & assigning to a new variable
// note - This will reference to the SAME previous object with same counter variable above
// const newCounterObject = require('./myScript');
// console.log(newCounterObject.getCounter());
