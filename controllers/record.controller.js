const recordModel = require('../models/record.model');

exports.testing = (req, res, next) => { res.send('Record Router works well!'); }

exports.add = (req, res, next) => {
    recordModel.create(req.body)
    .then(response => { res.status(201).send({message: 'New record opened', record: response}); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.update = (req, res, next) => {
    recordModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => { res.status(201).send({message: 'Record closed', record: response}); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.deleteRecord = (req, res, next) => {
    recordModel.findByIdAndDelete(req.query.id)
    .then(response => { res.status(202).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findAll = (req, res, next) => {
    recordModel.find()
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findById = (req, res, next) => {
    recordModel.findById(req.query.id)
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByPatientId = (req, res, next) => {
    recordModel.find({patientId: req.query.patientId})
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByHospitalId = (req, res, next) => {
    recordModel.find({hospitalId: req.query.hospitalId})
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByRecordOpener = (req, res, next) => {
    recordModel.find({recordOpener: req.query.recordOpener})
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}