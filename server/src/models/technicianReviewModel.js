const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const technicianReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  technician: {
    type: Schema.Types.ObjectId,
    ref: "Technician",
    required: true,
  },
  reservation: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
},
  {
    collection:"technicianReviews"
  }
);

const TechnicianReview = mongoose.model("TechnicianReview", technicianReviewSchema);
module.exports = TechnicianReview;
