const applicationForInstitutionModel = require('../models/applicationForInstitution');
const insitutionPersonnelModel = require('../models/institutionPersonnel.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const EmailTemplate = require('../services/EmailTemplate');
const sendEmail = require('../services/sendEmail');

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

exports.update = async (req, res, next) => {
    try {
        const update = await applicationForInstitutionModel.findByIdAndUpdate(req.query.id, req.body)
        let applicationStatus = '';
        var institutionAdmin = await insitutionPersonnelModel.findById(update.directorId);

        if (req.body.status === 'Approved') {
            applicationStatus = 'Approved';
            const approvalEmail = new EmailTemplate(institutionAdmin.email, `Institution request to join approved`, `Hello ${institutionAdmin.firstName}, \nCongratulations for joining the Medicase. Your request to join the Medicase (Medical File Sharing System) was successfully approved after it was carefully assessed by our team in MOH. \n\nYou will shortly be sent an email containing credential that will be used by your hospital to access the system. \n\nRegards, `);
            await sendEmail(approvalEmail.email, approvalEmail.subject, approvalEmail.text);
        } else if (req.body.status === 'Rejected') {
            applicationStatus = 'Rejected';
            const rejectionEmail = new EmailTemplate(institutionAdmin.email, `Request Rejected`, `Hello ${institutionAdmin.firstName}, \nThe request you submitted to join the Medicase was rejected. Your request to join the Medicase (Medical File Sharing System) has not passed the required critera to be admitted to have access to the Medicase. \nPlease Contact the medicase administration to get more information about how you can fulfill all requirements. \n\nRegards, `);
            await sendEmail(rejectionEmail.email, rejectionEmail.subject, rejectionEmail.text);
        }   

        res.status(201).send({ message: `Application ${applicationStatus}`, payload: update});
    } catch (error) { res.status(500).send(`Server error ${error}`)}
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
