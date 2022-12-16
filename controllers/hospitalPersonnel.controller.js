const hospitalPersonnelModel = require('../models/hospitalPersonnel.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const bcrypt = require('bcrypt');
const { validateHospitalPersonnelSignin, validateHospitalPersonnelSignup} = require('../services/validateSigninAndSignup');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}

exports.signin = async (req, res, next) => {
    try {
        const {error} = validateHospitalPersonnelSignin(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        } 
        
        const hospitalPersonnel = await hospitalPersonnelModel.findOne({userCode: req.body.userCode});
        if (!hospitalPersonnel) {
            return res.status(401).send({ 
                message: "Invalid credentials"
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, hospitalPersonnel.password);
        if (!validPassword) {
            return res.status(401).send({
                message: "Invalid credentials"
            })
        }

        const token = hospitalPersonnel.generateAuthToken();
        res.status(200).send({
            token: token,
            user: hospitalPersonnel
        })
    } catch(error){
        res.status(500).send({
            message: "Internal Server Error: "+error+"."
        })
    }
}

exports.signup = async (req, res, next) => {
    try {
        const {error} = validateHospitalPersonnelSignup(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        const emailAlreadyRegistered = await hospitalPersonnelModel.findOne({ email: req.body.email});
        if (emailAlreadyRegistered) {
            return res.status(409).send({ 
                message: "This email address is already registered"
            })
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new hospitalPersonnelModel({ 
            ...req.body, password: hashedPassword
        }).save();
        
        res.status(201).send({
            message: "Account registered. Your account is being verified. You will be notified via email once your account is activated."
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error: "+error+"."
        })
    }
}

exports.forgotPassword = (req, res, next) => {

}

exports.resetPassword = (req, res, next) => {
    
}

exports.update = (req, res, next) => {
    hospitalPersonnelModel.findByIdAndUpdate(req.query.id)
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findAll = (req, res, next) => {
    hospitalPersonnelModel.find() 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findById = (req, res, next) => {
    hospitalPersonnelModel.findById(req.query.id) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByEmail = (req, res, next) => {
    const email = req.query.email;
    hospitalPersonnelModel.find({email}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByRole = (req, res, next) => {
    const role = req.query.role;
    hospitalPersonnelModel.find({role}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByHospitalId = (req, res, next) => {
    const hospitalId = req.query.hospitalId;
    hospitalPersonnelModel.find({hospitalId}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByHospitalName = (req, res, next) => {
    const hospitalName = req.query.hospitalName;
    hospitalPersonnelModel.find({hospitalName}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}