const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    // 'keys' property, a value of random string to encrypt data inside the cookie
    // note - this will hold user data inside cookie
    keys: ['lkasld235jaddfdfdfd23433434'],
  })
);

app.get('/signup', (req, res) => {
  res.send(`
    <div>
      Your id is: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send('Email in use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords must match');
  }

  // Create a user in our user repo to represent this person
  const user = await usersRepo.create({ email, password });

  // Store the id of that user inside the users cookie
  // note - cookie-session lib adds a property '.session' in the Request Object
  // req.session === {} we can add many properties in it
  // note - When we call res.send, the cookie-session lib will automatically look at the object &
  // find out if any data has been changed, code it simple strings then
  // attached to the Response header & stored in the browser
  req.session.userId = user.id;
  // note - adding .userId property in the session object

  res.send('Account created!!!');
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

app.get('/signin', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>
  `);
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('Email not found');
  }

  const validPassword = await usersRepo.comparePasswords(user.password, password);

  if (!validPassword) {
    return res.send('Invalid password');
  }

  req.session.userId = user.id;

  res.send('You are signed in!!!');
});

app.listen(3002, () => {
  console.log('Listening @ 3002');
});
