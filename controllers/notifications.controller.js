const notificationsModel =  require('../models/notifications.model');

exports.add = (req, res, next) => {
    notificationsModel.create(req.body)
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`) })
}

exports.update = (req, res, next) => {
    notificationsModel.findByIdAndUpdate(req.query.id)
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`)})
}

exports.findAll = (req, res, next) => {
    notificationsModel.find() 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`)})
}

exports.findById = (req, res, next) => {
    notificationsModel.findById(req.query.id) 
    .then(response => { res.status(201).send(response); })
    .catch(err => { res.status(500).send(`Server error ${err}`)})
}