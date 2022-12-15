const express = require('express');
const { findByEmail } = require('../controllers/hospitalPersonnel.controller');
const router = express.Router();
const { testing, findAll, findById, add, update, findByPhone, findByGuardians, signin, signup } = require('../controllers/patient.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByEmail', findByEmail);
router.get('/findByPhone', findByPhone);
router.get('/findByGuardians', findByGuardians);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/add', add);
router.put('/update', update);

module.exports = router;