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
    city: {
        type: String,
        required: true,
        trim: true
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
    }
}, { 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Adding a geospatial index
locationSchema.index({ latitude: 1, longitude: 1 });

locationSchema.virtual('coordinates').get(function() {
    return {
        type: "Point",
        coordinates: [this.longitude, this.latitude]
    };
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
        living_area: { // Corrected field name
            type: Number,
            required: true
        },
        bathrooms: {
            type: Number,
            required: true
        },
        kitchens: {
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
        ref: 'User' // Assuming you have a User model
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
        enum: ['House', 'Apartment', 'Villa', 'Cottage', 'Cabin'] // Add more as needed
    },
    total_unique_sections: {
        type: Number,
        required: true
    },
    sections: [sectionSchema],
    images: [ // General images for the property
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

propertySchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Property', propertySchema);

