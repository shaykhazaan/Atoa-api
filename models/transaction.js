const mongoose = require('mongoose');

const schema = mongoose.Schema;

const transactSchema = new schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('transaction', transactSchema);