// complaintModel.js
const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');

const complaintSchema = new mongoose.Schema({
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation', // Reference to the reservation model
    required: true,
  },

/*   hostId:{
    type:String,
    required:true
  }, */

  estimatedBudget: {
    type: Number,
    required: false, // or true if it's mandatory
  },
  assignTaskComments:{
    type:String,
    required:false

  },
  resolveComments:{
    type:String,
    required:false
  },
  
  deadline:{
    type:Date,
    required:false

  },

  assignedDate: {
    type:Date,
    required:false
  },

  technician:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Technician',
    required:false
  },
  proofImages: [{ type: String }],


  category: {
    type: String,
    required: true,
  },
/*   propertyName:{
    type: String,
    //required: true,
  }, */
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
    enum: ['pendingHostDecision', 'pendingTechnicianApproval','active','technicianCompleted', 'jobCompleted', 'hostCompleted'],
    default: 'pendingHostDecision',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('complaint', complaintSchema);
