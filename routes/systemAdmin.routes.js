const express = require('express');
const router = express.Router();
const { testing, findAll, findById, findByEmail, signin, signup, update } = require('../controllers/systemAdmin.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByEmail', findByEmail);
router.post('/signin', signin);
router.post('/signup', signup);
router.put('/update', update);

module.exports = router;