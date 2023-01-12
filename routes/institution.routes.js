const express = require('express');
const router = express.Router();
const { testing, findAll, findById, upload, attachFile, add, update } = require('../controllers/institution.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.post('/add', upload.single('fileAttachment'), attachFile, add);
router.put('/update', upload.single('fileAttachment'), attachFile, update);

module.exports = router;