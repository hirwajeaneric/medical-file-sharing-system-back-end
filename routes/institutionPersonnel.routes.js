const express = require('express');
const router = express.Router();
const { testing, findAll, findById, update, findByEmail, findByRole, findByHospitalId, findByHospitalName, signin, signup, forgotPassword, resetPassword, createNew, findByInstitutionId, findByInstitutionName, addNew, deleteAccount } = require('../controllers/institutionPersonnel.controller');

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
router.post('/addUser', addNew);
router.post('/createUser', createNew);
router.put('/updateInstitution', update);
router.put('/delete', deleteAccount);

module.exports = router;