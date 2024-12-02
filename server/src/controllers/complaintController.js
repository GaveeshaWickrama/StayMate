const Complaint = require("../models/complaintModel");
const Reservation = require("../models/reservationModel");
const Notification = require('../models/bellNotificationModel');
const Technician = require('../models/technicianModel');
const User = require('../models/userModel');
const { getRecieverSocketId, io } = require('../socket/socket');

// const TaskController = require('./taskController'); // Import task controller
const path = require("path");
const mongoose = require("mongoose");






const raiseComplaint = async (req, res) => {
  const { reservationId, title, description, category } = req.body;

  // Log the files to the console to check if they are being received correctly
  //console.log("Uploaded Files:", req.files);

  const images = [];
  // Get the file paths
  if(req.files && req.files.length > 0) {
    const images = req.files.map((file) => file.path);
  }
  

  // Complaint placed by the user to the host
  try {
    // Create a new complaint document
    const newComplaint = new Complaint({
      reservationId,
      title,
      description,
      category,
      images,
    });

    // Save the complaint document to the database
    await newComplaint.save();

    const reservation = await getReservationDetails(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation details not found" });
    }


    const newMessage = `A complaint was raised by ${reservation.user.firstName} ${reservation.user.lastName} for ${reservation.property.title}`;
    console.log(newMessage);
    //Socket IO functionality 
    const recieverSocketId = getRecieverSocketId(reservation.property.host_id);

    const newNotification = new Notification({
      userId : reservation.property.host_id,
      notificationMessage : newMessage,
      notificationType : "complaint",
      complaintId : newComplaint._id,
    });

    await newNotification.save();

    if(recieverSocketId) {
        io.to(recieverSocketId).emit('newNotification',newNotification);
    }

    res
      .status(200)
      .json({
        message: "Complaint submitted successfully",
        complaint: newComplaint,
      });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while submitting your complaint",
        error,
      });
  }
};

//complaint placed by the host to the technician

async function assignComplaintToTechnician(req, res) {
  const { technicianId } = req.params; // Route parameter    //technician _id
  const { complaintId, hostID } = req.query; // Query parameters

  const { additionalInfo, deadline } = req.body;

  try {
    console.log("Received complaint ID:", complaintId);
    console.log("Received technician ID:", technicianId);
    console.log("Received host ID:", hostID);
    console.log("deadline:", deadline);

    // Convert complaintId to ObjectId

    const complaintObjectId =
      mongoose.Types.ObjectId.createFromHexString(complaintId);
    const technicianUserId =
      mongoose.Types.ObjectId.createFromHexString(technicianId);

    // Check if the complaint exists and its status is pendingHostDecision
    const complaint = await Complaint.findOne({
      _id: complaintObjectId,
      status: "pendingHostDecision",
    });

    console.log("Found complaint:", complaint); // Log the complaint object
    if (!complaint) {
      return res
        .status(404)
        .json({
          message: "Complaint not found or status is not pendingHostDecision",
        });
    }

    const assignedDate = Date.now(); // Current timestamp in milliseconds
    console.log(assignedDate);

    // Update the complaint to assign it to the technician and change status
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintObjectId, status: "pendingHostDecision" },
      {
        $set: {
          status: "pendingTechnicianApproval",
          technician: technicianUserId,
          assignTaskComments: additionalInfo,
          assignedDate:assignedDate,
          deadline:deadline
        },
      },
      { new: true } // Return the updated document
    );

    
    const host_Name = await getNameById(hostID);
    const newMessage = `A repair Request by ${host_Name}`;
    const techUserId = await getTechnicianUserId(technicianId);
    console.log(techUserId);
    //Socket IO functionality 
    const recieverSocketId = getRecieverSocketId(techUserId);

    const newNotification = new Notification({
      userId : techUserId,
      notificationMessage : newMessage,
      notificationType : "requestToTechnicians",
      complaintId : complaintId,
    });

    console.log("New Notification :- ",newNotification);

    await newNotification.save();

    if(recieverSocketId) {
        io.to(recieverSocketId).emit('newNotification',newNotification);
    }

    console.log("Assigned to a technician successfully");


    //set timeout function
    // setTimeout(async () => {
    //   try{
    //     await Complaint.findOneAndUpdate(
    //       {_id:complaintObjectId, status: "pendingTechnicianApproval"},
    //       {
    //         $set:{
    //           status:"pendingHostDecision",
    //           technician:null
    //         }
    //       },
    //         {
    //           new: true
    //         }
    //     );
    //     console.log(`Complaint ID ${complaintId} reverted to pendingHostDecision`);
    //   } catch (error) {
    //     console.error(`failed to revert complaint id ${complaintId}`, error);
    //   }

    // }, 3*24*60*60*1000 ); //3 days in milliseconds


    res
      .status(200)
      .json({
        message: "Complaint assigned to technician successfully",
        complaint: updatedComplaint,
      });




  } catch (error) {
    console.error("Error assigning complaint to technician:", error);
    res
      .status(500)
      .json({
        message:
          "An error occurred while assigning the complaint to technician",
        error,
      });
  }
}

