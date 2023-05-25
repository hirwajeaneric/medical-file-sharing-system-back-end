const fileModel = require('../models/file.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const statisticalGenerator = require('../utils/statisticalGenerator');
const generateNotificationMessage = require('../utils/generateNotificationMessage');

exports.testing = (req, res, next) => { res.send('Admin Router works well!'); }

/** Multer configuration */
//Image storage
const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => { callback(null, './uploads') },
    filename: (req, file, callback) => { callback(null, `file-${moment(new Date()).format('DD-MM-YYYY')}-${file.originalname}`) }
})

exports.upload = multer({ storage: multerStorage});

exports.attachFile = (req, res, next) => {
    req.body.fileAttachment = req.file.filename;
    next();
}

exports.add = (req, res, next) => {
    fileModel.create(req.body)
    .then(response => {
        next(); 
        res.status(201).send(response); 
    })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.checkForAlert = async (req, res, next) => {
    /////////////////////////////////////////////////////////////////////
    // CREATING A FILTER

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    var filterObject = { from: today.toISOString(), to: tomorrow.toISOString() };
    
    /////////////////////////////////////////////////////////////////////
    // GENERATING STATISTICS OF TODAY

    var stringifiedTestData = [];
    var parsedTestData = [];

    // FETCHING ALL FILES FOR EXTRACTION OF NEEDED INFO 
    const listOfFiles = await fileModel.find();

    // Extracting needed file information 
    listOfFiles.forEach(file => {
        if (Date.parse(file.creationDate) >= Date.parse(new Date(filterObject.from)) && Date.parse(file.creationDate) <= Date.parse(new Date(filterObject.to))) {
            if (file.exams) {
                stringifiedTestData.push(file.exams);
            }
        }
    });

    stringifiedTestData.forEach(element => {
        parsedTestData.push(JSON.parse(element));
    });

    const mergedTestData = [].concat(...parsedTestData);
    mergedTestData.forEach((element, index) => { element.id = index; })

    // Calling the function responsible for generating organized statistical data.
    var testStatistics = statisticalGenerator(mergedTestData)

    //////////////////////////////////////////////////////////////////////
    // Generating Alert Messages 
    let notification = generateNotificationMessage(testStatistics);

    
}

exports.update = (req, res, next) => {
    fileModel.findByIdAndUpdate(req.query.id)
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByPatientId = (req, res, next) => {
    fileModel.find({patientId :req.query.patientId})
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByRecordId = (req, res, next) => {
    fileModel.find({recordId :req.query.recordId})
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByHospitalId = (req, res, next) => {
    fileModel.find({hospitalId :req.query.hospitalId})
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByType = (req, res, next) => {
    fileModel.find({type :req.query.type})
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByDoctorId = (req, res, next) => {
    fileModel.find({doctorId :req.query.doctorId})
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByCreationDate = (req, res, next) => {
    fileModel.find({creationDate :req.query.creationDate})
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findAll = (req, res, next) => {
    fileModel.find() 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findById = (req, res, next) => {
    fileModel.findById(req.query.id) 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}