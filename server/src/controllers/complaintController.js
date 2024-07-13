const Complaint = require("../models/complaintModel");
// const TaskController = require('./taskController'); // Import task controller


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


  



//complaint placed by the host to the technician

async function assignComplaintToTechnician(req, res) {
  // const { complaintId} = req.body;
  const complaintId = '66816171f5cc3175ad262a37';
  const technicianId = req.params.id;


  try {
    // Check if the complaint exists
    console.log("receive complaint id",complaintId);
    console.log("received technician id", technicianId);
    console.log("Received request body:", req.body);
    console.log("Received request params:", req.params);

    console.log("hello");
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

  
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintId },

      { $set: { status: 'active', technician: technicianId } },
      { new: true } // Return the updated document
    );




    console.log("assigned to a technician successfully");
    res.status(200).json({ message: 'Complaint assigned to technician successfully', complaint:updatedComplaint });
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

module.exports = {
  getComplaintById,
  assignComplaintToTechnician,
  getAllComplaintsByHostId,
  hello
};













