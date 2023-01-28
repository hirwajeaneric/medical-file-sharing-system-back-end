const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patientId: { type: String, required: true },
    email: { type: String, required: true },
    hospitalName: { type: String, required: true },
    hospitalId: { type: String, required: true },
    recordOpener: { type: String, required: true },
    recordCloser: { type: String, required: false },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: false },
    status: { type: String, required: true },
    insuranceName: { type: String, required: false },
});

module.exports = mongoose.model('record', recordSchema);