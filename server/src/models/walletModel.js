const mongoose = require('mongoose');

const walltetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        default: 0
    }
});

const Wallet = mongoose.model('Wallet',walletSchema);
module.exports =  Wallet;