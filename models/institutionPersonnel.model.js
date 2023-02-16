const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const institutionPersonnelModel = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userCode: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: false },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    isActive: { type: String, required: true },
    joinDate: { type: String, required: false },
    applicationDate: { type: String, required: false },
    institutionId: { type: String, required: false },
    institutionName: { type: String, required: false },
    institutionCode: { type: String, required: false }
});

institutionPersonnelModel.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, { expiresIn: "40d" })
    return token;
}

const InstitutionPersonnel = mongoose.model('institutionPersonnel', institutionPersonnelModel);

module.exports = InstitutionPersonnel;