const mongoose = require('mongoose');

const notificationsModel = new mongoose.Schema({
    time: {type: Date, required: true, default: Date.now()},
    severity: {type: String, required: false},
    message: {type: String, required: false},
    viewed: {type: Boolean, required: false, default: false},
});

const Notifications = mongoose.model('notifications', notificationsModel);

module.exports = Notifications;
