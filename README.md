# Express Project Start

My attempt at formulating an Express starter similar to my App Academy template

## Backend Setup

### Initialize Project and Repository

1. `npm init -y` to initialize a new package
2. `git init` to create a new Git repository
3. `touch .gitignore` to add a `.gitignore` file
   1. Add `node_modules` into this file so we don't upload packages

### Setup Database Connection

1. `touch .sequelizerc` to create a new Sequelize configuration

   ```javascript
   const path = require('path');

   module.exports = {
      config: path.resolve('config', 'database.js'),
      'models-path': path.resolve('db', 'models'),
      'seeders-path': path.resolve('db', 'seeders'),
      'migrations-path': path.resolve('db', 'migrations'),
   };

   ```

2. `touch .env` to create a file for our environment variables
3. Add `.env` to the `.gitignore` file so we don't upload our `.env` file to GitHub
4. In Postgres:
   1. Create a new `USER`/`ROLE` to administrate your app: 
      1. `CREATE ROLE **username** WITH ENCRYPTED PASSWORD '**password**';`
   2. Create a new `DATABASE` for your app and set the owner to be the `ROLE` you created previously: 
      1. `CREATE DATABASE **database** WITH OWNER **owner**;`

### Backend Packages

1. [**express**](https://expressjs.com/en/starter/installing.html) - Fast, unopinionated, minimalist web framework for Node.js
2. [**csurf**](https://www.npmjs.com/package/csurf) - Node.js CSRF protection middleware. Requires either a `session` middleware or `cookie-parser` to be initialized first.
3. [**cors**](https://www.npmjs.com/package/cors) - used to enable CORS with various options.
4. [**express-html-sanitizer**](https://www.npmjs.com/package/express-html-sanitizer) - Middleware for Express JS to cleanup/sanitize JSON request body in express RESTful Service or in any JSON input containing unwanted HTML tags.
5. [**@faker-js/faker**](https://github.com/faker-js/faker) - Generate massive amounts of fake data
6. **Time Conversion Packages**
   1. [**moment**](https://www.npmjs.com/package/moment) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.
      1. Larger than most other options
   2. [**Luxon**](https://moment.github.io/luxon/#/) - A powerful, modern, and friendly wrapper for JavaScript dates and times.
   3. [**Day.js**](https://day.js.org/) - A lightweight alternative to `moment`
7. [**dotenv**](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file into `process.env`
8. [**per-env**](https://www.npmjs.com/package/per-env) - Allows you to do certain things in `Node` based on the `environment` settings. `NODE_ENV` defaults to `development`
9. [**bcrypt**](https://www.npmjs.com/package/bcrypt) - A package to help hash passwords
10. [**cookie-parser**](https://www.npmjs.com/package/cookie-parser) - Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
11. [**express-bearer-token**](https://www.npmjs.com/package/express-bearer-token) - will attempt to extract a bearer token from a request from these locations:
     - The key access_token in the request body.
     - The key access_token in the request params.
     - The value from the header Authorization: Bearer <token>.
     - (Optional) Get a token from cookies header with key  access_token.
   If a token is found, it will be stored on req.token. If one has been provided in more than one location, this will abort the request immediately by sending code 400 (per RFC6750).
12. [**express-html-sanitizer**](https://www.npmjs.com/package/express-html-sanitizer) - cleanup/sanitize JSON request body in express RESTful Service or in any JSON input containing unwanted HTML tags.
13. [**express-validator**](https://www.npmjs.com/package/express-validator) - A library of string validators and sanitizers.
14. [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken) - Implementation of JSON Web Tokens
15. [**morgan**](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
16. [**pg**](https://www.npmjs.com/package/pg) - Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.
17. [**sequelize**](https://sequelize.org/master/identifiers.html) - Promise-based Node.js ORM tool for Postgres
18. [**sequelize-cli**](https://www.npmjs.com/package/sequelize-cli) - Sequelize Command Line Interface (CLI)
19. [**nodemon**](https://www.npmjs.com/package/nodemon) - Helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.