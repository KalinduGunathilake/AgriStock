import React, { useEffect, useState } from 'react'
import backendURL from '../Config/backendURL'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext/authContext'
import { ref, uploadBytes } from '@firebase/storage'
import { imageDB } from '../Firebase/config'
import Navbar from './navbar'
import '../Styles/updateHarvest.css'

const UpdateHarvest = () => {

	const harvestID = useParams().harvestID
	const [harvest, setHarvest] = useState({})
	const { currentUser } = useAuth()
	const navigate = useNavigate();
	const [image, setImage] = useState(null);
	const [formattedDate, setFormattedDate] = useState('')
	const [pricePerKg, setPricePerKg] = useState(0);

	// useEffect(() => {
	// 	if (harvest.length !== 0) {

	// 		// setFormattedDate(harvest.expectedHarvestDate.toISOString().split('T')[0]);
	// 		// setFormattedDate(new Date(harvest.expectedHarvestDate).toISOString().substr(0,10));
	// 		setFormattedDate(new Date(harvest.expectedHarvestDate));
	// 		// console.log(new Date(harvest.expectedHarvestDate).toLocaleDateString('en-GB').substring(0, 10));
	// 	}

	// }, [harvest])

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		// console.log(formattedDate.toLocaleDateString('en-GB').substring(0, 10));
	// 		setFormattedDate(new Date(harvest.expectedHarvestDate).toLocaleDateString().substring(0, 10));
	// 	}, 4000);
	// }, [])

	console.log(harvestID)
	useEffect(() => {
		fetch(backendURL + '/getharvestdetails?harvestID=' + harvestID)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				setHarvest(data.harvestDetails[0])
				setPricePerKg(data.harvestDetails[0].pricePerKg.$numberDecimal)
			})
	}, [])


	const [harvestData, setHarvestData] = useState({
		uuid: harvest.uuid,
		cropName: harvest.cropName,
		harvestOwner: currentUser.displayName ? currentUser.displayName : '',
		location: harvest.location,
		contactNumber: harvest.contactNumber,
		listedOn: harvest.listedOn,
		expectedHarvestDate: harvest.expectedHarvestDate,
		pricePerKg: harvest.pricePerKg,
		expectedQuantity: harvest.expectedQuantity,
		img: '',
		farmerID: currentUser.uid,
	});
	const handleChange = (e) => {
		setHarvestData({ ...harvestData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		fetch(`${backendURL}/updateHarvest?uuid=${harvest.uuid}`, {
			method: 'PATCH',
			headers: {
			  'Content-Type': 'application/json', // Specify content type as JSON
			},
			body: JSON.stringify(harvestData), // Convert JavaScript object to JSON string
		  })
		  .then(response => {
			if (response.ok) {
			  return response.json(); // If the response is successful, parse JSON
			}
			throw new Error('Network response was not ok.'); // If response is not ok, throw an error
		  })
		  .then(data => {
			handleImageUpload()
			setTimeout(() => {
				alert('Harvest updated successfully!');
				navigate(-1);
			}, 1000);

		  })
		  .catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
		  });
	};
	const handleImageUpload = () => {
		if (image) {


			const storageRef = ref(imageDB, `images/${harvest.uuid}`);
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
			UpdateHarvest
			{harvest ?
				<>
					{/* <p>{harvest.uuid ? harvest.uuid : ''}</p>
          <p>{harvest.harvestOwner}</p>
          <p>{harvest.cropName}</p> */}
					<Navbar />
					<form onSubmit={handleSubmit} className='createForm'>
						<div className='updateCreateFormInputs'>
							<input className='inputField' type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} required />
							<input className='inputField' type="text" name="cropName" placeholder="Crop Name" value={harvest.cropName} readOnly required />
							<input className='inputField' type="text" name="harvestOwner" placeholder="Name" onChange={handleChange} value={currentUser.displayName ? currentUser.displayName : ''} required />
							<input className='inputField' type="text" name="location" placeholder="Location (e.g. street address, city, state, zip)" onChange={handleChange} value={harvest.location} required />
							<input className='inputField' type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} value={harvest.contactNumber} required />
							{/* <input className='inputField' type="hidden" name="listedOn" value={new Date().toISOString()} onChange={handleChange} /> */}
							<input className='inputField' type="date" name="expectedHarvestDate" placeholder="Expected Harvest Date"  onChange={(e) => handleChange(e)} required />
							<input className='inputField' type="number" name="pricePerKg" placeholder="Price Per Kg" onChange={handleChange} value={pricePerKg} required />
							<input className='inputField' type="text" name="expectedQuantity" placeholder="Expected Quantity" onChange={handleChange} value={harvest.expectedQuantity} required />
						</div>
						{/* <input type="hidden" name="farmerID" value={useAuth().currentUser.uid} /> Hidden input for _id */}

						<button type="submit" className='submitButton'>Submit</button>
					</form>
				</>
				:
				<>
					no info found
				</>
			}
			{/* <button */}
		</div>

	)
}

export default UpdateHarvest