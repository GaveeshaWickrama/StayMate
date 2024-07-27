const Complaint = require("../models/complaintModel");
// const TaskController = require('./taskController'); // Import task controller


const raiseComplaint = async (req, res) => {
  const { reservationId, title, description, category } = req.body;

  // Log the files to the console to check if they are being received correctly
  console.log('Uploaded Files:', req.files);

  // Check if files are received and if not, respond with an error
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  // Get the file paths
  const images = req.files.map(file => file.path);

  // Complaint placed by the user to the host
  try {
    // Create a new complaint document
    const newComplaint = new Complaint({
      reservationId,
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




//complaint placed by the host to the technician

async function assignComplaintToTechnician(req, res) {
  const { complaintId, technicianId } = req.query;


  try {
    // Check if the complaint exists
   
    console.log("Received complaint ID:", complaintId);
    console.log("Received technician ID:", technicianId);

    // Check if the complaint exists and its status is pendingHostDecision
    const complaint = await Complaint.findOne({ _id: complaintId, status: 'pendingHostDecision' });
   
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or status is not pendingHostDecision' });
    }

    // Update the complaint to assign it to the technician and change status
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintId, status: 'pendingHostDecision' },
      { $set: { status: 'pendingTechnicianApproval', technician: technicianId } },
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
    const complaintDetails = await Complaint.findById(id);
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




async function getAllComplaintsByHostId(req,res){

  const  HostId = req.params.id;


  try {
    const complaints = await Complaint.find({hostId:HostId});
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


const getActiveJobs = async(req,res) => {
  const id = req.params.id;
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

const getPendingJobs = async(req,res) => {
  const id = req.params.id;
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
  raiseComplaint,
  getComplaintById, //host
  assignComplaintToTechnician, //host
  getNoOfJobsCompleted, //technician
  getAllComplaintsByHostId, //host
  getAllJobsByTechnicianId, //technician
  getActiveJobs, //technician
  getPendingJobs, //technician
  getCompletedJobs, //technician
  hello
};