async function acceptJob(req, res) {
  const { complaintId } = req.params; // Route parameter

  const { budget } = req.body;

  try {
    console.log("Received complaint ID:", complaintId);

    // Convert complaintId to ObjectId
    const complaintObjectId =
      mongoose.Types.ObjectId.createFromHexString(complaintId);

    // Check if the complaint exists and its status is pendingHostDecision
    const complaint = await Complaint.findOne({
      _id: complaintObjectId,
      status: "pendingTechnicianApproval",
    });

    console.log("Found complaint:", complaint); // Log the complaint object
    if (!complaint) {
      return res
        .status(404)
        .json({
          message:
            "Complaint not found or status is not pendingTechnicianApproval",
        });
    }

    // Update the complaint to assign it to the technician and change status
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintObjectId, status: "pendingTechnicianApproval" },
      {
        $set: {
          estimatedBudget: budget,
        },
      },
      { new: true } // Return the updated document
    );

    console.log("estimated budget sent to the host successfully");
    res
      .status(200)
      .json({
        message: "budget sent successfully",
        complaint: updatedComplaint,
      });
  } catch (error) {
    console.error("Error accepting job:", error);
    res
      .status(500)
      .json({ message: "An error occurred while accepting job", error });
  }
}




function hello(req, res) {
  console.log("hello");
  res.status(200).json({ message: "success" }); // Send error response
}


async function confirmJob(req,res) {
  const id = req.params.id; //complaintid
  

  
  const complaintObjectId =
  mongoose.Types.ObjectId.createFromHexString(id);

  if(!id){
    return res.status(400).json({message:"complaint id is required"});
  }
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      { _id: complaintObjectId , status : 'pendingTechnicianApproval' }, // Ensure only non-resolved complaints are updated
      { 
        $set: { 
          status: "active",
          progress: 0 // Add the progress field with an initial value
        }
      },
      {new:true}
    );

    res.status(200).json({ message: "successfully marked as active", updatedComplaint });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "couldnt save changes", error }); // Send error response
  }
}

async function getComplaintById(req, res) {
  let complaintID = req.params.complaintID;

  try {
    // Correct ID conversion
    complaintID = mongoose.Types.ObjectId.createFromHexString(complaintID);

    // Fetch complaint details with nested population
    const complaintDetails = await Complaint.findById(complaintID)
      .populate([
        { path: "technician", populate: { path: "userId" } },
        { path: "reservationId" }, // Example for another field
        { path: "reservationId", populate: { path: "user" } }, // Example for another field
        {
          path: "reservationId",
          populate: {
            path: "property",
            populate: [{ path: "host_id" }],
          },
        },
      ])
      .exec();

    if (!complaintDetails) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaintDetails);
  } catch (error) {
    console.error("Error fetching complaint details:", error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while fetching complaints", error }); // Send error response
  }
}

