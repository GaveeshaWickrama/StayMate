// models/taskModel.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  complaint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint', // Reference to the Complaint model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  hostID:{
        type:String,

  },

  propertyName:{
    type:String,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [{ type: String }], // Assuming you want to copy images from complaint
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-progress', 'completed'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
