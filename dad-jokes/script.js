'use strict';

const jokeContainer = document.getElementById('joke');
const getJokeBtn = document.getElementById('jokeBtn');

getJokeBtn.addEventListener('click', () => fetchJoke());

fetchJoke();

function fetchJoke() {
  const config = {
    headers: {
      // response must be in json format
      Accept: 'application/json',
    },
  };

  fetch('https://icanhazdadjoke.com', config)
    .then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          jokeContainer.innerText = data.joke;
        });
      }

      // note - this error will be caught by catch function below
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
    })
    .catch(err => {
      console.log(err);
      jokeContainer.innerText = err;
    });
}