async function reviewTask(req, res) {
  const complaintId = req.params.id;

  try {
    // Check if the complaint exists

    console.log("Received complaint ID:", complaintId);

    // Check if the complaint exists and its status is pendingHostDecision
    const complaint = await Complaint.findOne({
      _id: complaintId,
      status: "technicianCompleted",
    });

    if (!complaint) {
      return res
        .status(404)
        .json({
          message: "Complaint not found or status is not technicianCompleted",
        });
    }

    // Update the complaint to assign it to the technician and change status
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintId, status: "technicianCompleted" },
      { $set: { status: "jobCompleted" } },
      { new: true } // Return the updated document
    );

    console.log("reviewed successfully");
    res
      .status(200)
      .json({
        message: "Complaint reviewed successfully",
        complaint: updatedComplaint,
      });
  } catch (error) {
    console.error("Error reviewing task proof:", error);
    res.status(500).json({ message: "error reviewing", error });
  }
}

async function uploadProof(req, res) {
  const complaintId = req.params.id;

  try {
    // Check if the complaint exists

    console.log("Received complaint ID:", complaintId);

    // Check if the complaint exists and its status is pendingHostDecision
    const complaint = await Complaint.findOne({ _id: complaintId });

    if (!complaint) {
      return res
        .status(404)
        .json({
          message: "Complaint not found or status is not technicianCompleted",
        });
    }

    const proofImages = req.files.map((file) => file.path);

    // Update the complaint to assign it to the technician and change status
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: complaintId, status: "active" },
      {
        $set: { status: "technicianCompleted" },
        $push: { proofImages: { $each: proofImages } },
      },
      { new: true } // Return the updated document
    );

    console.log("proof uploaded successfully");
    res
      .status(200)
      .json({
        message: "proof uploaded successfully",
        complaint: updatedComplaint,
      });
  } catch (error) {
    console.error("Error reviewing task proof:", error);
    res.status(500).json({ message: "error reviewing", error });
  }
}

// async function getAllComplaintsByHostId(req,res){

//   const  HostId = req.params.id;

//   try {
//     const complaints = await Complaint.find({hostId:HostId}).populate('technician');
//     res.status(200).json(complaints);

//   }

//   catch(error){
//     console.error('Error fetching complaints:', error); // Log the error
//     res.status(500).json({ message: 'An error occurred while fetching complaints', error }); // Send error response

//   }

// }

