const applicationForHospitalModel = require('../models/applicationForHospital');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}
