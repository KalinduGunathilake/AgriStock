const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    profilePic: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    harvests: {
        type: Array,
        required: false
    },
});

module.exports = mongoose.model('Users', userSchema)
