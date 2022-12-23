const mongoose = require('mongoose');

const applicationForHospitalModel = new mongoose.Schema({
    directorId: {type: String, required: true},
    hospitalId: {type: String, required: true},
    hospitalName: {type: String, required: true},
    sendDate: {type: String, required: true},
    status: {type: String, required: true},
    respondDate: {type: String, required: true},
    applicationBody: {type: String, required: true},
    systemAdminId: {type: String, required: true},
});

const applicationForHospital = mongoose.model('applicationForHospital', applicationForHospitalModel);

module.exports = applicationForHospital;