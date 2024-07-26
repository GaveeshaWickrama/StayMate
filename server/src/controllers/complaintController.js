const Complaint = require("../models/complaintModel");
// const TaskController = require('./taskController'); // Import task controller
const path = require("path");
const mongoose = require('mongoose');


const raiseComplaint = async (req,res) => {

    const { title, description, category } = req.body;
    const images = req.files.map(file => file.path); // Get the file paths

    //complaint placed by the user to the host
    try {
        // Create a new complaint document
        const newComplaint = new Complaint({
            //Need to wait untill Nimsara creates the current booking page to get the reservation id
            //reservation: req.user._id,
            title,
            description,
            category,
            images
        });

        // Save the complaint document to the database
        await newComplaint.save();

        res.status(200).json({ message: 'Complaint submitted successfully', complaint: newComplaint });
    } catch (error) {
        console.error('Error creating complaint:', error);
        res.status(500).json({ message: 'An error occurred while submitting your complaint', error });
    }
}


async function assignComplaintToTechnician(req, res) {
  const { technicianId } = req.params;  // Route parameter
  const { complaintId, hostID } = req.query;  // Query parameters

  try {
    console.log("Received complaint ID:", complaintId);
    console.log("Received technician ID:", technicianId);
    console.log("Received host ID:", hostID);

    // Convert complaintId to ObjectId
    const complaintObjectId = mongoose.Types.ObjectId(complaintId);

    // Check if the complaint exists and its status is pendingHostDecision
    const complaint = await Complaint.findOne({ _id: complaintObjectId, status: 'pendingHostDecision' });
   
    console.log("Found complaint:", complaint); // Log the complaint object
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or status is not pendingHostDecision' });
    }

    // Update the complaint to assign it to the technician and change status
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintObjectId, status: 'pendingHostDecision' },
      { $set: { status: 'pendingTechnicianApproval', technician: technicianId, host: hostID } },
      { new: true } // Return the updated document
    );

    console.log("Assigned to a technician successfully");
    res.status(200).json({ message: 'Complaint assigned to technician successfully', complaint: updatedComplaint });

  } catch (error) {
    console.error('Error assigning complaint to technician:', error);
    res.status(500).json({ message: 'An error occurred while assigning the complaint to technician', error });
  }
}


function hello(req,res){
  console.log("hello");
  res.status(200).json({ message: 'success' }); // Send error response

}
async function getComplaintById(req,res){
  const  id = req.params.id;

  try {
    const complaintDetails = await Complaint.findById(id)
    .populate([
      { path: 'technician', select: 'firstName lastName proPic' }, // Specify fields to include if needed
      { path: 'reservation', select: 'totalPrice' }, // Example for another field
      { path: 'user', select: 'firstName' } // Example for another field
    ])
    .exec();
    if(!complaintDetails) {
      return res.status(404).json({ message: 'Complaint not found' });
  }
    res.status(200).json(complaintDetails);

  }

  catch(error){
    console.error('Error fetching complaint details:', error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching complaints', error }); // Send error response

  }

}

async function reviewTask(req,res){
  const complaintId = req.params.id;


  try {
    // Check if the complaint exists
   
    console.log("Received complaint ID:", complaintId);

    // Check if the complaint exists and its status is pendingHostDecision
    const complaint = await Complaint.findOne({ _id: complaintId, status: 'technicianCompleted' });
   
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or status is not technicianCompleted' });
    }

    // Update the complaint to assign it to the technician and change status
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintId, status: 'technicianCompleted' },
      { $set: { status: 'jobCompleted' } },
      { new: true } // Return the updated document
    );

    console.log("reviewed successfully");
    res.status(200).json({ message: 'Complaint reviewed successfully', complaint: updatedComplaint });

  } catch (error) {
    console.error('Error reviewing task proof:', error);
    res.status(500).json({ message: 'error reviewing', error });
  }
}

async function uploadProof(req,res){
  const complaintId = req.params.id;


  try {
    // Check if the complaint exists
   
    console.log("Received complaint ID:", complaintId);

    // Check if the complaint exists and its status is pendingHostDecision
    const complaint = await Complaint.findOne({ _id: complaintId });
   
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or status is not technicianCompleted' });
    }


    const proofImages = req.files.map(file=>file.path);

    // Update the complaint to assign it to the technician and change status
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintId, status: 'active' },
      { $set: { status: 'technicianCompleted' }, $push:{proofImages:{$each:proofImages}} },
      { new: true } // Return the updated document
    );

    console.log("proof uploaded successfully");
    res.status(200).json({ message: 'proof uploaded successfully', complaint: updatedComplaint });

  } catch (error) {
    console.error('Error reviewing task proof:', error);
    res.status(500).json({ message: 'error reviewing', error });
  }
}


