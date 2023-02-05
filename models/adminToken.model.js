const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "admin"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = mongoose.model("adminToken", adminTokenSchema);