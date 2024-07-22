const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    required: true,
    trim: true
  },
  geocoding_response: {
    type: Object
  },
  coordinates: {  // Coordinates directly in the document for geospatial indexing
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
});

// Pre-save middleware to set the coordinates from latitude and longitude
locationSchema.pre('save', function(next) {
  this.coordinates.coordinates = [this.longitude, this.latitude];
  next();
});

// Define the schema for availability
const availabilitySchema = new Schema({
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  }
});

// Define the schema for individual sections
const individualSectionSchema = new Schema({
  individual_section_id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  availability: [availabilitySchema]
});

// Define the schema for sections
const sectionSchema = new Schema({
  section_id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  section_name: {
    type: String,
    required: true,
    trim: true
  },
  count: {
    type: Number,
    required: true
  },
  individual_sections: [individualSectionSchema],
  plan: {
    beds: {
      type: Number,
      required: true
    },
    guests: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    }
  },
  price_per_night: {
    type: Number,
    required: true
  },
  images: [
    {
      url: {
        type: String,
        required: true,
        trim: true
      }
    }
  ],
  amenities: [String]
});

// Define the schema for properties
const propertySchema = new Schema({
  host_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['House', 'Apartment', 'Villa', 'Cottage', 'Cabin']
  },
  total_unique_sections: {
    type: Number,
    required: true
  },
  sections: [sectionSchema],
  amenities: [String],
  images: [
    {
      url: {
        type: String,
        required: true,
        trim: true
      }
    }
  ],
  location: locationSchema,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Ensure 'location.coordinates' uses the 2dsphere index for geospatial queries
propertySchema.index({ 'location.coordinates': '2dsphere' });

// Post-save hook to create a PropertyVerified document
propertySchema.post('save', async function(doc, next) {
  const PropertyVerified = mongoose.model('PropertyVerified');
  try {
    await PropertyVerified.create({
      propertyID: doc._id,
      status: 'pending'
    });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Property', propertySchema);
