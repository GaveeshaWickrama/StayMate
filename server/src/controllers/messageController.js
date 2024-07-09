const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

const sendMessage = async (req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user.userId;
        console.log(message);

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId,receiverId] }
        })

        if(!conversation) {
            conversation =  await Conversation.create({
                participants : [senderId,receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

      /*   await newMessage.save();
        await conversation.save(); */

        await promise.all([newMessage.save(),conversation.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage Function: ",error.message);
        res.status(500).json({error : "Internal server error"});
    }
};

const getMessages = async (req,res) => {

    try {

        const {id:userToChatId} = req.params;
        const senderId = req.user.userId;

        const conversation = await Conversation.findOne({
            participants : {$all: [senderId,userToChatId]}
        }).populate("messages");

        res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log("Error in getMessage function: ",error.message);
        res.status(500).json({error : "Internal Server Error."});
    }
}

module.exports = { sendMessage,getMessages };