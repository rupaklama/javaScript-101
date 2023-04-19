const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');

const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/users/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

// Validation checks if an input meets a set of criteria
// Sanitization modifies the input to ensure that it is valid (such as removing white spaces).
router.post(
  '/users/signup',
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
    // 'validationResult' - Extracts the validation errors of an express request & returns it
    //  msg: 'Invalid value' - default error message set with validationResult
    // note - to customize the default message chain withMessage() in the validation
    const errors = validationResult(req);

    // note - if errors is not empty meaning on having errors
    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors }));
    }

    const { email, password } = req.body;

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

    res.status(200).send('Account created!!!');
  }
);

router.get('/users/signin', (req, res) => {
  res.status(200).send(signinTemplate({}));
});

router.post(
  '/users/signin',
  [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Must provide a valid email')
      .custom(async email => {
        const user = await usersRepo.getOneBy({ email });
        if (!user) {
          throw new Error('Email not found!');
        }
      }),

    check('password')
      .trim()
      .custom(async (password, { req }) => {
        const user = await usersRepo.getOneBy({ email: req.body.email });

        if (!user) {
          throw new Error('Invalid password');
        }

        const validPassword = await usersRepo.comparePasswords(user.password, password);

        if (!validPassword) {
          throw new Error('Invalid password');
        }
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(signinTemplate({ errors }));
    }

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.status(200).send('You are signed in!!!');
  }
);

router.get('/users/signout', (req, res) => {
  req.session = null;
  res.status(200).send('You are logged out');
});

module.exports = router;
