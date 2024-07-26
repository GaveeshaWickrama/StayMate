const mongoose = require('mongoose');
const { Schema } = mongoose;

const technicianSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        const user = await mongoose.model('User').findOne({ _id: value, role: 'technician' });
        return !!user;
      },
      message: 'The provided user ID does not exist as a technician in the User collection'
    }
  },
  location: {
    type: String,
    required: true
  },
  subRole: {
    type: String,
    required: true,
    enum: ['plumber', 'electrician', 'carpenter', 'painter', 'other'] // Add more sub-roles as needed
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  collection: 'technicians' // Explicitly set the collection name
});

module.exports = mongoose.model('Technician', technicianSchema);