const getComplaintsByHost = async (req, res) => {
  const hostId = req.params.id;

  //complaint -> reservation id -> propertyid-> host_id
  try {
    const complaints = await Complaint.find()
      .populate({
        path: "reservationId",
        populate: [
          {
            path: "property",
          },
          {
            path: "user",
          },
        ],
      })
      .populate({
        path: "technician",
        populate: {
          path: "userId",
        },
      });

    // const filteredComplaints = complaints.filter(complaint => {
    //   return complaint.reservationId && complaint.reservationId.property && complaint.reservationId.property.host_id.toString() === hostId.toString();
    // })

    const filteredComplaints = complaints.filter((complaint) => {
      return (
        complaint.reservationId.property.host_id.toString() ===
        hostId.toString()
      );
    });

    res.status(200).json(filteredComplaints);
  } catch (error) {
    console.error("Error fetching complaints:", error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while fetching complaints", error }); // Send error response
  }
};

//following function is in the technician routes
const getNoOfJobsCompleted = async (req, res) => {
  const { id } = req.params;
  console.log(id); //log technician id
  try {
    const noOfJobs = await Complaint.countDocuments({
      technician: id,
      status: "jobCompleted",
    });
    res.status(200).json(noOfJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const getAllJobsByTechnicianId = async (req, res) => {
  let technicianID = req.params.technicianID;

  technicianID = mongoose.Types.ObjectId.createFromHexString(technicianID);

  try {
    const jobs = await Complaint.find({
      status: {
        $in: [
          "pendingTechnicianApproval",
          "active",
          "technicianCompleted",
          "jobCompleted",
        ],
      },
    })
      .populate({
        path: "technician",
        populate: {
          path: "userId", // This is the field inside the technician document
        },
      })
      .populate({
        path: "reservationId",
        populate: [
          { path: "property",
            populate: {
              path: 'host_id'
            }
           }

        ]
      })
    

    console.log(`received technician id ${technicianID}`);

    const filteredJobs = jobs.filter(
      (job) =>
        job.technician &&
        job.technician.userId._id.toString() === technicianID.toString()
    );

    if (!filteredJobs.length) {
      return res.status(404).json({ message: "no jobs found" });
    }
    res.status(200).json(filteredJobs);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "An error occurred while fetching jobs", error }); // Send error response
  }
};

const getActiveJobsByTechnicianId = async (req, res) => {
  const id = req.params.id;

  console.log(id);

  try {
    const jobs = await Complaint.find({ technician: id, status: "active" });
    if (!jobs.length) {
      return res.status(404).json({ message: "no active jobs found" });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while fetching jobs", error }); // Send error response
  }
};

const getPendingJobsByTechnicianId = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const jobs = await Complaint.find({
      technician: id,
      status: "pendingTechnicianApproval",
    });
    if (!jobs.length) {
      return res.status(404).json({ message: "no pending jobs" });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while fetching jobs", error }); // Send error response
  }
};

const getPendingComplaintsByHost = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    // Find complaints with the desired status
    let complaints = await Complaint.find({
      status: { $in: ["pendingHostDecision", "pendingTechnicianApproval"] },
    }).populate({
      path: "reservationId",
      populate: {
        path: "property",
        select: "host_id",
      },
    });

    // Filter complaints where the host ID matches the provided ID
    complaints = complaints.filter((complaint) => {
      return (
        complaint.reservationId.property.host_id.toString() === id.toString()
      );
    });

    console.log(complaints);
    if (!complaints.length) {
      return res.status(404).json({ message: "No pending complaints found" });
    }

    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error); // Log the error
    res
      .status(500)
      .json({
        message: "An error occurred while fetching pending complaints",
        error,
      }); // Send error response
  }
};

// const getActiveComplaintsByHostId = async (req, res) => {
//   const id = req.params.id; //host id
//   try {
//     let complaints = await Complaint.find({ status: "active" }).populate({
//       path: "reservationId",
//       populate: {
//         path: "property",
//         populate: {
//           path: "host_id",
//         },
//       },
//     });
//     complaints = complaints.filter(
//       (complaint) =>
//         complaint.reservationId.property.host_id.toString() === id.toString()
//     );

//     if (!complaints.length) {
//       return res.status(404).json({ message: "no pending complaints" });
//     }
//     res.status(200).json(complaints);
//   } catch (error) {
//     console.error(error); // Log the error
//     res
//       .status(500)
//       .json({ message: "An error occurred while fetching jobs", error: error }); // Send error response
//   }
// };

const getCompletedJobs = async (req, res) => {
  const id = req.params.id;
  try {
    const jobs = await Complaint.find({
      technician: id,
      status: "jobCompleted",
    });
    if (!jobs.length) {
      return res.status(404).json({ message: "no completed jobs" });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error); // Log the error
    res
      .status(500)
      .json({
        message: "An error occurred while fetching completed jobs",
        error,
      }); // Send error response
  }
};


