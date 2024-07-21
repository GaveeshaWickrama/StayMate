// controllers/technicianController.js

const Technician = require("../models/technicianModel");
const Complaint = require("../models/complaintModel");
const ComplaintController = require("../controllers/complaintController");
const TechnicianReview = require("../models/technicianReviewModel")
const path = require("path");

const createTechnician = async (req, res) => {
  const { firstName, lastName, location, email, password } = req.body;

  try {
    const technician = new Technician({
      firstName,
      lastName,
      location,
      email,
      password,
    });

    // Save the technician to the database
    const newTechnician = await technician.save();

    res.status(201).json({
      message: "Your details have been saved successfully",
      technician: -+newTechnician,
    });
  } catch (error) {
    console.error("Error creating technician:", error);
    res.status(500).json({
      message: "An error occurred while creating the technician",
      error,
    });
  }
};

const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find();

    if (!technicians.length) {
      return res.status(404).json({ message: "no technicians found" });
    }
    res.status(200).json(technicians);

    console.log("Technician collection name:", technicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTechnicianById = async (req, res) => {
  const { id } = req.params;

  try {
    const technician = await Technician.findById(id);
    if (!technician) {
      return res.status(404).json({ message: "technician not found" });
    }
    res.status(200).json(technician);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};


const getReviews = async (req, res) => {
  const {id} = req.params;
  console.log(id);
  console.log("technician review collection name:", TechnicianReview.collection.name)
  try{
    console.log(res.data)
    // const review = await TechnicianReview.findById(id);
    const review = await TechnicianReview.find();
    if(!review.length){
      console.log("no reviews found")
    }
    res.status(200).json(review);
  }
  catch(error){
    console.error(error);
    res.status(500).json({message:"server error"});
  }
};


console.log("Technician collection name:", Technician.collection.name);

module.exports = {
  createTechnician,
  getReviews,
  getTechnicianById,

  getAllTechnicians,
};
