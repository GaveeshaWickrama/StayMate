const User = require("../models/userModel");
const Technician = require("../models/technicianModel");
const mongoose = require("mongoose");
const Property = require("../models/propertyModel");
const Review = require("../models/reviewModel"); 

//get all users
const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a single user :means my profile
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

//this is same as the above function here only change is I'm getting the id by the URL
const viewProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  let user;

  console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVV came here");

  if (req.user.role === "technician") {
    console.log("Inside techhhh pro");

    // Fetch technician details
    const technicianDetails = await Technician.findOne({ userId: id });
    console.log("Technician Details: ", technicianDetails);

    // Fetch user details
    const userDetails = await User.findById(id);
    console.log("User Details: ", userDetails);

    if (!technicianDetails || !userDetails) {
      return res.status(404).json({ error: "No such user" });
    }

    // Merge details
    user = {
      ...userDetails._doc,
      ...technicianDetails._doc,
    };

    console.log("after merging technician and user details", user);
  } else {
    console.log("Inside normal contt");
    user = await User.findById(id);
    console.log("User: ", user);

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
  }

  res.status(200).json(user);
};

/// Edit profile
const editProfile = async (req, res) => {
  console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVV came inside edit here");
  const id = req.user.userId;
  console.log("User ID:", id);
  console.log("Uploaded file:", req.file); // Log the file object

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const updateData = { ...req.body };
    if (req.file && req.file.path) {
      updateData.picture = req.file.path.replace(/\\/g, "/");
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get host properties by host id
//get a single user :means my profile
const getProperties = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Fetch properties based on the host_id
    const properties = await Property.find({ host_id: id });

    // Respond with an empty array if no properties are found
    return res.status(200).json(properties.length > 0 ? properties : []);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get ratings
const getRatings = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid host ID" });
  }

  try {
    // Fetch properties where host_id matches the provided ID
    const properties = await Property.find({ host_id: id });

    if (properties.length === 0) {
      return res.status(200).json([]);
    }

    // Extract property IDs
    const propertyIds = properties.map((property) => property._id);

    // Fetch reviews for these properties, including username
    const reviews = await Review.aggregate([
      {
        $match: {
          property: { $in: propertyIds }, // Match properties
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by the most recent
      },
      {
        $group: {
          _id: "$property",
          reviews: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          reviews: { $slice: ["$reviews", 5] }, // Limit to 5 reviews per property
        },
      },
      {
        $unwind: "$reviews", // Flatten the reviews array for lookup
      },
      {
        $lookup: {
          from: "users", // The User collection
          localField: "reviews.user", // Field in Review schema
          foreignField: "_id", // Field in User schema
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Flatten user details
      },
      {
        $group: {
          _id: "$_id",
          reviews: {
            $push: {
              comment: "$reviews.comment",
              createdAt: "$reviews.createdAt",
              rating: "$reviews.rating",
              username: { $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"] },
            },
          },
        },
      },
    ]);

    // Map reviews back to properties
    const result = properties.map((property) => {
      const propertyReviews = reviews.find(
        (review) => review._id.toString() === property._id.toString()
      );

      return {
        propertyName: property.title, // Assuming the property model has a 'title' field
        reviews: propertyReviews ? propertyReviews.reviews : [],
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};








const addAccountNo = async (req, res) => {
  const id = req.user.userId;
  console.log("User ID:", id);

  // Optional: If you're handling file uploads, you can log or process the file.
  // console.log("Uploaded file:", req.file);

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Create an update object with the data from the request body
    const updateData = { ...req.body };

    // Find the user by ID and update the account number or other fields
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }

    // Send the updated user data back to the client
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating Account No:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

// async function getUserSachin(req, res) {
//     try {
//         const userId = req.user.userId;
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: 'Not found' });
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// async function updateUserbySachin(req, res) {
//     try {
//         const userId = req.user.userId;
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: 'Not found' });

//         Object.keys(req.body).forEach(key => {
//             user[key] = req.body[key];
//         });

//         const updatedUser = await user.save();
//         res.json(updatedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }

module.exports = {
  getUser,
  getUsers,
  editProfile,
  deleteUser,
  viewProfile,
  addAccountNo,
  getProperties,
  getRatings,
};
