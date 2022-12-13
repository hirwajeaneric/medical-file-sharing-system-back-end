const express = require('express');
const router = express.Router();
const { testing } = require('../controllers/patient.controller');

router.get('/test', testing);

module.exports = router;