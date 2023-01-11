const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "patient"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
});

module.exports = mongoose.model("patientToken", patientTokenSchema);