// controllers/technicianController.js

const Technician = require('../models/technicianModel');
const Complaint = require('../models/complaintModel');

async function createTechnician(req, res) {

  const { firstName, lastName, location, email, password } = req.body;

  try {
   
    
    const newTechnician = new Technician({
    


      firstName,
      lastName,
      location,
      email,
      password

    });

    // Save the technician to the database
    await newTechnician.save();

    res.status(200).json({ message: 'Your details have been saved successfully', technician: newTechnician });
  } 
  catch (error) {
    console.error('Error creating technician:', error);
    res.status(500).json({ message: 'An error occurred while creating the technician', error });
  }
}




async function getAllTechnicians(req, res) {
  try {
    const technicians = await Technician.find();
    res.status(200).json(technicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}



async function getTechnicianById(req, res) {
  const {id} = req.params;
  const technician = await Technician.findById(id);
    if (!technician) {
      return res.status(404).json({ message: 'technician not found' });
    }
}





module.exports = {

    getTechnicianById,
  
  getAllTechnicians,
 
};
