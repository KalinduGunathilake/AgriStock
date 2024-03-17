const { Double, Decimal128, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const harvestsSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true
    // },
    uuid: {
        type: String,
        required: true,
    },
    cropName: {
        type: String,
        required: true
    },
    harvestOwner: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    listedOn: {
        type: Date,
        required: true
    },
    expectedHarvestDate: {
        type: Date,
        required: true
    },
    pricePerKg: {
        type: Decimal128,
        required: true
    },
    expectedQuantity: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Harvests', harvestsSchema)