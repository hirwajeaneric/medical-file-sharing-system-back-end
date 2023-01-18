const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patientId: { type: String, required: true },
    email: { type: String, required: true },
    hospitalName: { type: String, required: true },
    hospitalId: { type: String, required: true },
    doctors: { type: Array, required: true },
    recordOpener: { type: String, required: true },
    files: { type: Array, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    status: { type: String, required: true },
    insuranceName: { type: String, required: true },
});

module.exports = mongoose.model('record', recordSchema);