const institutionPersonnelModel = require('../models/institutionPersonnel.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const bcrypt = require('bcrypt');
const { validateInstitutionPersonnelSignin, validateInstitutionPersonnelSignup} = require('../services/validateSigninAndSignup');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}

exports.signin = async (req, res, next) => {
    try {
        const {error} = validateInstitutionPersonnelSignin(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        } 
        
        const institutionPersonnel = await institutionPersonnelModel.findOne({userCode: req.body.userCode});
        if (!institutionPersonnel) {
            return res.status(401).send({ 
                message: "Invalid credentials"
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, institutionPersonnel.password);
        if (!validPassword) {
            return res.status(401).send({
                message: "Invalid credentials"
            })
        }

        const token = institutionPersonnel.generateAuthToken();
        res.status(200).send({
            token: token,
            user: institutionPersonnel
        })
    } catch(error){
        res.status(500).send({
            message: "Internal Server Error: "+error+"."
        })
    }
}

exports.signup = async (req, res, next) => {
    try {
        const {error} = validateInstitutionPersonnelSignup(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        const emailAlreadyRegistered = await institutionPersonnelModel.findOne({ email: req.body.email});
        if (emailAlreadyRegistered) {
            return res.status(409).send({ 
                message: "This email address is already registered"
            })
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new institutionPersonnelModel({ 
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
    institutionPersonnelModel.findByIdAndUpdate(req.query.id)
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findAll = (req, res, next) => {
    institutionPersonnelModel.find() 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findById = (req, res, next) => {
    institutionPersonnelModel.findById(req.query.id) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByEmail = (req, res, next) => {
    const email = req.query.email;
    institutionPersonnelModel.find({email}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByRole = (req, res, next) => {
    const role = req.query.role;
    institutionPersonnelModel.find({role}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByInstitutionId = (req, res, next) => {
    const institutionId = req.query.institutionId;
    institutionPersonnelModel.find({institutionId}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByInstitutionName = (req, res, next) => {
    const institutionName = req.query.institutionName;
    institutionPersonnelModel.find({institutionName}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}