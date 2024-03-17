import React, { useState } from 'react'
import axios from 'axios';
// import ObjectID from 'bson-objectid';
// import ObjectId from 'bson-objectid'
import { v4 as uuidv4 } from 'uuid';
import databaseURL from '../Config/backendURL'
import { ref } from 'firebase/storage';
import { imageDB } from '../Firebase/config.js';

const CreateHarvest = () => {

    const generateUUID = () => {
        return uuidv4(); // Generate a random UUID
    };
    const objectID = generateUUID();
    const [img, setImg] = useState("");

    const [harvestData, setHarvestData] = useState({
        uuid: objectID,
        cropName: '',
        harvestOwner: '',
        location: '',
        contactNumber: '',
        listedOn: '',
        expectedHarvestDate: '',
        pricePerKg: '',
        expectedQuantity: '',
        img: '',
    });
    const handleChange = (e) => {
        setHarvestData({ ...harvestData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch(databaseURL + '/createCrop', harvestData);
            // console.log('Crop created:', response.data);
            // console.log('Data sent to MongoDB successfully!');
            const response = await fetch(databaseURL + '/createCrop', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(harvestData),
            });
            const data = await response.json();
            console.log('Crop created:', data);
            console.log('Data sent to MongoDB successfully!');
            // ref
        }
        
         catch (error) {
            console.error('Error creating crop:', error);
        }
    };

    // const handleImageChange = (e) => {
        
    // }

     
    return (
        <div>
            <h1>Create Crop</h1>
            <h3>{objectID}</h3>
            <form onSubmit={handleSubmit}>
                {/* <input type="hidden" name="_id" value={objectID} /> Hidden input for _id */}
                <input type="text" name="cropName" placeholder="Crop Name" onChange={handleChange} required />
                <input type="text" name="harvestOwner" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
                <input type="date" name="listedOn" placeholder="Listed On" onChange={handleChange} required />
                <input type="date" name="expectedHarvestDate" placeholder="Expected Harvest Date" onChange={handleChange} required />
                <input type="number" name="pricePerKg" placeholder="Price Per Kg" onChange={handleChange} required />
                <input type="text" name="expectedQuantity" placeholder="Expected Quantity" onChange={handleChange} required />
                <input type="file" name="image"  accept=".png, .jpg, .jpeg" onChange={(e)=> setImg (e.target.files[0])} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateHarvest


{/*  <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
                <input type="date" name="listedOn" placeholder="Listed On" onChange={handleChange} required />
                <input type="date" name="expectedHarvestDate" placeholder="Expected Harvest Date" onChange={handleChange} required />
                <input type="number" name="pricePerKg" placeholder="Price Per Kg" onChange={handleChange} required />
                <input type="text" name="expectedQuantity" placeholder="Expected Quantity" onChange={handleChange} required /> */}
{/* <input type="file" name="image" onChange={handleChange} required /> File input for image */ }

// import React, { useState } from 'react';
// import {  ObjectId } from 'mongodb'; // Import ObjectID from MongoDB

// const CreateHarvest = () => {
//     const [formData, setFormData] = useState({
//         _id: new ObjectId(), // Generate _id on the client side
//         cropName: '',
//         name: '',
//         location: '',
//         contactNumber: '',
//         listedOn: '',
//         expectedHarvestDate: '',
//         pricePerKg: '',
//         expectedQuantity: '',
//         image: null // Store the selected image
//     });

//     const handleChange = (e) => {
//         if (e.target.name === 'image') {
//             // When handling the image input, set the file to state
//             setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//         } else {
//             setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Rename the image file using the _id
//         const imageName = formData._id + '_' + formData.image.name;

//         try {
//             // Use FormData to send both form data and file
//             const formDataToSend = new FormData();
//             formDataToSend.append('_id', formData._id);
//             formDataToSend.append('cropName', formData.cropName);
//             formDataToSend.append('name', formData.name);
//             formDataToSend.append('location', formData.location);
//             formDataToSend.append('contactNumber', formData.contactNumber);
//             formDataToSend.append('listedOn', formData.listedOn);
//             formDataToSend.append('expectedHarvestDate', formData.expectedHarvestDate);
//             formDataToSend.append('pricePerKg', formData.pricePerKg);
//             formDataToSend.append('expectedQuantity', formData.expectedQuantity);
//             formDataToSend.append('image', formData.image, imageName);

//             const res = await fetch('/createHarvest', {
//                 method: 'POST',
//                 body: formDataToSend
//             });
//             const data = await res.json();
//             console.log(data); // Log the response from the server
//             // Optionally, you can handle success, like showing a success message to the user
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle error, like showing an error message to the user
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="hidden" name="_id" value={formData._id} /> {/* Hidden input for _id */}
//             <input type="text" name="cropName" placeholder="Crop Name" onChange={handleChange} required />
//             <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//             <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
//             <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
//             <input type="date" name="listedOn" placeholder="Listed On" onChange={handleChange} required />
//             <input type="date" name="expectedHarvestDate" placeholder="Expected Harvest Date" onChange={handleChange} required />
//             <input type="number" name="pricePerKg" placeholder="Price Per Kg" onChange={handleChange} required />
//             <input type="text" name="expectedQuantity" placeholder="Expected Quantity" onChange={handleChange} required />
//             <input type="file" name="image" onChange={handleChange} required /> {/* File input for image */}
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default CreateHarvest;
