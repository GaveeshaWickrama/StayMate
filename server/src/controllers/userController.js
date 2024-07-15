// In userController.js
// In userController.js
async function getUser(req, res) {
    try {
        const userId = req.params.id; // Get the user ID from the request parameters
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Export the functions
module.exports = {
    getUser,
    getAllUsers,
    // updateUser, // Ensure updateUser is defined if you are exporting it too
};
