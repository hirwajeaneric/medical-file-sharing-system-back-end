const mongoose = require('mongoose');

const institutionModel = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    location: {type: String, required: true},
    directorId: {type: String, required: true},
    directorName: {type: String, required: true},
    specialization: {type: String, required: true},
    joinDate: {type: String, required: true},
    logo: {type: String, required: true},
    isApproved: {type: String, required: true},
});

const Institution = mongoose.model('institution', institutionModel);

module.exports = Institution;