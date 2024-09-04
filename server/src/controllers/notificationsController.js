const Notification = require('../models/bellNotificationModel');

const getNotifications = async (req,res) => {

    const loggedInUser = req.user.userId;

    try {

        const notifications = await Notification.find({
            userId : loggedInUser,
            readStatus : false
        });

        console.log("Notifications Fetched : ",notifications);

        res.status(200).json(notifications);
        
    } catch (error) {
        console.log("Error fetching notificatios in notification controller",error.message)
        res.status(500).json({message: "Error fetching Notifications" })
    }

}

module.exports = {getNotifications}