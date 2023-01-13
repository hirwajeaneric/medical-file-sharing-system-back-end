const express = require('express');
const router = express.Router();
const { testing, findById, add, update, findAll, attachCertificate } = require('../controllers/applicationForInstitution.controller');
const { upload } = require('../controllers/file.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.post('/add', upload.single('certificate'), attachCertificate, add);
router.put('/update', update);

module.exports = router;