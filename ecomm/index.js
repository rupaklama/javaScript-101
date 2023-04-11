const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    // 'keys' property, a value of random string to encrypt data inside the cookie
    // note - this will hold user data inside cookie
    keys: ['lkasld235jaddfdfdfd23433434'],
  })
);

app.use(authRouter);

app.listen(3002, () => {
  console.log('Listening @ 3002');
});
