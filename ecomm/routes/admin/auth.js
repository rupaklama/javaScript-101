const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');

const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

// Validation checks if an input meets a set of criteria
// Sanitization modifies the input to ensure that it is valid (such as removing white spaces).
router.post(
  '/signup',
  [
    check('email')
      // note - usually we do Sanitization first
      .trim()
      .normalizeEmail()
      // and then Validation
      .isEmail()
      .withMessage('Must be a valid email')

      // note - Centralizing or merging all validations together (express & our custom validations)
      // so that we can do only one single check to see if anything went wrong with 'Custom Validator'
      // A custom validator may be implemented by using the chain method .custom(). It takes a validator function.
      .custom(async email => {
        const existingUser = await usersRepo.getOneBy({ email });

        if (existingUser) {
          throw new Error('Email in use');
        }
      }),
    check('password').trim().isLength({ min: 4, max: 20 }).withMessage('Must be between 4 and 20 characters'),
    check('passwordConfirmation')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Must be between 4 and 20 characters')
      .custom((passwordConfirmation, { req }) => {
        if (req.body.password !== passwordConfirmation) {
          throw new Error('Passwords must match');
        }
      }),
  ],
  async (req, res) => {
    // 'validationResult' - Extracts the validation errors of an express request
    const errors = validationResult(req);
    console.log(errors);

    const { email, password, passwordConfirmation } = req.body;

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
  }
);

router.post('/signin', async (req, res) => {
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

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

module.exports = router;
