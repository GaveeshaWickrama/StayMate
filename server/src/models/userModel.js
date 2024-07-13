const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        required: true,
        enum: ['guest', 'host', 'technician', 'admin', 'moderator'], // Specifies the allowable roles
        default: 'guest' // Default role when none is specified
    },
    assigned:{
        type: Number,
    },
    picture:{
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
