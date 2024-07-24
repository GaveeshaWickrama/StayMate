const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertyverifiedSchema = new Schema({
    propertyID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'verified', 'rejected']
    },
    moderator: {
        type: String,
        default: ''
    },
    rejectionReasons: {
        type: [String],
        default: [],
        enum: ['', 'Misleading Description', 'Proof of Amneties Misiing', 'Proof of Facilities Missing', 'Property Not Belonging to you', 'Other']       
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

module.exports = mongoose.model('PropertyVerified', propertyverifiedSchema);
