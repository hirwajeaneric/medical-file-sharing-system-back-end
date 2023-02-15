const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

exports.validateInstitutionPersonnelSignin = data =>{
    const schema = Joi.object({
        userCode: Joi.string().required().label('User code'),
        password: Joi.string().required().label('Password'),
        institutionCode: Joi.string().required().label('Institution Code'),
    })
    return schema.validate(data)
}

exports.validateInstitutionPersonnelSignup = data =>{
    const schema = Joi.object({
        firstName: Joi.string().required().label('First name'),
        lastName: Joi.string().required().label('Last name'),
        email: Joi.string().email().required().label('Email'),
        userCode: Joi.string().required().label('User code'),
        phone: Joi.string().required().label('Phone'),
        role: Joi.string().required().label('Role/Position'),
        isActive: Joi.string().required().label('Is Active'),
        institutionName: Joi.string().required().label('Institution name'),
        institutionId: Joi.string().required().label('Institution id'),
        institutionCode: Joi.string().required().label('Institution code'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(data)
}

exports.validateEmail = data =>{
    const schema = Joi.object({
        email: Joi.string().required().label('Email'),
    })
    return schema.validate(data)
}

exports.validatePatientSignin = data =>{
    const schema = Joi.object({
        email: Joi.string().required().label('Email'),
        password: Joi.string().required().label('Password'),
    })
    return schema.validate(data)
}

exports.validatePatientSignup = data =>{
    const schema = Joi.object({
        firstName: Joi.string().required().label('First name'),
        lastName: Joi.string().required().label('Last name'),
        email: Joi.string().email().required().label('Email'),
        phone: Joi.string().required().label('Phone number'),
        residence: Joi.string().required().label('Residence'),
        joinDate: Joi.date().required().label('Join Date'),
        dateOfBirth: Joi.string().required().label('Date of birth'),
        gender: Joi.string().required().label('Gender'),
        password: passwordComplexity().required().label('Password'),
        registeredAt: Joi.string().required().label('Registered At'),
    })
    return schema.validate(data)
}

exports.validateSystemAdminSignin = data =>{
    const schema = Joi.object({
        email: Joi.string().required().label('Email'),
        password: Joi.string().required().label('Password'),
    })
    return schema.validate(data)
}

exports.validateSystemAdminSignup = data =>{
    const schema = Joi.object({
        firstName: Joi.string().required().label('First name'),
        lastName: Joi.string().required().label('Last name'),
        email: Joi.string().email().required().label('Email'),
        phone: Joi.string().required().label('Phone number'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(data)   
}

exports.validateEmail = data => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email")
    })
    return schema.validate(data);
}