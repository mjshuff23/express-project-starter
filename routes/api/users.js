const express = require('express');

// For hashing our passwords
const bcrypt = require('bcrypt');

// An express.js middleware for validator, a library of string validators and sanitizers.
const { check } = require('express-validator');

// Bring in our helper functions
const { asyncHandler, handleValidationErrors } = require('../../utils');

// Bring in our auth helper functions
const { getUserToken, requireAuth } = require('../../auth');

// Bring in our User model
const { User } = require('../../db/models');

const router = express.Router();

// Check that the email property exists and that it is a valid email
// Check that the password exists.
const validateEmailAndPassword = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

// Check that the username property exists, is less than 50 characters long, and that the username and email are not already in use or invalid
const validateSignUp = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username')
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters long')
    .custom((value) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            'The provided username is already in use by another account'
          );
        }
      });
    }),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            'The provided Email Address is already in use by another account'
          );
        }
      });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long'),
  check('confirmPassword')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
  handleValidationErrors,
];

router.post(
  '/login',
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    // Grab email and password from body
    const { email, password } = req.body;

    // Attempt to find user based on email
    const user = await User.findOne({
      where: {
        email,
      },
      // If there is no user or the password is wrong
    });

    if (!user || !user.validatePassword(user, password)) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = [
        'Either the user does not exit or you provided an incorrect password',
      ];
      return next(err);
    }

    // If there is a user, get their token
    const token = getUserToken(user);

    // Send back token and user information
    res.json({
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  })
);

// Sign up
router.post(
  '/',
  validateSignUp,
  // Always notice the asyncHandler
  asyncHandler(async (req, res) => {
    // Grab required user data
    const { username, email, password, profile_picture_url } = req.body;
    // Hash user's password
    const hashed_password = bcrypt.hashSync(password, 10);
    // Create user.  Property names must match the actual column name
    const user = await User.create({
      username,
      email,
      hashed_password,
      profile_picture_url,
    });

    // Get user token
    const token = getUserToken(user);
    res.cookie('token', token);
    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });
  })
);

// router.post(
//   '/token',
//   validateEmailAndPassword,
//   asyncHandler(async (req, res, next) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({
//       where: {
//         email,
//       },
//     });

//     if (!user || !user.validatePassword(password)) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = [
//         'Either the user does not exit or you provided an incorrect password',
//       ];
//       return next(err);
//     }

//     const token = getUserToken(user);
//     res.cookie('token', token);
//     res.json({ token, user: { id, username, email } });
//   })
// );

// Read all users
router.get(
  '/',
  requireAuth,
  asyncHandler(async function (req, res) {
    const users = await User.findAll();
    res.json({ users });
  })
);

// Read specific user
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id);
    const user = await User.findByPk(userId);
    const { id, username, email } = user;

    if (!user) {
      const err = new Error('No User Found');
      err.status = 404;
      err.title = 'Invalid User';
      err.errors = ['User does not exist'];
      return next(err);
    }

    res.json({ user: { id, username, email } });
  })
);

module.exports = router;
