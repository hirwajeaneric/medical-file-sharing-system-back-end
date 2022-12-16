const express = require('express');
const { findByEmail } = require('../controllers/hospitalPersonnel.controller');
const router = express.Router();
const { testing, findAll, findById, add, update, findByPhone, findByGuardians, signin, signup, forgotPassword, resetPassword } = require('../controllers/patient.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByEmail', findByEmail);
router.get('/findByPhone', findByPhone);
router.get('/findByGuardians', findByGuardians);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.put('/update', update);

module.exports = router;