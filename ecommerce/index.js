const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// Middleware to consume Request Body Object - default body parser package
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// custom body parser middleware
const customBodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    // handling data event on request object
    req.on('data', data => {
      // note - data is a Buffer object, array of raw information
      // string representation of data
      const parsed = data.toString('utf-8').split('&');
      const formData = {};

      for (let item of parsed) {
        const [key, value] = item.split('=');
        formData[key] = value;
      }

      // assigning value to the body property
      req.body = formData;

      next();
    });
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST" >
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input name="passwordConfirmation" type="password" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Account created!');
});

app.listen(3002, () => {
  console.log('listening @ port 3002');
});
