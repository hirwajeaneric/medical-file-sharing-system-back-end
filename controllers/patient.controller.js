const patientModel =  require('../models/patient.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}

exports.signin = (req, res, next) => {

}

exports.signup = (req, res, next) => {
    
}

exports.add = (req, res, next) => {
    patientModel.create(req.body)
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.update = (req, res, next) => {
    patientModel.findByIdAndUpdate(req.query.id)
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findAll = (req, res, next) => {
    patientModel.find() 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findById = (req, res, next) => {
    patientModel.findById(req.query.id) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByEmail = (req, res, next) => {
    const email = req.query.email;
    patientModel.find({email}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByPhone = (req, res, next) => {
    const phoneNumber = req.query.phoneNumber;
    patientModel.find({ phoneNumber }) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByGuardians = (req, res, next) => {
    const guardians = req.query.guardians;
    patientModel.find({guardians}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}