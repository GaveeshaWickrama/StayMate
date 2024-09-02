const mongoose = require('mongoose');

const bellNotificationSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        reuired : true
    },

    notificationMessage : {
        type : String,
        required : true
    },

    notificationType : {

    },

    readStatus : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('bellNotification',bellNotificationSchema);