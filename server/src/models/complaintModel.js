// complaintModel.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reservation', // Reference to the Tenant model (if you have one)
    //required: true,
  },

  hostId:{
    type:String,
    required:true
  },

  technician:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'technician',
    required:false
  },

  category: {
    type: String,
    required: true,
  },
  propertyName:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images : [{ type : String }],
  status: {
    type: String,
    enum: ['pendingHostApproval', 'pendingTechnicianApproval','resolved'],
    default: 'pendingHostApproval',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('complaint', complaintSchema);
