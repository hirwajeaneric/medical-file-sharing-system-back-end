const mongoose = require('mongoose');

const guardianModel = new mongoose.Schema({
    patientId: {type: String, required: false},
    nameOfMaleGuardian: {type: String, required: false},
    nameOfFemaleGuardian: {type: String, required: false},
    locationOfMaleGuardian: {type: String, required: false},
    locationOfFemaleGuardian: {type: String, required: false},
    phoneOfMaleGuardian: {type: String, required: false},
    phoneOfFemaleGuardian: {type: String, required: false}
});

const Guardians = mongoose.model('guardians', guardianModel);

module.exports = Guardians;