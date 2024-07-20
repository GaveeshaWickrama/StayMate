const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for PropertyVerifiedModel
const propertyVerifiedSchema = new Schema({
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
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PropertyVerified', propertyVerifiedSchema);
