const Property = require('../models/propertyverifiedModel')


//get all all pending properties which are to be listed
const viewPendingProperties = async (req,res)=>{

    try{
        const property = await Property.find({ status: 'pending' }).sort({createdAt: -1})
        res.status(200).json(property)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}


module.exports = {
    viewPendingProperties,
};