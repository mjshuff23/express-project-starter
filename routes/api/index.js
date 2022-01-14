// Basically a mini app()
const router = require('express').Router();

// Create an array of routes to require and use
const routes = ['users'];

// For each path in the `routes` array, set up the URI and require the route
for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
