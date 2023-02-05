const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const bcrypt = require('bcrypt');
const institutionModel = require('../models/institution.model');
const institutionPersonnelModel = require('../models/institutionPersonnel.model');
const institutionPersonnelTokenModel = require('../models/insitutionPersonnelToken.model');
const { validateInstitutionPersonnelSignin, validateInstitutionPersonnelSignup} = require('../services/validateSigninAndSignup');

exports.testing = (req, res, next) => { res.send('Admin Router works well!'); }

exports.addNew = async (req, res, next) => {
    try {
        const {error} = validateInstitutionPersonnelSignup(req.body);
        if (error) { return res.status(400).send({ message: error.details[0].message }) }

        const emailAlreadyRegistered = await institutionPersonnelModel.findOne({ email: req.body.email});
        if (emailAlreadyRegistered) { return res.status(409).send({ message: "This email address is already registered" }) }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const recordedPersonnel = await institutionPersonnelModel.create({...req.body, password: hashedPassword, joinDate: new Date().toDateString()})
        const userInfo = await institutionPersonnelModel.findOne({email: recordedPersonnel.email});
        
        await new institutionPersonnelTokenModel({ userId: userInfo._id, token: userInfo.generateAuthToken() }).save();

        res.status(201).send({ message: "User information saved" })

    } catch (error) { res.status(500).send({ message: "Internal Server Error: "+error+"." }) }
}

exports.createNew = async (req, res, next) => {
    try {
        const emailAlreadyRegistered = await institutionPersonnelModel.findOne({ email: req.body.email});
        if (emailAlreadyRegistered) { return res.status(409).send({ message: "This email address is already registered" }) }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const recordedPersonnel = await institutionPersonnelModel.create({...req.body, password: hashedPassword})
        const userInfo = await institutionPersonnelModel.findOne({email: recordedPersonnel.email});

        await new institutionPersonnelTokenModel({ userId: userInfo._id, token: userInfo.generateAuthToken() }).save();

        res.status(201).send({ message: "User information saved", info: userInfo })

    } catch (error) { res.status(500).send({ message: "Internal Server Error: "+error+"." }) }
}

exports.signin = async (req, res, next) => {
    try {
        const {error} = validateInstitutionPersonnelSignin(req.body);
        if (error) { return res.status(400).send({ message: error.details[0].message })} 
        
        const institutionPersonnel = await institutionPersonnelModel.findOne({userCode: req.body.userCode});
        if (!institutionPersonnel) { return res.status(401).send({ message: "Invalid credentials" })}

        const validPassword = await bcrypt.compare(req.body.password, institutionPersonnel.password);
        if (!validPassword) { return res.status(401).send({ message: "Invalid credentials" })}

        const institution = await institutionModel.findById(institutionPersonnel.institutionId);

        if (req.body.institutionCode !== institutionPersonnel.institutionCode) {
            return res.status(401).send({message: 'User not recognized for this institution.'});
        } else {
            if (institution.isApproved === 'suspended') {
                return res.status(401).send({message: 'Sorry, Institution access to the MEDICASE is temporarily suspended.'});
            } else if (institution.isApproved === "false") {
                return res.status(401).send({message: 'Institution does not have access to the MEDICASE.'});
            } else {
                if (institutionPersonnel.isActive === "false") {
                    return res.status(401).send({message: 'User account suspended.'});
                } else {
                    const token = institutionPersonnel.generateAuthToken();
                    if (token) {
                        return res.status(200).send({
                            token: token,
                            id: institutionPersonnel._id,
                            firstName: institutionPersonnel.firstName,
                            lastName: institutionPersonnel.lastName,
                            email: institutionPersonnel.email,
                            role: institutionPersonnel.role,
                            userCode: institutionPersonnel.userCode,
                            isActive: institutionPersonnel.isActive,
                            institutionType: institution.type,
                            institutionId: institutionPersonnel.institutionId,
                            institutionName: institutionPersonnel.institutionName, 
                        })   
                    } else {
                        return res.status(200).send({ message: 'Access denied, please contract your institution system admin for support.' })
                    }   
                }
            }
        }
    } catch(error){ res.status(500).send({ message: "Internal Server Error: "+error+"." }) }
}

exports.signup = async (req, res, next) => {
    try {
        const {error} = validateInstitutionPersonnelSignup(req.body);
        if (error) { return res.status(400).send({ message: error.details[0].message }) }

        const emailAlreadyRegistered = await institutionPersonnelModel.findOne({ email: req.body.email});
        if (emailAlreadyRegistered) { return res.status(409).send({  message: "This email address is already registered" }) }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const savedUser = await new institutionPersonnelModel({ 
            ...req.body, password: hashedPassword
        }).save();
        
        const userInfo = await institutionPersonnelModel.findOne({ email: savedUser.email });
        await new institutionPersonnelTokenModel({ userId: userInfo._id, token: userInfo.generateAuthToken() }).save();

        res.status(201).send({
            message: "Account registered. Your account is being verified. You will be notified via email once your account is activated.",
            info:  userInfo
        })
    } catch (error) { res.status(500).send({ message: "Internal Server Error: "+error+"."}) }
}

exports.forgotPassword = (req, res, next) => {

}

exports.resetPassword = (req, res, next) => {
    
}

exports.update = (req, res, next) => {
    institutionPersonnelModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findAll = (req, res, next) => {
    institutionPersonnelModel.find() 
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`)})
}

exports.findById = (req, res, next) => {
    institutionPersonnelModel.findById(req.query.id) 
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByEmail = (req, res, next) => {
    institutionPersonnelModel.findOne({email: req.query.email}) 
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByInstitutionCode = (req, res, next) => {
    institutionPersonnelModel.find({institutionCode: req.query.institutionCode}) 
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`)})
}

exports.findByRole = (req, res, next) => {
    institutionPersonnelModel.find({role: req.query.role}) 
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByInstitutionId = (req, res, next) => {
    institutionPersonnelModel.find({institutionId : req.query.institutionId}) 
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.findByInstitutionName = (req, res, next) => {
    institutionPersonnelModel.find({institutionName : req.query.institutionName}) 
    .then(response => { res.status(200).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.deleteAccount = (req, res, next) => {
    institutionPersonnelModel.findByIdAndDelete(req.query.id)
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}