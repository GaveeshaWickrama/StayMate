const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all users
const getModerators = async (req,res)=>{

    try{
        const user = await User.find({ role: 'moderator' }).sort({createdAt: -1})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

//create a new moderator
const createModerator= async (req,res)=>{
    const {firstname, lastname, email, password, nic, gender, address, role}= req.body

    //add to db
    try{
        const moderator = await User.create({firstname, lastname, email, password, nic, gender, address, role})
        res.status(200).json(moderator)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a Moderator
const deleteModerator = async (req, res) => {
    const { id } = req.params;
    console.log( id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Moderator ID' });
    }

    
        const moderator = await User.findOneAndDelete({ _id: id });
        if (!moderator) {
            return res.status(404).json({ error: 'No such Moderator' });
        }
        res.status(200).json(moderator);
   
        
};
















async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createUser(req, res) {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function getUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
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

async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function viewProfile(req, res) {

    const userId = req.user.userId;
    console.log(userId);

    try {

        const user = await User.findById(userId);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }
        if (!user) return res.status(404).json({ message: 'Not found' });

        console.log(user);
        res.json(user);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    
}

async function updateProfile(req, res) {

    const userId = req.user.userId;
    console.log(userId);

    try {

        const user = await User.updateOne(userId);
        if (!user) return res.status(404).json({ message: 'Not found' });

        console.log(user);
        res.json(user);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    viewProfile,
    updateProfile,
    getModerators,
    createModerator,
    deleteModerator,
};