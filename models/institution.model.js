const mongoose = require('mongoose');

const institutionModel = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    location: {type: String, required: true},
    directorId: {type: String, required: true},
    directorName: {type: String, required: true},
    specialization: {type: String, required: false},
    joinDate: {type: Date, required: true},
    logo: {type: String, required: false},
    isApproved: {type: String, required: true},
    certificate: {type: String, required: true},
    numberOfPersonnel: { type: String, required: true },
    institutionCode: { type: String, required: false },
    postalBox: { type: String, required: false },
    contactEmail: { type: String, required: false },
    contactPhone: { type: String, required: false }
});

const Institution = mongoose.model('institution', institutionModel);

module.exports = Institution;
