const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const { getRecieverSocketId, io } = require('../socket/socket');

const getUnreadMessageCount = async (userId) => {
    try {
        const count = await Message.countDocuments({ receiverId: userId, unread: true });
        return count;
    } catch (error) {
        console.error('Error getting unread message count:', error);
        return 0;
    }
};

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

        await Promise.all([newMessage.save(),conversation.save()]);

        //Socket IO functionality 
        const recieverSocketId = getRecieverSocketId(receiverId);
        if(recieverSocketId) {
            io.to(recieverSocketId).emit('newMessage',newMessage);
            const unreadMessageCount = await getUnreadMessageCount(receiverId);
            io.to(recieverSocketId).emit('newMessageCount', unreadMessageCount);
        }

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

         // Return an empty array if no conversation is found
        if(!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log("Error in getMessage function: ",error.message);
        res.status(500).json({error : "Internal Server Error."});
    }
}

const getContacts = async (req, res) => {
    try {
      const loggedInUser = req.user.userId;
  
      // Find conversations where the participants array contains the current user's ID
      const conversations = await Conversation.find({ participants: { $in: [loggedInUser] } })
        .populate('participants') .sort({ updatedAt: -1 });  // Adjust fields as necessary
  
      // Extract user objects from the populated conversations
      const users = conversations.flatMap(conversation => 
        conversation.participants.filter(participant => participant._id.toString() !== loggedInUser)
      );

      console.log(users);
  
      // Remove duplicates based on user IDs
      const uniqueUsers = Array.from(new Map(users.map(user => [user._id.toString(), user])).values());

      console.log("Users : " ,uniqueUsers);
  
      res.status(200).json(uniqueUsers);
    } catch (err) {
      console.error("Error Fetching Conversations: ", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const createOrSelectConversation = async (req, res) => {
    console.log("inside createOrSelectConversation");
    try {
        const { id: otherUserId } = req.params;
        const currentUserId = req.user.userId;

        // Fetch the other user's details excluding sensitive information
        const otherUser = await User.findById(otherUserId).select('-password');

        if (!otherUser) {
            return res.status(404).json({ error: "User not found" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [currentUserId, otherUserId] }
        });

        if (conversation) {
            return res.status(200).json({ conversation, otherUser });
        } else {
            return res.status(200).json({ conversation: null, otherUser });
        }

    } catch (error) {
        console.log("Error in createOrSelectConversation Function: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { sendMessage,getMessages, getContacts,createOrSelectConversation };
