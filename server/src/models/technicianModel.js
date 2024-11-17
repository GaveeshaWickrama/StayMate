const mongoose = require('mongoose');
const { Schema } = mongoose;

//review sub schema

// Define the schema for reviews
const reviewSchema = new Schema({
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Reference to the user who gave the review
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true, // Rating is required
  },
  review: {
    type: String, // Optional review text
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the review creation date
  },
}, { _id: false }); // Disable automatic _id creation for sub-documents




// Define the schema for location
const locationSchema = new Schema({
  address: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  province: {
    type: String,
    required: true,
    trim: true
  },
  zipcode: {
    type: String,
    trim: true
  },
  geocoding_response: {
    type: Object
  },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },


 
});

// Pre-save middleware to set the coordinates from latitude and longitude
locationSchema.pre('save', function(next) {
  this.coordinates.coordinates = [this.longitude, this.latitude];
  next();
});

// Technician Schema
const technicianSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: locationSchema,
    required: true
  },
  subRole: {
    type: String,
    required: true,
    enum: ['plumber', 'electrician', 'carpenter', 'painter', 'other']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  about: {
    type: String,
    default: 'No description provided',
    trim: true
  },

  reviews: {
    type:[reviewSchema],
    default:[],
  }

}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  collection: 'technicians' // Explicitly set the collection name
});

module.exports = mongoose.model('Technician', technicianSchema);
