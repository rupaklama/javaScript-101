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

// note: Reject Promise - If we throw an Error/Exception, that promise will be Rejected
async function add(x, y) {
  if (typeof x !== 'number' || typeof x !== 'number') {
    throw 'X and Y must be numbers'; // reject promise
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
    // Catch is on promise reject
    console.log('in catch =>', error);
    return error;
  }
}
console.log(getPlanets());

// note: one way to catch error and very useful when Chaining Multiple Promises with .then()
// getPlanets().catch(err => {
//   console.log('Caught', err);
// });

// note: Sequential vs Parallel
async function get3Pokemon() {
  try {
    // NOTE: Sequential Requests - one after another
    // note: In Sequential Requests, first poke1 promise resolves to finish & then start the second one
    // First one goes & finish, second one starts & finish and so on since they are in Sequence, one after another
    // note: Since these endpoints don't depend on one another, we can go on Parallel
    // const poke1 = await fetch('https://pokeapi.co/api/v2/pokemon/1');
    // const poke2 = await fetch('https://pokeapi.co/api/v2/pokemon/2');
    // const poke3 = await fetch('https://pokeapi.co/api/v2/pokemon/3');

    // NOTE: Resolving multiple promises in Parallel
    // Not using 'await' here so to send all requests roughly at the same time
    const poke1 = fetch('https://pokeapi.co/api/v2/pokemon/1');
    const poke2 = fetch('https://pokeapi.co/api/v2/pokemon/2');
    const poke3 = fetch('https://pokeapi.co/api/v2/pokemon/3');

    // note: The second promise below will not resolve until the first one is fulfilled and so on
    const poke1Res = await poke1;
    const prom1 = await poke1Res.json();

    // this waits for above promise to resolve
    const poke2Res = await poke2;
    const prom2 = await poke2Res.json();

    // this waits for above promise to resolve again
    const poke3Res = await poke3;
    const prom3 = await poke3Res.json();

    // this code won't run until all the promises resolve above
    console.log(prom1, prom2, prom3);
  } catch (error) {
    // on promise reject - reject() on catch
    console.log('in catch =>', error);
    return error;
  }
}

get3Pokemon();

// note: Promise.all to send Requests in Parallel in a Cleaner Way
async function getPokemonWithPromiseAll() {
  try {
    // NOT using 'await' here so to send all requests roughly at the same time
    const poke1 = axios.get('https://pokeapi.co/api/v2/pokemon/1');
    const poke2 = axios.get('https://pokeapi.co/api/v2/pokemon/2');
    const poke3 = axios.get('https://pokeapi.co/api/v2/pokemon/3');

    // NOTE: Promise.all() - to resolve multiple promises in Parallel
    const results = await Promise.all([poke1, poke2, poke3]);
    console.log(results);
  } catch (error) {
    // on promise reject - reject() on catch
    console.log('promise all =>', error);
    return error;
  }
}

getPokemonWithPromiseAll;
