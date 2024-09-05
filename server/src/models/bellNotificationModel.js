const mongoose = require('mongoose');

const bellNotificationSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },

    notificationMessage : {
        type : String,
        required : true
    },

    notificationType : {
        type : String,
        required : true
    },

    complaintId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "complaint"
    },

    readStatus : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('bellNotification',bellNotificationSchema);