const mongoose =  require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        type: String,
        required : true
    },
    unread: { type: Boolean, default: true } // Add unread field
},{timestamps: true});

const Message = mongoose.model('Message',messageSchema);

module.exports =  Message;