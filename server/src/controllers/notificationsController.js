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

const updateReadStatus = async (req, res) => {
    const { notificationId } = req.body;

    console.log("Inside UpdateReadstate in notification controller",notificationId);
  
    try {
      // Find the notification by ID and update the read status
      const notification = await Notification.findById(notificationId);
  
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      // Update the read status to true
      notification.readStatus = true;
      
      // Save the updated notification
      await notification.save();
  
      res.status(200).json({ message: 'Notification read status updated successfully' });
    } catch (error) {
      console.error('Error updating notification read status:', error);
      res.status(500).json({ message: 'Failed to update notification read status', error });
    }
  };

module.exports = { getNotifications,updateReadStatus }