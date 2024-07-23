const PendingProperty = require('../models/propertyverifiedModel');
const mongoose = require('mongoose')

// Get all pending properties which are to be listed
const viewPendingProperties = async (req, res) => {
    try {
        const properties = await PendingProperty.find({ status: 'pending' })
            .populate({
                path: 'propertyID',
                populate: {
                    path: 'host_id',
                    model: 'User'
                }
            })
            
            .sort({ createdAt: -1 });

        console.log("Inside the controller checking data");
        //console.log(properties);

        res.status(200).json(properties);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//accepting pending property
const accept = async (req, res) => {

    const mod_id = req.user.userId;
    const { id } = req.params  //this is the property id
  
    if ((!mongoose.Types.ObjectId.isValid(mod_id)) ||(!mongoose.Types.ObjectId.isValid(id))) {
         
      return res.status(400).json({ error: 'Invalid ID' });
    }
  
    try {
      const property = await PendingProperty.findOneAndUpdate(
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
  
      if (!property) {
        return res.status(400).json({ error: 'No such property' });
      }
  
      res.status(200).json(property);
    } catch (error) {
      console.error('Error updating property status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

//rejecting pending property
const reject = async (req, res) => {

    const updateData = { ...req.body };
    console.log("Inside controller4444444444444444")
    console.log(updateData);
    const mod_id = req.user.userId;
    const { id } = req.params  //this is the property id
  
    if ((!mongoose.Types.ObjectId.isValid(mod_id)) ||(!mongoose.Types.ObjectId.isValid(id))) {
         
      return res.status(400).json({ error: 'Invalid ID' });
    }
  
    try {
        
      const property = await PendingProperty.findOneAndUpdate(
        { propertyID: id }, // Search by propertyId
        { 
          moderator: mod_id,
          status: "rejected",
          $set: updateData ,

        },
        { 
          new: true, 
          runValidators: true 
        }
        );
  
      if (!property) {
        return res.status(400).json({ error: 'No such property' });
      }
  
      res.status(200).json(property);
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
