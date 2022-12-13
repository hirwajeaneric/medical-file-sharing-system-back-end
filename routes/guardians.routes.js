const express = require('express');
const router = express.Router();
const { testing } = require('../controllers/guardians.controller');

router.get('/test', testing);

module.exports = router;