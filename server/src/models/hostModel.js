const mongoose = require('mongoose');
const { Schema } = mongoose;

// Review Sub-Schema
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
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true, // Reference to the property reviewed
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the review creation date
  },
}, { _id: false }); // Disable automatic _id creation for sub-documents

// Location Sub-Schema
const locationSchema = new Schema({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  province: {
    type: String,
    required: true,
    trim: true,
  },
  zipcode: {
    type: String,
    trim: true,
  },
  geocoding_response: {
    type: Object,
  },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
});

// Pre-save middleware to set the coordinates from latitude and longitude
locationSchema.pre('save', function (next) {
  this.coordinates.coordinates = [this.longitude, this.latitude];
  next();
});

// Host Schema
const hostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  about: {
    type: String,
    default: 'No description provided',
    trim: true,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property', // Reference to the properties owned by the host
    },
  ],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  collection: 'hosts', // Explicitly set the collection name
});

module.exports = mongoose.model('Host', hostSchema);
