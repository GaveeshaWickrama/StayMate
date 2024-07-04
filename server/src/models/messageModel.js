import mongoose from 'mongoose';

const messageSchema = new mongoose.schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    recieverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        type: String,
        required : true
    },
},{timestamps: true});

const Message = mongoose.model('Message',messageSchema);

export default Message;