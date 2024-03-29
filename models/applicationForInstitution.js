const mongoose = require('mongoose');

const applicationForInstitutionModel = new mongoose.Schema({
    directorId: {type: String, required: true},
    institutionType: {type: String, required: true},
    institutionId: {type: String, required: false},
    institutionName: {type: String, required: true},
    sendDate: {type: Date, required: true},
    status: {type: String, required: true},
    respondDate: {type: Date, required: false},
    applicationBody: {type: String, required: false},
    systemAdminId: {type: String, required: false},
    location: {type: String, required: true},
    certificate: {type: String, required: true},
    numberOfPersonnel: { type: String, required: true },
});

const applicationForInstitution = mongoose.model('applicationForInstitution', applicationForInstitutionModel);

module.exports = applicationForInstitution;