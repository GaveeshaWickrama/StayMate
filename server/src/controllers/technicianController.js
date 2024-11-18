const Technician = require("../models/technicianModel");
const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");
const TechnicianReview = require("../models/technicianReviewModel");
const mongoose = require("mongoose");

// Function to get technician data with user details
const getTechnicianWithUserDetails = async (matchCondition = {}) => {
  return await Technician.aggregate([
    {
      $match: matchCondition,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
  ]);
};

const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await getTechnicianWithUserDetails();

    if (!technicians.length) {
      return res.status(404).json({ message: "No technicians found" });
    }
    res.status(200).json(technicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getReviews = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(
    "Technician review collection name:",
    TechnicianReview.collection.name
  );
  try {
    console.log(res.data);
    const reviews = await TechnicianReview.find({ technicianId: id });
    if (!reviews.length) {
      console.log("No reviews found");
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function getTechnicianByIdC(req, res) {
  let id = req.params.id;

  id = mongoose.Types.ObjectId.createFromHexString(id);

  try {
    const technicianDetails = await Technician.findById(id)
      .populate("userId")

      // const filteredComplaints = complaints.filter(complaint => {
      //   return complaint.reservationId && complaint.reservationId.property && complaint.reservationId.property.host_id.toString() === hostId.toString();
      // })

      .exec();
    if (!technicianDetails) {
      return res.status(404).json({ message: "technician not found" });
    }
    res.status(200).json(technicianDetails);
  } catch (error) {
    console.error("Error fetching technician details:", error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while fetching technicians", error }); // Send error response
  }
}


const rateTechnician = async (req,res) => {
  const {rating,review, userId, complaintID, technicianId} = req.body;
  
  try{

if(!technicianId || !rating || !userId){
  return res.status(400).json({error:'required values missing'});
}



  const technician = await Technician.findById(technicianId);

  const complaint = await Complaint.findById({
    _id:complaintID,
    status:"jobCompleted",
  });

  if(!technician || !complaint){
    return res.status(404).json({error:'technician or complaint not found'});
  }

 //add the new review
 technician.reviews.push({
  reviewerId:userId,
  rating,
  review
 });

 //optionally update the overall rating

 const totalRatings = technician.reviews.length;
 const totalScore = technician.reviews.reduce((sum,review)=> sum + review.rating, 0);
 technician.rating = totalScore /totalRatings;
 await technician.save();

 res.status(200).json({message:"thank you for your feedback",
  complaint:ratedComplaint
});

}
catch(error){
    console.error("error publishing rating:",error);
    res.status(500).json({message:"error publishing rating",error});
  }
  
}


console.log("Technician collection name:", Technician.collection.name);

module.exports = {
  getReviews,
  
  getTechnicianByIdC,
  getAllTechnicians,

  getTechnicianWithUserDetails,
};
