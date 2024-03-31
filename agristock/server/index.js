// import crops from './model/crops.js';
const bodyParser = require('body-parser');
const Crops = require('./model/crops.js');
const Harvests = require('./model/harvests.js');
const Users = require('./model/users.js');
const News = require('./model/news.js');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

const mongodbDatabaseUrl = "mongodb+srv://agristockadmin:AiIDmWRH1s5LB2Zc@agrsitock-sdgp-se120.ubr3vpr.mongodb.net/agristock?retryWrites=true&w=majority"
const weatherAPI = "fea19e6c759dda5eec6261a35d687965"

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
        return res.status(400).json({ error: 'Crop id is required' });
    }

    try {
        // const harvests = await Harvests.find({ cropName: cropName });
        const harvestDetails = await Harvests.find({ _id: harvestID });
        res.json({ harvestDetails, harvestID });
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

app.post('/createHarvest', async (req, res) => {
    try {
        // console.log(req.body);
        console.log("end point called");
        const newHarvest = new Harvests(req.body);
        await newHarvest.save();
        res.status(201).json(newHarvest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/createUser', async (req, res) => {
    // res.send('Hello World');
    const { firebaseID } = req.body;
    try {
        console.log(firebaseID);
        // console.log("end point called");
        const newUser = new Users(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get ('/getuserdetails', async (req, res) => {
    const { firebaseId } = req.query;
    try {
        const users = await Users.find({firebaseID : firebaseId});
        const farmersHarvests = await Harvests.find({farmerID : firebaseId});
        res.json({ users, farmersHarvests });
    } catch (err) {
        console.log(err);
    }
})

app.get ('/checkuser', async (req, res) => {
    const { firebaseID } = req.query;
    try {
        // console.log(firebaseID)
        const user = await Users.find({firebaseID : firebaseID});
        // res.json(!!user);
        // res.json(user);
        if (user.length != 0) {
            // console.log("User has logged in before with this email")
            res.json(true);
        } else {
            // console.log("User has not logged in before with this email")
            res.json(false);
        }
    }catch (err) {
        console.log(err);
    }
    // res.send('Hello World');
})


app.patch('/updateUser', async (req, res) => {
    // const userId = req.params.id;
    const updatedFields = req.body;
    // res.send(updatedFields);
    const { firebaseID } = req.query;
    try {
        // const updatedUser = await Users.find(firebaseID, updatedFields, { new: true });
        const updatedUser = await Users.findOneAndUpdate({firebaseID : firebaseID}, { $set: updatedFields }, {new: true});
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



app.patch('/updateHarvest', async (req, res) => {
    const { uuid } = req.query;
    const updatedFields = req.body;
    try {
        const updatedHarvest = await Harvests.findOneAndUpdate({ uuid: uuid }, { $set: updatedFields }, {new: true});
        if (!updatedHarvest) {
            return res.status(404).json({ message: 'Harvest not found' });
        }

        res.status(200).json(updatedHarvest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



app.patch('/addharvestListingtoFarmer', async (req, res) => {
    const { firebaseID } = req.query;
    const newHarvest = req.body.harvest; // Assuming the client sends a single harvest ID

    try {
        const updatedUser = await Users.findOneAndUpdate(
            { firebaseID: firebaseID }, // Filter
            { $push: { harvests: newHarvest } }, // Update using $push
            { new: true } // Options
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/getnews', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        console.log(err);
    }
})



app.delete('/deleteHarvest', async (req, res) => {
    const { uuid } = req.query;

    try {
        const deletedHarvest = await Harvests.findOneAndDelete({ uuid: uuid });

        if (!deletedHarvest) {
            return res.status(404).json({ message: 'Harvest not found' });
        }
        await Users.findOneAndUpdate(
            { harvests: uuid }, // Filter
            { $pull: { harvests: uuid } }, // Update using $pull
        );

        res.status(200).json({ message: 'Harvest successfully deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/getweather5days', async (req, res) => {

        const { lat, long } = req.query;
        const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&appid=${weatherAPI}&cnt=5`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const weather = await response.json();
            res.json(weather);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }

})
