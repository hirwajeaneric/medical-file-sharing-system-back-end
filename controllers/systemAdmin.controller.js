const systemAdminModel = require('../models/systemAdministrator.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const bcrypt = require('bcrypt');
const {validateSystemAdminSignin, validateSystemAdminSignup} = require('../services/validateSigninAndSignup');
const adminTokenModel = require('../models/adminToken.model');

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
            id: systemAdmin._id,
            firstName: systemAdmin.firstName,
            lastName: systemAdmin.lastName,
            email: systemAdmin.email,
            phone: systemAdmin.phone
        })
    } catch(error){
        res.status(500).send({
            message: "Internal Server Error: "+error+"."
        })
    }
}

exports.signup = async (req, res, next) => {
    try {
        // Validate input
        const {error} = validateSystemAdminSignup(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        // Checking whether email of user is already registered
        const emailAlreadyRegistered = await systemAdminModel.findOne({ email: req.body.email});
        if (emailAlreadyRegistered) {
            return res.status(409).send({ 
                message: "Email address already registered"
            })
        }

        // Encrypting the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Saving the user
        const savedUser = await new systemAdminModel({ 
            ...req.body, password: hashedPassword
        }).save();

        // Saving a user's token in the database
        const userInfo = await systemAdminModel.findOne({email: savedUser.email});
        await new adminTokenModel({
            userId: userInfo._id,
            token: userInfo.generateAuthToken()
        }).save();

        // Send Response
        res.status(201).send({
            message: "Account created."
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error: "+error+"."
        })
    }
}

exports.forgotPassword = async (req, res, next) => {
    // Validate input
    const {error} = validateSystemAdminSignup(req.body);
    if (error) { return res.status(400).send({message: error.details[0].message}) }

    // Checking whether email of user is does even exist
    const userWithEmail = await systemAdminModel.findOne({ email: req.body.email});
    if (!userWithEmail) { return res.status(409).send({ message: "User not found!" }) }

    // Delete the token with this user Id

    // Create another temporary token to send to the user.

    // Save that token

    // Send that token and user id in a link via email
}

exports.resetPassword = (req, res, next) => {
    // Check whether the sent token is actually still valid or expired
    
    // Check whether the send token is the one we sent the user and saved in the database

    // Hash the new password

    // Update the user account with the new password

    // Let's now delete the token we sent the user to reset the password

    // Let's generate a new token for the user to stay with.

    // Send the user an email indicating them that their password was successfully reset.
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