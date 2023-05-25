const express = require('express');
const router = express.Router();
const { findAll, findById, add, update } = require('../controllers/notifications.controller');

router.get('/list', findAll);
router.get('/findById', findById);
router.post('/add', add);
router.put('/update', update);

module.exports = router;