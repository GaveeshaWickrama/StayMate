const mongoose = require('mongoose');
const { Schema } = mongoose;

// Review Sub Schema
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
  reviewText: {
    type: String, // Optional review text
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the review creation date
  },
}, { _id: false }); // Disable automatic _id creation for sub-documents

// Location Schema
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
  reviews: {
    type: [reviewSchema],
    default: [],
  }
});

// Pre-save middleware to set the coordinates from latitude and longitude
locationSchema.pre('save', function(next) {
  this.coordinates.coordinates = [this.longitude, this.latitude];
  next();
});

// PropertyOwner Schema
const propertyOwnerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: locationSchema,
    required: true
  },
  propertyName: {
    type: String,
    required: true,
    trim: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['apartment', 'house', 'villa', 'condo', 'other']
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
  about: {
    type: String,
    default: 'No description provided',
    trim: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  collection: 'propertyOwners' // Explicitly set the collection name
});

module.exports = mongoose.model('PropertyOwner', propertyOwnerSchema);
