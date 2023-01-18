const { testing, add, update, deleteRecord, findAll, findByEmail, findById, findByHospitalId, findByRecordOpener } = require('../controllers/record.controller');
const router = require('express').Router();

router.get('/test', testing);
router.post('/new' , add);
router.post('/update' , update);
router.post('/delete' , deleteRecord);
router.post('/findById' , findById);
router.post('/list' , findAll);
router.post('/findByEmail' , findByEmail);
router.post('/findByHospital' , findByHospitalId);
router.post('/findByRecordOpener' , findByRecordOpener);

module.exports = router;