const express = require('express');
const router = express.Router();
const { testing, findAll, findById, upload, attachFile, add, update, approve, findByCertificate, findByCode, findByName } = require('../controllers/institution.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByName', findByName);
router.get('/findByCode', findByCode);
router.get('/findByCertificate', findByCertificate);
router.post('/approve', approve);
router.post('/add', upload.single('fileAttachment'), attachFile, add);
router.put('/updateTwo', upload.single('fileAttachment'), attachFile, update);
router.put('/updateOne', update);

module.exports = router;