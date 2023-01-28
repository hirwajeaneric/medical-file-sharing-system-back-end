const express = require('express');
const router = express.Router();
const { testing, findAll, add, findById, update, upload, attachFile, findByCreationDate, findByDoctorId, findByType, findByHospitalId, findByPatientId, findByRecordId } = require('../controllers/file.controller');

router.get('/test', testing);
router.get('/list', findAll);
router.get('/findById', findById);
router.get('/findByPatientId', findByPatientId);
router.get('/findByRecordId', findByRecordId);
router.get('/findByHospitalId', findByHospitalId);
router.get('/findByType', findByType);
router.get('/findByDoctorId', findByDoctorId);
router.get('/findByCreationDate', findByCreationDate);
router.post('/add', upload.single('fileAttachment'), attachFile, add);
router.put('/update', upload.single('fileAttachment'), attachFile, update);

module.exports = router;