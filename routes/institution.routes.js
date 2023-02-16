const express = require('express');
const router = express.Router();
const { testing, findAll, findById, upload, attachFile, add, update, approve, findByCertificate, findByCode, findByName, attachLogo, attachCertificate } = require('../controllers/institution.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByName', findByName);
router.get('/findByCode', findByCode);
router.get('/findByCertificate', findByCertificate);
router.post('/approve', approve);
router.post('/add', upload.single('fileAttachment'), attachFile, add);
router.put('/updateOne', update);
router.put('/updateLogo', upload.single('logo'), attachLogo, update);
router.put('/updateCertificate', upload.single('certificate'), attachCertificate, update);

module.exports = router;