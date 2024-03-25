import React, {  useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import backendURL from '../Config/backendURL'
import { ref, uploadBytes } from 'firebase/storage';
import { imageDB } from '../Firebase/config.js';
import { useAuth } from '../Context/AuthContext/authContext.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import "../Styles/createHarvest.css"
import Navbar from '../Components/navbar.js';

const CreateHarvest = () => {

    const { userLoggedIn } = useAuth();
    // console.log(userLoggedIn)

    const harvestUUIDRef = useRef(uuidv4());
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth()

    const [harvestData, setHarvestData] = useState({
        uuid: harvestUUIDRef.current,
        cropName: '',
        harvestOwner: currentUser.displayName ? currentUser.displayName  : '',
        location: '',
        contactNumber: '',
        listedOn: new Date().toISOString(),
        expectedHarvestDate: '',
        pricePerKg: '',
        expectedQuantity: '',
        img: '',
        farmerID: currentUser.uid,
    });
    const handleChange = (e) => {
        setHarvestData({ ...harvestData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendURL + '/createHarvest', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(harvestData),
            });
            const data = await response.json();
            console.log('Crop created:', data);


            console.log('Data sent to MongoDB successfully!');


            handleImageUpload();
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        }

        catch (error) {
            console.error('Error creating crop:', error);
        }
    };


    const handleImageUpload = () => {
        if (image) {

            const storageRef = ref(imageDB, `images/${harvestUUIDRef.current}`);
            uploadBytes(storageRef, image).then(() => {
                console.log('Image uploaded successfully!');
                // You can perform additional tasks after successful upload
            }).catch((error) => {
                console.error('Error uploading image: ', error);
            });
        } else {
            console.error('No image selected!');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (allowedTypes.includes(selectedFile.type)) {
                setImage(selectedFile);
            } else {
                alert('Only JPG, JPEG, and PNG files are allowed.');
                e.target.value = null; // Clear the file input
            }
        }
    };



    return (
        <div>
            {!userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <Navbar />
            <div className='createHarvestContainer'>
                <h3 className='createHarvestTitle'>Create a Harvest Listing</h3>
                {/* <h3>{harvestUUIDRef.current}</h3> */}
                <form onSubmit={handleSubmit} className='createForm'>
                    <div className='createFormInputs'>
                        <input className='inputField' type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} required />
                        <input className='inputField' type="text" name="cropName" placeholder="Crop Name" onChange={handleChange}  required />
                        <input className='inputField' type="text" name="harvestOwner" placeholder="Name" onChange={handleChange} value={currentUser.displayName ? currentUser.displayName  : ''} required />
                        <input className='inputField' type="text" name="location" placeholder="Location (e.g. street address, city, state, zip)" onChange={handleChange} required />
                        <input className='inputField' type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
                        {/* <input className='inputField' type="hidden" name="listedOn" value={new Date().toISOString()} onChange={handleChange} /> */}
                        <input className='inputField' type="date" name="expectedHarvestDate" placeholder="Expected Harvest Date" onChange={handleChange} required />
                        <input className='inputField' type="number" name="pricePerKg" placeholder="Price Per Kg" onChange={handleChange} required />
                        <input className='inputField' type="text" name="expectedQuantity" placeholder="Expected Quantity" onChange={handleChange} required />
                    </div>
                    {/* <input type="hidden" name="farmerID" value={useAuth().currentUser.uid} /> Hidden input for _id */}

                    <button type="submit" className='submitButton'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateHarvest


