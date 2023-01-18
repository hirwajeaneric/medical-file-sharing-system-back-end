const express = require('express');
const router = express.Router();
const { testing, findAll, findById, update, findByEmail, findByRole, findByHospitalId, findByHospitalName, signin, signup, forgotPassword, resetPassword, createNew, findByInstitutionId, findByInstitutionName } = require('../controllers/institutionPersonnel.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByEmail', findByEmail);
router.get('/findByRole', findByRole);
router.get('/findByInstitutionId', findByInstitutionId);
router.get('/findByInstitutionName', findByInstitutionName);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassord', resetPassword);
router.post('/createUser', createNew);
router.put('/update', update);

module.exports = router;