const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all users
const getUsers = async (req,res)=>{

    try{
        const user = await User.find()
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

//get a single user
const getUser = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }
    res.status(200).json(user);
}



//this is same as the above function here only change is I'm getting the id by the token not from the URL
//used twice in ViewProfile and in Header to get the name & role
const viewProfile = async (req, res) => {

    console.log(req.user)
    const id  = req.user.userId;
    
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }
    res.status(200).json(user);
    
    
}

/// Edit profile
const editProfile = async (req, res) => {
    const id = req.user.userId;
    console.log("User ID:", id);
    console.log("Uploaded file:", req.file);  // Log the file object
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
  
    try {
      const updateData = { ...req.body };
      if (req.file && req.file.path) {
        updateData.picture = req.file.path.replace(/\\/g, '/'); 
      }
  
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(400).json({ error: 'No such user' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  







//delete user
const deleteUser = async (req,res)=>{

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }
    res.status(200).json(user);

}



async function getUserSachin(req, res) {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateUserbySachin(req, res) {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Not found' });

        Object.keys(req.body).forEach(key => {
            user[key] = req.body[key];
        });

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Export the functions
module.exports = {
    getUser,
    getUsers,
    editProfile,
    deleteUser,
    viewProfile,
};
