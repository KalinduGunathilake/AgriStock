// import crops from './model/crops.js';
const bodyParser = require('body-parser');
const Crops = require('./model/crops.js');
const Harvests = require('./model/harvests.js');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

const mongodbDatabaseUrl = "mongodb+srv://agristockadmin:AiIDmWRH1s5LB2Zc@agrsitock-sdgp-se120.ubr3vpr.mongodb.net/agristock?retryWrites=true&w=majority"

mongoose.connect(mongodbDatabaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`);
})
app.use(bodyParser.json())
app.use(cors());

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

app.get('/', (req, res) => {
    res.send('Hello World');
    console.log(res);
})

app.get('/getcrops', async(req, res) => {
    // res.send('Hello World');
    // console.log(res);

    try {
        const crop = await Crops.find();
        res.json({crop});
    }
    catch (err) {
        console.log(err);
    }

})

// app.get('/getharvests', async(req, res) => {
//     // res.send('Hello World'); 
//     try {
//         const harvest = await Harvests.find({ cropName: "Carrot" });
//         res.json({harvest});
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

app.get('/getharvests', async (req, res) => {
    const { cropName } = req.query;
    if (!cropName) {
        return res.status(400).json({ error: 'Crop name is required' });
    }

    try {
        // const harvests = await Harvests.find({ cropName: cropName });
        const harvests = await Harvests.find({ cropName: cropName }).sort({ expectedHarvestDate: 1 });
        res.json({ harvests });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/getharvestdetails', async (req, res) => {
    const { harvestID } = req.query;
    if (!harvestID) {
        return res.status(400).json({ error: 'Crop name is required' });
    }

    try {
        // const harvests = await Harvests.find({ cropName: cropName });
        const harvestDetails = await Harvests.find({ _id: harvestID });
        res.json({ harvestDetails });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.post('/createCrop', async (req, res) => {
//     const harvest = req.body

//     Harvests.insertOne(harvest)
//         .then((result) => {
//             res.send(result)
            
//         })
    
// })

app.post('/createCrop', async (req, res) => {
    try {
        const newHarvest = new Harvests(req.body);
        await newHarvest.save();
        res.status(201).json(newHarvest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});