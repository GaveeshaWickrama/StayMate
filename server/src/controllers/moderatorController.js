const PropertyVerified = require('../models/propertyverifiedModel');
const Property = require('../models/propertyModel');
const mongoose = require('mongoose');
const Notification = require('../models/bellNotificationModel')
const { getRecieverSocketId, io } = require('../socket/socket');

// Get all pending properties which are to be listed
const viewPendingProperties = async (req, res) => {
    // const mod_id = req.user.userId;

    try{

        const id = req.user.userId;
        const properties = await Property.find({ status: 'pending' , moderator_id: id  })


        //send notifications
        
        // Get the current date
        const currentDate = new Date();

        // Iterate over each property and send notifications
        for (const property of properties) {
            const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
            const threeDaysAgo = new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
            const oneDaysAgo = new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 day ago

            let notificationMessage;

            if (property.created_at >= oneWeekAgo && property.created_at < threeDaysAgo) {
                notificationMessage = `Reminder for Validating Property with ID ${property._id}, which was listed one week ago.`;
            } else if (property.created_at >= threeDaysAgo && property.created_at < oneDaysAgo) {
                notificationMessage = `Warning for Validating Property with ID ${property._id}, only 3 more days remaining.`;
            } else {
                notificationMessage = `Warning for Validating Property with ID ${property._id}, only 1 day remaining.`;
            }
            const recieverSocketId = getRecieverSocketId(id);

            const newNotification = new Notification({
                userId: id, // Assuming the current user is the moderator
                notificationMessage,
                notificationType: "validation_reminder",
                complaintId: property._id,
            });

            await newNotification.save();

            if(recieverSocketId) {
                io.to(recieverSocketId).emit('newNotification',newNotification);
            }
        }

        res.status(200).json(properties);
    } catch (error) {
        console.error('Error in viewPendingProperties:', error);
        res.status(400).json({ error: error.message });
    }
};
// Accepting pending property
const accept = async (req, res) => {
    const mod_id = req.user.userId;
    const { id } = req.params;  // this is the property ID

    if (!mongoose.Types.ObjectId.isValid(mod_id) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {

        const property = await Property.findByIdAndUpdate(
            id,
            {
                status: "verified"
            },
            { new: true }
        );

        if (!property) {
            return res.status(400).json({ error: 'No such property in Property model' });
        }

        const recieverSocketId = getRecieverSocketId(property.host_id);
        
        const newNotification = new Notification({
            userId: property.host_id, // Assuming the current user is the moderator
            notificationMessage: `Your property with ID ${property._id} has been verified successfully.`,
            notificationType: "validation_accept",
            complaintId: property._id,
        });

        await newNotification.save();

        if(recieverSocketId) {
            io.to(recieverSocketId).emit('newNotification',newNotification);
        }

        res.status(200).json({ message: "Property verified successfully", property });

    } catch (error) {
        console.error('Error updating property status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Rejecting pending property
// const reject = async (req, res) => {
//     const { rejectionReasons, selectedAmenities, propertyOwnershipReason, otherReasonText, ...updateData } = req.body;
//     const mod_id = req.user.userId;
//     const { id } = req.params; // This is the property ID

//     if (!mongoose.Types.ObjectId.isValid(mod_id) || !mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ error: 'Invalid ID' });
//     }

//     try {
//         // Construct the rejection reason string
//         let rejectedReason = "";

//         if (rejectionReasons.includes("Ownership couldn't be validated") && propertyOwnershipReason) {
//             rejectedReason += `Ownership couldn't be validated: (${propertyOwnershipReason})\n`;
//         }

//         if (rejectionReasons.includes("Proof of Amenities Missing") && selectedAmenities.length > 0) {
//             rejectedReason += `Proof of Amenities Missing: (${selectedAmenities.join(", ")})\n`;
//         }

//         if (rejectionReasons.includes("Other") && otherReasonText) {
//             rejectedReason += `Other: (${otherReasonText})\n`;
//         }

//         // Trim any trailing newline
//         rejectedReason = rejectedReason.trim();

//         // Update the PropertyVerified model
//         const propertyVerified = await PropertyVerified.findOneAndUpdate(
//             { propertyID: id }, // Search by propertyId
//             { 
//                 moderator: mod_id,
//                 status: "rejected",
//                 rejectionReasons,
//                 selectedAmenities,
//                 propertyOwnershipReason,
//                 otherReasonText,
//                 $set: updateData, // Include any additional data
//             },
//             { 
//                 new: true, 
//                 runValidators: true 
//             }
//         );

//         if (!propertyVerified) {
//             return res.status(400).json({ error: 'No such property' });
//         }

//         // Update the Property model to include rejected_reason
//         const property = await Property.findByIdAndUpdate(
//             id,
//             {
//                 status: "rejected",
//                 rejected_reason: rejectedReason || "No specific reason provided", // Default fallback
//             },
//             { new: true }
//         );

//         if (!property) {
//             return res.status(400).json({ error: 'No such property in Property model' });
//         }

//         res.status(200).json({ message: "Property rejected successfully", propertyVerified, property });
//     } catch (error) {
//         console.error('Error updating property status:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
const reject = async (req, res) => {
    const { reason } = req.body; // Single rejection reason from the text box
    const mod_id = req.user.userId;
    const { id } = req.params; // Property ID

    if (!mongoose.Types.ObjectId.isValid(mod_id) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        // Update the Property model to include the rejection reason
        const property = await Property.findByIdAndUpdate(
            id,
            {
                status: "rejected",
                rejected_reason: reason || "No specific reason provided", // Store the reason in the field
            },
            { new: true }
        );

        if (!property) {
            return res.status(400).json({ error: 'No such property in Property model' });
        }
        
        const recieverSocketId = getRecieverSocketId(property.host_id);
        
        const newNotification = new Notification({
            userId: property.host_id, // Assuming the current user is the moderator
            notificationMessage: `Your property with ID ${property._id} has been rejected.`,
            notificationType: "validation_reject",
            complaintId: property._id,
        });

        await newNotification.save();

        if(recieverSocketId) {
            io.to(recieverSocketId).emit('newNotification',newNotification);
        }

        res.status(200).json({ message: "Property rejected successfully", property });
    } catch (error) {
        console.error('Error updating property status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    viewPendingProperties,
    accept,
    reject,
};
