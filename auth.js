// An implementation of JSON Web Tokens
const jwt = require('jsonwebtoken');

// Grab our JWT Secret and JWT Expire Time from our Environment Variables
const { jwtConfig } = require('./config/index');
const { secret, expiresIn } = jwtConfig;

// Grab our User model from our database
const { User } = require('./db/models');

/*
 This module will attempt to extract a bearer token from a request from these locations:

    - The key access_token in the request body.
    - The key access_token in the request params.
    - The value from the header Authorization: Bearer .
    - Will check headers cookies if has any 'access_token=TOKEN;'

    If a token is found, it will be stored on req.token. If a token has been provided in more than one location, the request will be aborted immediately with HTTP status code 400 (per RFC6750).
*/
const bearerToken = require('express-bearer-token');

// Create a user token
const getUserToken = (user) => {
  // console.log(jwtConfig);
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign({ data: userDataForToken }, secret, {
    expiresIn: parseInt(expiresIn, 10),
  });

  return token;
};

// Restore a user with a token
const restoreUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.set('WWW-Authenticate', 'Bearer').status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next(e);
    }

    if (!req.user) {
      res.clearCookie('token');
      return res.set('WWW-Authenticate', 'Bearer').status(401).end();
    }

    return next();
  });
};

const requireAuth = [bearerToken(), restoreUser];

module.exports = { getUserToken, requireAuth };
