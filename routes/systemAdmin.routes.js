const express = require('express');
const router = express.Router();
const { testing, findAll, findById, findByEmail, signin, signup, update, forgotPassword, resetPassword } = require('../controllers/systemAdmin.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByEmail', findByEmail);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword', resetPassword);
router.put('/update', update);

module.exports = router;