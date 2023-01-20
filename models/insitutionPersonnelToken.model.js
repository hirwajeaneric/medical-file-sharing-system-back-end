const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const institutionPersonnelTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "institutionPersonnel"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 3600,
    }
});

module.exports = mongoose.model("institutionPersonnelToken", institutionPersonnelTokenSchema);