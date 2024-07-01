const Complaint = require("../models/complaintModel");
const TaskController = require('./taskController'); // Import task controller


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
  const { complaintId, technicianId } = req.body;

  try {
    // Check if the complaint exists
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Create a task based on the complaint
    const task = await TaskController.createTask({ body: { complaintId } }, res); // Call createTask function from taskController

    // Assign the task to the technician
    await TaskController.assignTaskToTechnician({ body: { taskId: task._id, technicianId } }, res);

    res.status(200).json({ message: 'Complaint assigned to technician successfully', complaint, task });
  } catch (error) {
    console.error('Error assigning complaint to technician:', error);
    res.status(500).json({ message: 'An error occurred while assigning the complaint to technician', error });
  }
}

module.exports = {
  assignComplaintToTechnician
};













module.exports = {raiseComplaint} ;