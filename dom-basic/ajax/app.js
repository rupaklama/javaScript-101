// note - we have to define http method in fetch api on POST
fetch('/api/1.0/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  // body: JSON.stringify(body),
});

// fetch api basic
fetch('https://swapi.dev/api/planets')
  .then(response => {
    // note - With fetch api, fetch will always resolves a Promise to get Response Object
    // even if there is an non 200 error like 404, 500 etc...
    console.log(response);

    // note - To Solve above issue, always check status code
    // On status code 200
    // if (response.ok) {
    // if (response.status === 200) {
    //   response.json().then(data => {
    //     for (let planet of data.results) {
    //       console.log(planet.name);
    //     }
    //   });
    // }

    // note - this error will be caught by catch function below
    if (!response.ok) {
      throw new Error(`Status Code Error: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    // url
    const nextURL = data.next;
    return fetch(nextURL);
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Status Code Error: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log(err));

// AXIOS - Will automatically parse JSON Data & no need to check Status Code like in fetch api
// note - Response Object is assigned to 'data' property in axios
axios
  .get('https://swapi.dev/api/planets21')
  .then(res => {
    console.log('axios', res.data);
  })
  .catch(err => {
    console.log(err);
  });

// function getPlanets() {
//   return axios.get('https://swapi.dev/api/planets');
// }

// getPlanets().then(response => console.log(response.data));

// await - pauses the execution of a function while Promise gets resolved
// same as 'then' handler
async function getPlanets() {
  try {
    // on promise resolve - resolve()
    const response = await axios.get('https://swapi.dev/api/planets21');
    console.log(response.data);
  } catch (error) {
    // on promise reject - reject()
    console.log(error);
    throw Error('bad request');
  }
}
