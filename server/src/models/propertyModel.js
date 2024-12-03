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
  amenities: [
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      image: {
        url: {
          type: String,
          required: false,
          trim: true
        }
      }
    }
  ]
});




//added by Gaveesha

//This is for auto incrementing  field

// Counter Schema and Model
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // The name of the sequence (e.g., 'auto_id')
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
  const counter = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { seq: 1 } }, // Increment the sequence by 1
    { new: true, upsert: true } // Return the new value and create if not exists
  );
  return counter.seq;
};



// Define the schema for properties
const propertySchema = new Schema({
  //Added by Gvaesha for adding a moderator

  auto_id: {
    type: Number, 
    unique: true 
  }, // Auto-incremented field

  moderator_id: {
    type: Schema.Types.ObjectId,
    default: null, // Set default value to null
  },
  rejected_reason: {
    type: String,
    default: null,
  },









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
    enum: ['House', 'Apartment', 'Villa', 'Cottage', 'Cabin' , 'Bungalow']
  },
  total_unique_sections: {
    type: Number,
    required: true
  },
  sections: [sectionSchema],
  amenities: [
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      image: {
        url: {
          type: String,
          required: false,  // Not all amenities might have an image
          trim: true
        }
      }
    }
  ],
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
  visibility: {
    type: String,
    enum: ['visible', 'hidden'],
    default: 'visible'
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
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

// Remove the post-save hook
// propertySchema.post('save', async function(doc, next) {
//   const PropertyVerified = mongoose.model('PropertyVerified');
//   try {
//     await PropertyVerified.create({
//       propertyID: doc._id,
//       status: 'pending'
//     });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });



//Added by Gavvesha
propertySchema.pre('save', async function (next) {
  if (this.isNew) {
    this.auto_id = await getNextSequenceValue('auto_id');
  }
  next();
});

module.exports = mongoose.model('Property', propertySchema);
