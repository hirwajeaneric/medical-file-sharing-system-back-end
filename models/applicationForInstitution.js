const mongoose = require('mongoose');

const applicationForInstitutionModel = new mongoose.Schema({
    directorId: {type: String, required: true},
    institutionType: {type: String, required: true},
    institutionId: {type: String, required: true},
    institutionName: {type: String, required: true},
    sendDate: {type: String, required: true},
    status: {type: String, required: true},
    respondDate: {type: String, required: false},
    applicationBody: {type: String, required: true},
    systemAdminId: {type: String, required: true},
    location: {type: String, required: true},
    certificate: {type: String, required: true},
    numberOfPersonnel: { type: String, required: true },
});

const applicationForInstitution = mongoose.model('applicationForInstitution', applicationForInstitutionModel);

module.exports = applicationForInstitution;