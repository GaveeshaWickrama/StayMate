const User = require('../models/userModel');

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

const getAdminDashboard = async (req, res) => {
    try {
      // Fetch data or perform necessary operations
      const data = {
        paidBookings: 1074,
        siteVisits: 3944,
        searchers: 14743,
        totalSales: 6766,
        chartData: [
          { name: 'January', income: 4000, expenses: 2400, amt: 2400 },
          { name: 'February', income: 3000, expenses: 1398, amt: 2210 },
          { name: 'March', income: 2000, expenses: 9800, amt: 2290 },
          { name: 'April', income: 2780, expenses: 3908, amt: 2000 },
          { name: 'May', income: 1890, expenses: 4800, amt: 2181 },
          { name: 'June', income: 2390, expenses: 3800, amt: 2500 },
          { name: 'July', income: 3490, expenses: 4300, amt: 2100 },
        ],
      };
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getAdminDashboard,
  };

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
};