const mongoose = require('mongoose');

const fileModel = new mongoose.Schema({
    creationDate: {type: String, required: true},
    patientId: {type: String, required: true},
    patientName: {type: String, required: true},
    doctorId: {type: String, required: true},
    nurseId: {type: String, required: true},
    type: {type: String, required: true},
    content: {type: String, required: true},
    hospitalName: {type: String, required: true},
    hospitalId: {type: String, required: true},
    fileAttachment: {type: String, required: false}
});

const File = mongoose.model('file', fileModel);

module.exports = File;