async function getAllComplaintsByHostId(req,res){

  const  HostId = req.params.id;


  try {
    const complaints = await Complaint.find({hostId:HostId}).populate('technician');
    res.status(200).json(complaints);

  }

  catch(error){
    console.error('Error fetching complaints:', error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching complaints', error }); // Send error response

  }

}
//following function is in the technician routes
const getNoOfJobsCompleted = async(req,res) => {
  const {id} = req.params;
  console.log(id); //log technician id
 try{
  const noOfJobs = await Complaint.countDocuments({technician:id,status:'jobCompleted'});
  res.status(200).json(noOfJobs);

 
 }
 catch(error){
    console.error(error);
    res.status(500).json({message:"server error"});
 }
}


const getAllJobsByTechnicianId = async(req, res) => {
  const  id = req.params.id;

  try {
    const jobs = await Complaint.find({technician:id, status: { $in: ['pendingTechnicianApproval', 'active', 'technicianCompleted', 'jobCompleted'] }});
    if(!jobs.length) {
      return res.status(404).json({ message: 'no jobs found' });
  }
    res.status(200).json(jobs);

  }

  catch(error){
    console.error(error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching jobs', error }); // Send error response

  }
}


const getActiveJobsByTechnicianId = async(req,res) => {
  // const id = req.user.userId;
  // console.log('Decoded user:', req.user); // Log decoded user
  // console.log('User role:', req.user.role); // Log user role

  const id = req.params.id;

  console.log(id);

  try{
    const jobs = await Complaint.find({technician:id, status: 'active'});
    if(!jobs.length) {
      return res.status(404).json({ message: 'no active jobs found' });
  }
    res.status(200).json(jobs);

  }catch(error){
    console.error(error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching jobs', error }); // Send error response
  }
}

const getPendingJobsByTechnicianId = async(req,res) => {
  const id = req.params.id;
  console.log(id)
  try{
    const jobs = await Complaint.find({technician:id, status: 'pendingTechnicianApproval'});
    if(!jobs.length) {
      return res.status(404).json({ message: 'no pending jobs' });
  }
    res.status(200).json(jobs);

  }catch(error){
    console.error(error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching jobs', error }); // Send error response
  }
}

const getPendingComplaintsByHostId = async(req,res) => {
  const id = req.params.id;
  try{
    const jobs = await Complaint.find({hostId:id, status: { $in: ['pendingHostDecision', 'pendingTechnicianApproval'] }});
    if(!jobs.length) {
      return res.status(404).json({ message: 'no pending jobs' });
  }
    res.status(200).json(jobs);

  }catch(error){
    console.error(error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching jobs', error }); // Send error response
  }
}
const getActiveComplaintsByHostId = async(req,res) => {
  const id = req.params.id;
  try{
    const jobs = await Complaint.find({hostId:id, status: 'active'});
    if(!jobs.length) {
      return res.status(404).json({ message: 'no pending jobs' });
  }
    res.status(200).json(jobs);

  }catch(error){
    console.error(error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching jobs', error }); // Send error response
  }
}

const getCompletedJobs = async(req,res) => {
  const id = req.params.id;
  try{
    const jobs = await Complaint.find({technician:id, status: 'jobCompleted'});
    if(!jobs.length) {
      return res.status(404).json({ message: 'no completed jobs' });
  }
    res.status(200).json(jobs);

  }catch(error){
    console.error(error); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching completed jobs', error }); // Send error response
  }
}

//following is for host
const markAsResolved = async(req,res) => {
  const id = req.params.id; //host id
  try{
    await Complaint.updateMany(
      { host: id, status: { $ne: 'pendingHostDecision' } }, // Ensure only non-resolved complaints are updated
      { $set: { status: 'hostCompleted' } }
    );
    
    res.status(200).json({message: "complaint marked as resolved"});

  }catch(error){
    console.error(error); // Log the error
    res.status(500).json({ message: 'couldnt save changes', error }); // Send error response
  }
}

module.exports = {
  getComplaintById, //host
  assignComplaintToTechnician, //host
  getNoOfJobsCompleted, //technician
  getAllComplaintsByHostId, //host
  getAllJobsByTechnicianId, //technician
  getActiveJobsByTechnicianId, //technician
  getPendingJobsByTechnicianId, //technician
  getPendingComplaintsByHostId, //host
  getActiveComplaintsByHostId, //host
  getCompletedJobs, //technician
  hello,
  reviewTask,
  uploadProof

};













