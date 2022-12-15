const mongoose = require('mongoose');

const patientModel = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    residence: {type: String, required: true},
    placeOfBirth: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    maritalStatus: {type: String, required: true},
    gender: {type: String, required: true},
    joinDate: {type: String, required: true},
    guardians: {type: String, required: true},
});

patientModel.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: "1d"})
    return token;
}

const Patient = mongoose.model('patient', patientModel);

module.exports = Patient;