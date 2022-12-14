const express = require('express');
const router = express.Router();
const { testing, findAll, findById, update, findByEmail, findByRole, findByHospitalId, findByHospitalName, signin, signup, forgotPassword, resetPassword } = require('../controllers/hospitalPersonnel.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByEmail', findByEmail);
router.get('/findByRole', findByRole);
router.get('/findByHospitalId', findByHospitalId);
router.get('/findByHospitalName', findByHospitalName);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassord', resetPassword);
router.put('/update', update);

module.exports = router;