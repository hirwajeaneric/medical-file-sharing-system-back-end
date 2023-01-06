const mongoose = require('mongoose');

const hospitalPersonnelModel = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userCode: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    isActive: { type: String, required: true },
    joinDate: { type: String, required: true },
    hospitalId: { type: String, required: true },
    hospitalName: { type: String, required: true },
});

hospitalPersonnelModel.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, { expiresIn: "1d" })
    return token;
}

const HospitalPersonnel = mongoose.model('hospitalPersonnel', hospitalPersonnelModel);

module.exports = HospitalPersonnel;