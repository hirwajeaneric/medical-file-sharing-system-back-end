const mongoose = require('mongoose');

const guardianModel = new mongoose.Schema({
    patientId: {type: String, required: true},
    nameOfMaleGuardian: {type: String, required: true},
    nameOfFemaleGuardian: {type: String, required: true},
    locationOfMaleGuardian: {type: String, required: true},
    locationOfFemaleGuardian: {type: String, required: true},
    phoneOfMaleGuardian: {type: String, required: true},
    phoneOfFemaleGuardian: {type: String, required: true}
});

const Guardians = mongoose.model('guardians', guardianModel);

module.exports = Guardians;