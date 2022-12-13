const express = require('express');
const router = express.Router();
const { testing } = require('../controllers/hospital.controller');

router.get('/test', testing);

module.exports = router;