const systemAdminModel = require('../models/systemAdministrator.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const bcrypt = require('bcrypt');
const {validateSystemAdminSignin, validateSystemAdminSignup} = require('../services/validateSigninAndSignup');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}

exports.signin = async (req, res, next) => {
    try {
        const {error} = validateSystemAdminSignin(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        } 
        
        const systemAdmin = await systemAdminModel.findOne({email: req.body.email});
        if (!systemAdmin) {
            return res.status(401).send({ 
                message: "Invalid email or password"
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, systemAdmin.password);
        if (!validPassword) {
            return res.status(401).send({
                message: "Invalid email or password"
            })
        }

        const token = systemAdmin.generateAuthToken();
        res.status(200).send({
            token: token,
            user: systemAdmin
        })
    } catch(error){
        res.status(500).send({
            message: "Internal Server Error: "+error+"."
        })
    }
}

exports.signup = async (req, res, next) => {
    try {
        const {error} = validateSystemAdminSignup(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        const emailAlreadyRegistered = await systemAdminModel.findOne({ email: req.body.email});
        if (emailAlreadyRegistered) {
            return res.status(409).send({ 
                message: "Email address already registered"
            })
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new systemAdminModel({ 
            ...req.body, password: hashedPassword
        }).save();
        
        res.status(201).send({
            message: "Account created."
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
    systemAdminModel.findByIdAndUpdate(req.query.id)
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findAll = (req, res, next) => {
    systemAdminModel.find() 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findById = (req, res, next) => {
    systemAdminModel.findById(req.query.id) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}

exports.findByEmail = (req, res, next) => {
    const email = req.query.email;
    systemAdminModel.find({email}) 
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).send(`Server error ${err}`)
    })
}