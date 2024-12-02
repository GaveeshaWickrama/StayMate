// complaintModel.js
const mongoose = require('mongoose');

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

  progress : {
    type:Number,
    required:false
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

// Reusable function to update complaints
async function updatePendingTechnicianApproval() {
  await this.model.updateMany(
    {
      status: 'pendingTechnicianApproval',
      assignedDate: {
        $lte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    },
    {
      $set: {
        status: 'pendingHostDecision',
        technician: null,
      },
    }
  );
}
// Middleware to check and update status before find, findOne, and findById
complaintSchema.pre('find', async function (next) {
  await updatePendingTechnicianApproval.call(this);
  next();
});
complaintSchema.pre('findOne', async function (next) {
  await updatePendingTechnicianApproval.call(this);
  next();
});
complaintSchema.pre('findById', async function (next) {
  await updatePendingTechnicianApproval.call(this);
  next();
});

module.exports = mongoose.model('complaint', complaintSchema);
