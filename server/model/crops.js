const mongoose = require('mongoose');

const cropsSchema = new mongoose.Schema({
    CropName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
        
    }
});

module.exports = mongoose.model('Crops', cropsSchema)
