const PropertyVerified = require('../models/propertyverifiedModel');
const Property = require('../models/propertyModel');
const mongoose = require('mongoose');

// Get all pending properties which are to be listed
const viewPendingProperties = async (req, res) => {
    try {
      const properties = await PropertyVerified.find({ status: 'pending' })
        .populate({
          path: 'propertyID',
          populate: {
            path: 'host_id',
            model: 'User'
          }
        })
        .sort({ created_at: -1 });
  
      console.log(`Fetched ${properties.length} pending properties`);
  
      // Combine Property and PropertyVerified data
      const combinedProperties = properties.map(propertyVerified => {
        const property = propertyVerified.propertyID.toObject();
        return {
          ...property,
          deed: propertyVerified.deed,
          additionalDetails: propertyVerified.additionalDetails,
          verifiedStatus: propertyVerified.status,
          propertyVerifiedCreatedAt: propertyVerified.created_at,
          propertyVerifiedUpdatedAt: propertyVerified.updated_at
        };
      });
  
      res.status(200).json(combinedProperties);
    } catch (error) {
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
        const propertyVerified = await PropertyVerified.findOneAndUpdate(
            { propertyID: id }, // Search by propertyId
            { 
                moderator: mod_id,
                status: "verified",
            },
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!propertyVerified) {
            return res.status(400).json({ error: 'No such property' });
        }

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

        res.status(200).json({ propertyVerified, property });
    } catch (error) {
        console.error('Error updating property status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Rejecting pending property
const reject = async (req, res) => {
    const updateData = { ...req.body };
    console.log("Inside controller rejecting property");
    console.log(updateData);
    const mod_id = req.user.userId;
    const { id } = req.params;  // this is the property ID

    if (!mongoose.Types.ObjectId.isValid(mod_id) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const propertyVerified = await PropertyVerified.findOneAndUpdate(
            { propertyID: id }, // Search by propertyId
            { 
                moderator: mod_id,
                status: "rejected",
                $set: updateData,
            },
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!propertyVerified) {
            return res.status(400).json({ error: 'No such property' });
        }

        const property = await Property.findByIdAndUpdate(
            id,
            {
                status: "rejected"
            },
            { new: true }
        );

        if (!property) {
            return res.status(400).json({ error: 'No such property in Property model' });
        }

        res.status(200).json({ propertyVerified, property });
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
