const cron = require('node-cron');
const mongoose = require('mongoose');
const Complaint = require('./models/complaintModel');

//shedule a job to run daily at mindnight
cron.schedule('* * * * *', async () => {
    try {
      // Calculate the date and time 3 days ago from now
      const threeDaysAgo = new Date(Date.now() - 3 * 60 * 1000);
  
      // Find complaints that are still in pendingTechnicianApproval and where the assignedDate is older than 3 days
      const complaintsToUpdate = await Complaint.updateMany(
        {
          status: "pendingTechnicianApproval",
          $expr: {
            $and: [
              { $lte: [{ $toDate: "$assignedDate" }, threeDaysAgo] },
              { $exists: ["$estimatedBudget", false] },
              { $ne: ["$assignTaskComments", null] },
              { $ne: ["$technician", null] }
            ]
          }
        },
        {
          $set: {
            status: 'pendingHostDecision',
            technician: null,
          },
        }
      );
  
      console.log(`Reverted ${complaintsToUpdate.nModified} complaints to pendingHostDecision`);
  
    } catch (error) {
      console.error("Error in scheduled task:", error);
    }
  });