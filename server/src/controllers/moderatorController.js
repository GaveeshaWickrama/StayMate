const PendingProperty = require('../models/propertyverifiedModel');
const Property = require('../models/propertyModel'); 

// Get all pending properties which are to be listed
const viewPendingProperties = async (req, res) => {
    try {
        const properties = await PendingProperty.find({ status: 'pending' })
            .populate('propertyID')
            .sort({ createdAt: -1 });

        console.log("Inside the controller checking data");
        console.log(properties);

        res.status(200).json(properties);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    viewPendingProperties,
};
