// Basically a mini app()
const router = require('express').Router();

// Bring in API Router
const api = require('./api');

// If the route's path starts with /api, use API router
router.use('/api', api);

module.exports = router;
