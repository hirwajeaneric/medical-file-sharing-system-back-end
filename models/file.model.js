const mongoose = require('mongoose');

const fileModel = new mongoose.Schema({
    creationDate: {type: String, required: true},
    recordId: {type: String, required: true},
    patientId: {type: String, required: true},
    patientName: {type: String, required: true},
    patientGender: {type: String, required: true},
    patientAge: {type: String, required: true},
    doctorId: {type: String, required: false},
    nurseId: {type: String, required: false},
    labTechId: {type: String, required: false},
    type: {type: String, required: true},
    prescriptions: {type: String, required: false},
    neededExams: {type: String, required: false},
    examsResults: {type: String, required: false},
    hospitalName: {type: String, required: true},
    hospitalId: {type: String, required: true},
    hospitalLocation: {type: String, required: true},
    fileAttachment: {type: String, required: false}
});

const File = mongoose.model('file', fileModel);

module.exports = File;