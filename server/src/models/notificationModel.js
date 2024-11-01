const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["unseen", "seen"],
        default: "unseen",
        required: true,
    },
    type: {
        type: String,
        enum: ["prop_rej", "prop_accep"],
        required: true,
        
    },
    number: {
        type: Number,
        required: true,

    },
    createdOn: {
        type: Date,
        default: Date.now,
      },
});

const Notification = mongoose.model('Wallet',notificationSchema);
module.exports =  Notification;