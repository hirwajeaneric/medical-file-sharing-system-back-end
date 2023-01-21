const institutionModel = require('../models/institution.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}

/** Multer configuration */
//Image storage
const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `logo-${req.body.name}`)
    }
})

exports.upload = multer({ storage: multerStorage});

exports.attachFile = (req, res, next) => {
    req.body.logo = req.file.filename;
    next();
}

exports.add = (req, res, next) => {
    institutionModel.create(req.body)
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.approve = (req, res, next) => {
    institutionModel.create(req.body)
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.update = (req, res, next) => {
    institutionModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findAll = (req, res, next) => {
    institutionModel.find() 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findById = (req, res, next) => {
    institutionModel.findById(req.query.id) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByDirectorId = (req, res, next) => {
    institutionModel.find({ directorId : req.query.directorId}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByCertificate = (req, res, next) => {
    institutionModel.find({ certificate: req.query.certificate }) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}
