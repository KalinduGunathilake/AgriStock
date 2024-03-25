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


	// const [harvestData, setHarvestData] = useState({
	// 	uuid: harvest.uuid,
	// 	cropName: harvest.cropName,
	// 	harvestOwner: currentUser.displayName ? currentUser.displayName : '',
	// 	location: harvest.location,
	// 	contactNumber: harvest.contactNumber,
	// 	listedOn: harvest.listedOn,
	// 	expectedHarvestDate: harvest.expectedHarvestDate,
	// 	pricePerKg: harvest.pricePerKg,
	// 	expectedQuantity: harvest.expectedQuantity,
	// 	img: '',
	// 	farmerID: currentUser.uid,
	// });
	// const handleChange = (e) => {
	// 	setHarvestData({ ...harvestData, [e.target.name]: e.target.value });
	// };
	const [harvestData, setHarvestData] = useState({
		uuid: '',
		cropName: '',
		harvestOwner: currentUser.displayName ? currentUser.displayName : '',
		location: '',
		contactNumber: '',
		listedOn: '',
		expectedHarvestDate: '',
		pricePerKg: 0,
		expectedQuantity: '',
		img: '',
		farmerID: currentUser.uid,
	});

	useEffect(() => {
		setHarvestData(prevData => ({
			...prevData,
			uuid: harvest.uuid || '',
			cropName: harvest.cropName || '',
			location: harvest.location || '',
			contactNumber: harvest.contactNumber || '',
			listedOn: harvest.listedOn || '',
			expectedHarvestDate: harvest.expectedHarvestDate ? new Date(harvest.expectedHarvestDate).toISOString().split('T')[0] : '',
			pricePerKg: parseFloat(harvest.pricePerKg?.$numberDecimal) || 0,
			expectedQuantity: harvest.expectedQuantity || '',
		}));
	}, [harvest]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setHarvestData(prevData => ({
			...prevData,
			[name]: value,
		}));
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
			{/* UpdateHarvest */}
			{harvest ?
				<div className='updateHarvestCont'>

					<Navbar />
					<form onSubmit={handleSubmit} className='updateForm'>
						<div className='updateCreateFormInputs'>
							
							<div className='inputCont'>
								<p>Upload Image</p>
								<input className='updateinputField' type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
							</div>

							<div className='inputCont'>
								<p>Crop Name</p>
								<input className='updateinputField' type="text" name="cropName" placeholder="Crop Name" value={harvestData.cropName} readOnly required />
							</div>

							<div className='inputCont'>
								<p>Name</p>
								<input className='updateinputField' type="text" name="harvestOwner" placeholder="Name" value={harvestData.harvestOwner} onChange={handleChange} required />
							</div>

							<div className='inputCont'>
								<p>Location</p>
								<input className='updateinputField' type="text" name="location" placeholder="Location" value={harvestData.location} onChange={handleChange} required />
							</div>

							<div className='inputCont'>
								<p>Contact Number</p>
								<input className='updateinputField' type="text" name="contactNumber" placeholder="Contact Number" value={harvestData.contactNumber} onChange={handleChange} required />
							</div>

							<div className='inputCont'>
								<p>Expected Harvest Date</p>
								<input className='updateinputField' type="date" name="expectedHarvestDate" placeholder="Expected Harvest Date" value={harvestData.expectedHarvestDate} onChange={handleChange} required />
							</div>

							<div className='inputCont'>
								<p>Price Per Kg</p>
								<input className='updateinputField' type="number" name="pricePerKg" placeholder="Price Per Kg" value={harvestData.pricePerKg} onChange={handleChange} required />
							</div>

							<div className='inputCont'>
								<p>Expected Quantity</p>
								<input className='updateinputField' type="text" name="expectedQuantity" placeholder="Expected Quantity" value={harvestData.expectedQuantity} onChange={handleChange} required />
							</div>

							{/*<input className='updateinputField' type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
-							<input className='updateinputField' type="text" name="cropName" placeholder="Crop Name" value={harvestData.cropName} readOnly required />
-							<input className='updateinputField' type="text" name="harvestOwner" placeholder="Name" value={harvestData.harvestOwner} onChange={handleChange} required />
-							<input className='updateinputField' type="text" name="location" placeholder="Location" value={harvestData.location} onChange={handleChange} required />
-							<input className='updateinputField' type="text" name="contactNumber" placeholder="Contact Number" value={harvestData.contactNumber} onChange={handleChange} required />
-							<input className='updateinputField' type="date" name="expectedHarvestDate" placeholder="Expected Harvest Date" value={harvestData.expectedHarvestDate} onChange={handleChange} required />
-							<input className='updateinputField' type="number" name="pricePerKg" placeholder="Price Per Kg" value={harvestData.pricePerKg} onChange={handleChange} required />
-							<input className='updateinputField' type="text" name="expectedQuantity" placeholder="Expected Quantity" value={harvestData.expectedQuantity} onChange={handleChange} required /> */}
						</div>

						<button type="submit" className='submitButton'>Submit</button>
					</form>
				</div>
				:
				<>
					no info found
				</>
			}
		</div>

	)
}

export default UpdateHarvest