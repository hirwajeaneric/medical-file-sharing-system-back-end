const express = require('express');
const router = express.Router();
const { testing, findById, add, update, findAll } = require('../controllers/applicationForHospital.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.post('/add', add);
router.put('/update', update);

module.exports = router;