//following is for host
const markAsResolved = async (req, res) => {
  const id = req.params.complaintId; //complaintid
  const {resolveComments}  = req.body

  
  const complaintObjectId =
  mongoose.Types.ObjectId.createFromHexString(id);

  if(!id){
    return res.status(400).json({message:"complaint id is required"});
  }
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      { _id: complaintObjectId }, // Ensure only non-resolved complaints are updated
      { $set: { status: "hostCompleted", resolveComments:resolveComments } },
      {new:true}
    );

    res.status(200).json({ message: "complaint marked as resolved", updatedComplaint });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "couldnt save changes", error }); // Send error response
  }
};

const getProgress = async (req,res) => {
  const id = req.params.complaintId;
  const complaintObjectId =
  mongoose.Types.ObjectId.createFromHexString(id);


  if(!id){
    return res.status(400).json({message:"complaint id is required"});
  }
  try {
    const complaint = await Complaint.find(
      { _id: complaintObjectId , status: 'active' }, // Ensure only non-resolved complaints are updated
    );

    res.status(200).json({ message: "progress received", complaint });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "couldnt retrieve progress", error }); // Send error response
  }
}

const setProgress = async (req,res) => {
  const id = req.params.complaintId;
  const { progress } = req.body;
  const complaintObjectId =
  mongoose.Types.ObjectId.createFromHexString(id);


  if(!id){
    return res.status(400).json({message:"complaint id is required"});
  }
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      { _id: complaintObjectId , status: 'active' },
      { $set: { progress } },
      { new: true } // Ensure only non-resolved complaints are updated
    );

    res.status(200).json({ message: "progress updated", updatedComplaint });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "couldnt update progress", error }); // Send error response
  }
}


const markJobCompleted = async (req, res) => {
  const id = req.params.complaintId; //complaintid

  
  const complaintObjectId =
  mongoose.Types.ObjectId.createFromHexString(id);

  if(!id){
    return res.status(400).json({message:"complaint id is required"});
  }
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      { _id: complaintObjectId }, // Ensure only non-resolved complaints are updated
      { $set: { status: "jobCompleted" } },
      {new:true}
    );

    res.status(200).json({ message: "complaint marked as completed", updatedComplaint });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "couldnt save changes", error }); // Send error response
  }
};


const getReservationDetails = async (reservationId) => {
  
  try {
    const reservation = await Reservation.findOne({_id : reservationId}).populate({
      path : 'property',
      select : 'host_id title'
    }).populate({
      path : 'user',
      select : 'firstName lastName _id'
    });

    if (reservation) {
      return reservation
    } else {
      throw new Error('No reservation found for given reservation ID.');
    }

  } catch (error) {
    console.error("Error fetching details", error);
    return null;  // Handle the error as needed
  }
}

// Function to get the full name of a user by their ID
const getNameById = async (id) => {
  try {
    // Find user by ID
    const user = await User.findById(id);
    
    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }
    
    // Return the full name
    return `${user.firstName} ${user.lastName}`;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const getTechnicianUserId = async (technicianId) => {

  try{
    const technicianFetched = await Technician.findById(technicianId);
    console.log("technicianFeched",technicianFetched);
    if(!technicianFetched) {
      throw new Error("No Such Technician Found.");
    }
    return technicianFetched.userId
  }
  catch (error) {
    console.error("Error fetching Technician:", error);
    throw error;
  }
}


module.exports = {
  raiseComplaint,
  getComplaintById, //host
  assignComplaintToTechnician, //host
  getNoOfJobsCompleted, //technician
  // getAllComplaintsByHostId, //host
  getAllJobsByTechnicianId, //technician
  getActiveJobsByTechnicianId, //technician
  getPendingJobsByTechnicianId, //technician
  // getPendingComplaintsByHostId, //host
  // getActiveComplaintsByHostId, //host
  getCompletedJobs, //technician
  acceptJob,
  getComplaintsByHost, //working
  getPendingComplaintsByHost,
  hello,
  reviewTask,
  uploadProof,
  markAsResolved,
  confirmJob,
  getProgress,
  setProgress,
  markJobCompleted
};
