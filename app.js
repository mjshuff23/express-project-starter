// Express is our server
const express = require('express');

// HTTP request logger middleware for node.js
const morgan = require('morgan');

// Used to enable CORS with various options.
const cors = require('cors');

// Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
const cookieParser = require('cookie-parser');

// Validation Error. Thrown when the sequelize validation has failed. The error contains an errors property, which is an array with 1 or more ValidationErrorItems, one for each validation that failed.
const { ValidationError } = require('sequelize');

// Used for generating errors for Node.js applications.
const createError = require('http-errors');

// Helps you secure your Express apps by setting various HTTP headers
const helmet = require('helmet');

// Provides utilities for working with file and directory paths
const path = require('path');

// Grabbing our environment variable to see if we're in production or development
const { environment } = require('./config');

// Use our routes
// const routes = require('./routes');

// Initialize our environment variables from our .env file
require('dotenv').config();

// Initialize our server
const app = express();

// `dev` - Concise output colored by response status for development use. The :status token will be colored green for success codes, red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for information codes.
app.use(morgan('dev'));

/* 
  origin: Configures the Access-Control-Allow-Origin CORS header. Possible values:
   - Boolean - set origin to `true` to reflect the request origin, as defined by req.header('Origin'), or set it to false to disable CORS.
   - String - set origin to a specific origin. For example if you set it to "http://example.com" only requests from "http://example.com" will be allowed.
   - RegExp - set origin to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern /example\.com$/ will reflect any request that is coming from an origin ending with "example.com".
   - Array - set origin to an array of valid origins. Each origin can be a String or a RegExp. For example ["http://example1.com", /\.example2\.com$/] will accept any request from "http://example1.com" or from a subdomain of "example2.com".
   - Function - set origin to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (which expects the signature err [object], allow [bool]) as the second.
*/
app.use(cors({ origin: true }));

// The `express.json()` function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false }));

// Sets the static file directory: express.static(root, [options])
app.use(express.static(path.join(__dirname, 'public')));

// Tell app to use cookie-parser
app.use(cookieParser());

// Security Middleware
// - This disables the `contentSecurityPolicy` middleware but keeps the rest.
app.use(helmet({ contentSecurityPolicy: false }));

// app.use(routes);

// Serve React Application
// This should come after routes, but before 404 and error handling.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get(/\/(?!api)*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Process sequelize errors
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Sequelize Error';
  }
  next(err);
});

// Process any other errors
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  const isProduction = environment === 'production';

  if (err.status === 401) {
    res.set('WWW-Authenticate', 'Bearer');
  }

  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    error: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
