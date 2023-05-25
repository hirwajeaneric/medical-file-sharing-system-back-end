const mongoose = require('mongoose');

const notificationsModel = new mongoose.Schema({
    time: {type: Date, required: true, default: Date.now()},
    severity: {type: String, required: true},
    message: {type: String, required: true},
    viewed: {type: Boolean, required: true, default: false},
});

const Notifications = mongoose.model('notifications', notificationsModel);

module.exports = Notifications;
