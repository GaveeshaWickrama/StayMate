// complaintModel.js
const mongoose = require('mongoose');



const BudgetItemSchema = new mongoose.Schema({
  expense: { type: String, required: true },
  value: { type: Number, required: true },
  // type: { type: String, enum: ["expense", "profit", "other"], default: "expense" }, // Optional classification

});


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

  estimatedBudget: [BudgetItemSchema], 
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

  additionalComments:{
    type:String,
    required:false
  },
  taskCompletedDate:{
    type:Date,
    required:false
  },
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

 extended : {
  type:Boolean,
  required:false
 }
  

  
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
