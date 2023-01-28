const patientModel =  require('../models/patient.model');
const patientTokenModel = require('../models/patientToken.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const { validatePatientSignin, validatePatientSignup} = require('../services/validateSigninAndSignup');
const bcrypt = require('bcrypt');

exports.testing = (req, res, next) => { res.send('Admin Router works well!'); }

exports.signin = async (req, res, next) => {
    try {
        const {error} = validatePatientSignin(req.body);
        if (error) { return res.status(400).send({ message: error.details[0].message }) } 
        
        const patient = await patientModel.findOne({email: req.body.email});
        if (!patient) { return res.status(401).send({ message: "Invalid email or password"}) }

        const validPassword = await bcrypt.compare(req.body.password, patient.password);
        if (!validPassword) { return res.status(401).send({ message: "Invalid email or password" }) }

        // const token = patient.generateAuthToken();
        const userToken = await patientTokenModel.findOne({userId: patient._id});
        res.status(200).send({
            token: userToken.token,
            id: patient._id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            email: patient.email,
        })
    } catch(error){ res.status(500).send({ message: "Internal Server Error: "+error+"." }) }
}

exports.signup = async (req, res, next) => {
    try {
        const {error} = validatePatientSignup(req.body);
        if (error) { return res.status(400).send({ message: error.details[0].message}) }

        const emailAlreadyRegistered = await patientModel.findOne({ email: req.body.email});
        if (emailAlreadyRegistered) { return res.status(409).send({ message: "Email address already registered" }) }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const recordedPatient = await new patientModel({ ...req.body, password: hashedPassword }).save();

        const patientInfo = await patientModel.findOne({email: recordedPatient.email});

        await new patientTokenModel({ userId: patientInfo._id, token: patientInfo.generateAuthToken() }).save();
        
        res.status(201).send({ message: "Account created.", patient: recordedPatient })
    } catch (error) { res.status(500).send({ message: "Internal Server Error: "+error+"." }) }
}

exports.forgotPassword = (req, res, next) => {

}

exports.resetPassword = (req, res, next) => {
    
}

exports.add = (req, res, next) => {
    patientModel.create(req.body)
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.update = (req, res, next) => {
    patientModel.findByIdAndUpdate(req.query.id)
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`)})
}

exports.findAll = (req, res, next) => {
    patientModel.find() 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`)})
}

exports.findById = (req, res, next) => {
    patientModel.findById(req.query.id) 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`)})
}

exports.findByEmail = (req, res, next) => {
    patientModel.find({email: req.query.email}) 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByPhone = (req, res, next) => {
    const phoneNumber = req.query.phoneNumber;
    patientModel.find({ phoneNumber }) 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByGuardians = (req, res, next) => {
    const guardians = req.query.guardians;
    patientModel.find({guardians}) 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}