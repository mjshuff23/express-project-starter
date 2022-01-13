# Express Project Start

My attempt at formulating an Express starter similar to my App Academy template

## Backend Setup

1. `npm init -y` to initialize a new package
2. `git init` to create a new Git repository
3. `touch .gitignore` to add a `.gitignore` file
   1. Add `node_modules` into this file so we don't upload packages
4. `touch .sequelizerc` to create a new Sequelize configuration
5. `touch .env` to create a file for our environment variables

### Backend Packages

1. [**csurf**](https://www.npmjs.com/package/csurf) - Node.js CSRF protection middleware. Requires either a `session` middleware or `cookie-parser` to be initialized first.
2. [**express-html-sanitizer**](https://www.npmjs.com/package/express-html-sanitizer) - Middleware for Express JS to cleanup/sanitize JSON request body in express RESTful Service or in any JSON input containing unwanted HTML tags.
3. [**@faker-js/faker**](https://github.com/faker-js/faker) - Generate massive amounts of fake data
4. **Time Conversion Packages**
   1. [**moment**](https://www.npmjs.com/package/moment) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.
      1. Larger than most other options
   2. [**Luxon**](https://moment.github.io/luxon/#/) - A powerful, modern, and friendly wrapper for JavaScript dates and times.
   3. [**Day.js**](https://day.js.org/) - A lightweight alternative to moment
5. [**per-env**]