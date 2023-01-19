const applicationForInstitutionModel = require('../models/applicationForInstitution');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}

exports.add = (req, res, next) => {
    applicationForInstitutionModel.create(req.body)
    .then(response => {
        res.status(201).send({ message: 'Application submitted!', info: response});
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.attachCertificate = (req, res, next) => {
    req.body.certificate = req.file.filename;
    next();
}

exports.update = (req, res, next) => {
    applicationForInstitutionModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => {
        res.status(201).send({ message: 'Application Updated', payload: response});
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findAll = (req, res, next) => {
    applicationForInstitutionModel.find() 
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findById = (req, res, next) => {
    applicationForInstitutionModel.findById(req.query.id) 
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}
