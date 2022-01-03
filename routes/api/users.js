const express = require('express');
const bcrypt = require('bcrypt');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const { getUserToken, requireAuth } = require('../../auth');
const { User } = require('../../db/models');

const router = express.Router();

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
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  })
);

router.post(
  '/',
  validateSignUp,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.cookie('token', token);
    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });
  })
);

router.post(
  '/token',
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { id, username } = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credential were invalid'];
      return next(err);
    }

    const token = getUserToken(user);
    res.cook('token', token);
    res.json({ token, user: { id, username, email } });
  })
);

router.get(
  '/',
  requireAuth,
  asyncHandler(async function (req, res) {
    const users = await User.findAll();
    res.json({ users });
  })
);

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
