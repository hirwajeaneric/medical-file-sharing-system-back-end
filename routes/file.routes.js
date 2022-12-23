const express = require('express');
const router = express.Router();
const { testing, findAll, add, findById, update, upload, attachFile } = require('../controllers/file.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.post('/add', upload.single('fileAttachment'), attachFile, add);
router.put('/update', upload.single('fileAttachment'), attachFile, update);

module.exports = router;