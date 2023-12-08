// Async Function is an easier short cut syntax to return Promise without doing this - new Promise(res, reject => {})
// note - adding 'async' keyword front of the function will always return a Promise
// If the function returns a value, the promise will be resolved with that value
// If the function throws an exception, the promise will be rejected
async function greet() {
  // NOTE: when returning a 'value', a promise is resolved
  return 'hello';
}
// Promise {<fulfilled>: 'hello'}
greet().then(val => {
  console.log('resolved', val);
});

// note: Rejected Promise - If we throw an Error/Exception, that promise will be Rejected
async function add(x, y) {
  if (typeof x !== 'number' || typeof x !== 'number') {
    throw 'X and Y must be numbers';
  }
  // NOTE: when returning a 'value', a promise is resolved
  return x + y;
}
// console.log(add('e', 5)); // Promise {<rejected>: 'X and Y must be numbers'}
// console.log(add(5, 5)); // Promise {<fulfilled>: 10}

add('e', 5)
  .then(val => console.log('Async: number', val))
  .catch(err => console.log('Async: not number', err));

add(5, 5)
  .then(val => console.log('Async: number', val))
  .catch(err => console.log('Async not number', err));

// note: With new Promise object syntax, same as above
function addTwo(x, y) {
  return new Promise((resolve, reject) => {
    if (typeof x !== 'number' || typeof x !== 'number') {
      reject('X and Y must be numbers');
    }

    resolve(x + y);
  });
}

addTwo('e', 5)
  .then(val => console.log('new Promise: number', val))
  .catch(err => console.log('new Promise: not number', err));

addTwo(5, 5)
  .then(val => console.log('new Promise: number', val))
  .catch(err => console.log('new Promise: not number', err));

// AWAIT KEYWORD
// await - pauses the execution of a function while Promise gets resolved
// same as 'then' handler

// function getPlanets() {
//   return axios.get('https://swapi.dev/api/planets');
// }

// getPlanets().then(response => console.log(response.data));

// note: instead of using .then like in above
async function getPlanets() {
  try {
    // on promise resolve - resolve()
    const response = await fetch('https://swapi.dev/api/planet');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // on promise reject - reject()
    console.log('in catch =>', error);
    return error;
  }
}
getPlanets();

// note: one way to catch error but very useful when Chaining Multiple Promises
// getPlanets().catch(err => {
//   console.log('Caught', err);
// });
