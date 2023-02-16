const { testing, add, update, deleteRecord, findAll, findById, findByHospitalId, findByRecordOpener, findByPatientId } = require('../controllers/record.controller');
const router = require('express').Router();

router.get('/test', testing);
router.post('/new' , add);
router.put('/update' , update);
router.delete('/delete' , deleteRecord);
router.get('/findById' , findById);
router.get('/list' , findAll);
router.get('/findByPatientId' , findByPatientId);
router.get('/findByHospitalId' , findByHospitalId);
router.get('/findByRecordOpener' , findByRecordOpener);

module.exports = router;