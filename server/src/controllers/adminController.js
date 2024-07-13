const User = require('../models/userModel'); // Import the User model

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
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update user fields
        Object.assign(user, req.body);

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getAdminDashboard(req, res) {
    try {
        // Example data for admin dashboard
        const data = {
            paidBookings: 1074,
            siteVisits: 3944,
            searchers: 14743,
            totalSales: 6766
        };

        // Fetch monthly income data (example)
        try {
            const monthlyIncome = await AdminModel.getMonthlyIncome(); // Replace with actual logic to fetch monthly income
            data.monthlyIncome = monthlyIncome; // Assuming monthlyIncome is an array or object fetched
        } catch (err) {
            console.error('Error fetching monthly income:', err);
            // Handle error fetching monthly income
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAdminDashboard
};
