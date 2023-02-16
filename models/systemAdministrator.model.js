const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminModel = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
});

adminModel.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: "40d"})
    return token;
}

const admin = mongoose.model('admin', adminModel);

module.exports = admin;