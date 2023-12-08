// create promise
const willGetYouDog = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const luckyNumber = Math.floor(Math.random() * 10) + 1;
      if (luckyNumber < 5) {
        // note: return values can be anything - strings, object etc
        resolve('yes');
      } else {
        reject('no');
      }
    }, 2000);
  });
};

// handling promise to consume it
willGetYouDog()
  // code to run on resolve
  .then(res => {
    console.log('Yay...got a dog!', res);
  })
  // code to run on reject
  .catch(res => {
    console.log('Not your lucky day :(', res);
  })
  // code to run always no matter the result above
  .finally(() => {
    console.log('Try again!');
    console.log('===============');
  });

// Promise with Values
const fakeRequest = url => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rand = Math.random();

      if (rand < 0.3) {
        // note: can pass multiple param args as values
        reject({ status: 404, error: 'Not Found' });
      } else {
        const pages = {
          '/users': [
            { id: 1, username: 'Bilbo' },
            { id: 2, username: 'Milbo' },
          ],
          '/about': 'this is about page!',
        };
        const data = pages[url];

        if (data) {
          // note: can pass multiple param args as values
          resolve({ status: 200, data });
        } else {
          reject('No endpoint exists');
        }
      }
    }, 3000);
  });
};

fakeRequest('/users')
  .then(res => {
    console.log(res);
    console.log('Request success!');
  })
  .catch(err => {
    console.log(err);
    console.log('Request fail :(');
  });
