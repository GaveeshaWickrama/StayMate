const Complaint = require("../models/complaintModel");

const raiseComplaint = async (req,res) => {

    const { title, description, category } = req.body;
    const images = req.files.map(file => file.path); // Get the file paths

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

module.exports = {raiseComplaint} ;