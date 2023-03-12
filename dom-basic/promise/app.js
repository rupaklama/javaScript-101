// Promise is an Object which returns a value in the future after handling async operations
// Promises are used to handle asynchronous operations in JavaScript.
// They are easy to manage when dealing with multiple asynchronous operations where
// Callbacks can create callback hell leading to unmanageable code.

// 1. create promise using promise object
// note - when we create a Promise, we pass a callback function with its default params
const willGetYouDog = () =>
  new Promise((resolve, reject) => {
    // 1. note - On calling promise, promise starts with 'Pending' state always at first
    // don't matter if resolve or reject has been call or not

    // 2. if we call resolve, promise is resolved or fulfilled
    // resolve();

    // 3. if we call reject, promise is rejected
    // reject();

    // note - initial state is Pending during time interval
    setTimeout(() => {
      const rand = Math.random();

      // note - we can resolve and reject Promise with a Value
      // which can be access in .then and .catch callbacks
      if (rand < 0.5) {
        resolve();
      } else {
        reject();
      }
    }, 5000);
  });

// 2. Consuming promise
// note - How to interact with the Promise after resolve or reject
willGetYouDog()
  // on resolve
  .then(() => {
    console.log('Yay we got a dog!');
  })
  // on reject
  .catch(() => {
    console.log(':( no dog...');
  });

// note - we can resolve and reject Promise with a Value which can be access in .then and .catch callbacks
const fakeRequest = url => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pages = {
        '/users': [
          { id: 1, username: 'Bilbo' },
          { id: 2, username: 'Pak' },
        ],
        '/about': 'This is about page!',
      };

      const data = pages[url];

      if (data) {
        resolve({
          status: 200,
          data: data,
        });
      } else {
        reject({ status: 404 });
      }
    }, 1000);
  });
};

fakeRequest('/users')
  .then(res => {
    console.log('status', res.status);
    console.log('data', res.data);

    console.log('fulfilled');

    // note -  you can nest Promise Chaining inside of one
    // fakeRequest('/users').then(res => console.log('i am nested!'));
    return fakeRequest('/users');
  })
  // note - this will depend on previous promise
  .then(res => console.log('promise chaining!'))
  .catch(res => {
    console.log(res.status);
    console.log('rejected');
  });
