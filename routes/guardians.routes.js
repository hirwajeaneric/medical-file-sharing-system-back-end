const express = require('express');
const router = express.Router();
const { testing, findAll, findById, add, update } = require('../controllers/guardians.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByPatientId', findByPatientId);
router.post('/add', add);
router.put('/update', update);

module.exports = router;