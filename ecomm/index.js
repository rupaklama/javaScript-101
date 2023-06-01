const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();

// server public dir in our root dir to the browser
// Middleware to server Static files from local directory
app.use(express.static(`${__dirname}/public`));
// app.use(express.static('public'));

// note - bodyParser does not work with "multipart/form-data" request
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

app.use(
  cookieSession({
    // 'keys' property, a value of random string to encrypt user data inside the cookie for safety
    // note - this will encrypt user id data inside cookie with this array of string
    keys: ['lkasld235jaddfdfdfd23433434'],
  })
);

app.use(authRouter);
app.use(productsRouter);

app.listen(3002, () => {
  console.log('Listening @ 3002');
});
