const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all Moderators
const getModerators = async (req,res)=>{

    try{
        const user = await User.find({ role: 'moderator' }).sort({createdAt: -1})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

//create a new moderator
const createModerator = async (req, res) => {
    const { firstName, lastName, email, password, nicPassport, gender, address, role, phone } = req.body;

    let emptyFields = [];

    if (!firstName) {
        emptyFields.push('firstName');
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
        emptyFields.push('firstName: only letters are allowed without spaces');
    }

    if (!lastName) {
        emptyFields.push('lastName');
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
        emptyFields.push('lastName: only letters are allowed without spaces');
    }

    if (!email) {
        emptyFields.push('email');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields });
    }

    //add to db
    try {
        const moderator = await User.create({ firstName, lastName, email, password, nicPassport, gender, address, role, phone });
        res.status(200).json(moderator);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
// get all users
async function getAllUsers(req, res) {
    try {
      const aggregation = [
        {
          $match: {
            role: { $in: ["guest", "host"] },
          },
        },
        {
          $group: {
            _id: "$role",
            count: { $sum: 1 },
          },
        },
      ];
  
      const roleCounts = await User.aggregate(aggregation);
  
      // Format the data to a more readable format
      const formattedData = roleCounts.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {});
  
      // Debug: Log the counts of guests and property owners
      console.log("Guests:", formattedData.guest || 0);
      console.log("Property Owners:", formattedData.propertyOwner || 0);
  
      res.json(formattedData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
















// async function getAllUsers(req, res) {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

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