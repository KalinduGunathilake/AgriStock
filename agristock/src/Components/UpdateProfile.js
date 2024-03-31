import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import backendURL from '../Config/backendURL';
import Navbar from './navbar';

const UpdateProfile = () => {

	const userID = useParams().userID
	const navigate = useNavigate();
	const { currentUser } = useAuth();
	const { userLoggedIn } = useAuth();
	const [userName, setUserName] = useState('');
	// console.log("current user : " + currentUser.uid);
	// console.log("userID : " + userID);
	const unauthorized = () => {
		alert("You are not authorized to edit this user");
		navigate('/home');
	}

	useEffect(() => {
		if (currentUser.uid !== userID) {
			unauthorized();
		}
	}, [])



	useEffect(() => {
		if (userLoggedIn) {
			console.log(userLoggedIn)
			fetch(backendURL + `/getuserdetails?firebaseId=${currentUser.uid}`)
				.then(response => response.json())
				.then(data => {
					// setRole(data.users.role)
					console.log(data)
					// setRole(data.users[0].role)
					setUserName(data.users[0].name)
					// setHarvests(data.farmersHarvests)
					setUserData({
						uuid: data.users[0].firebaseID,
						name: data.users[0].name,
						contactNo: data.users[0].contactNo,
						// img: data.users[0].image
					})
				})
		}

	}, [userLoggedIn])


	const [userData, setUserData] = useState({
		uuid: '',
		name: '',
		contactNumber: '',
		img: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};






	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log("submitting", userData)
		// console.log(currentUser.uid)
		// }
		// 	e.preventDefault();

		fetch(`${backendURL}/updateUser?id=${currentUser.uid}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json', // Specify content type as JSON
			},
			body: JSON.stringify(userData), // Convert JavaScript object to JSON string
		})
			.then(response => {
				if (response.ok) {
					return response.json(); // If the response is successful, parse JSON
				}
				throw new Error('Network response was not ok.'); // If response is not ok, throw an error
			})
			.then(data => {
				// handleImageUpload()
				setTimeout(() => {
					alert('Profile updated successfully!');
					console.log(data)
					navigate(-1);
				}, 1000);

			})
			.catch(error => {
				// Handle errors
				console.error('There was a problem with the fetch operation:', error);
			});
	};
	// const handleImageUpload = () => {
	// 	if (image) {


	// 		const storageRef = ref(imageDB, `images/${harvest.uuid}`);
	// 		uploadBytes(storageRef, image).then(() => {
	// 			console.log('Image uploaded successfully!');
	// 		}).catch((error) => {
	// 			console.error('Error uploading image: ', error);
	// 		});
	// 	} else {
	// 		console.error('No image selected!');
	// 	}
	// };
	// const handleFileChange = (e) => {
	// 	const selectedFile = e.target.files[0];
	// 	if (selectedFile) {
	// 		const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
	// 		if (allowedTypes.includes(selectedFile.type)) {
	// 			setImage(selectedFile);
	// 		} else {
	// 			alert('Only JPG, JPEG, and PNG files are allowed.');
	// 			e.target.value = null; // Clear the file input
	// 		}
	// 	}
	// };


	return (

		<div>
			<div className='updateHarvestCont'>

				<Navbar />
				<form onSubmit={handleSubmit} className='updateForm'>
					<div className='updateCreateFormInputs'>

						{/* <h3>Update Profile</h3> */}
						{/* <div className='inputCont'>
								<p>Upload Image</p>
								<input className='updateinputField' type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
							</div> */}



						<div className='inputCont'>
							<p>User Name</p>
							<input className='updateinputField' type="text" name="name" placeholder="User Name" value={userData.name} onChange={handleChange} required />
						</div>
						<div className='inputCont'>
							<p>Contact Number</p>
							<input className='updateinputField' type="text" name="contactNo" placeholder="+94701234567" value={userData.contactNo} onChange={handleChange} required />
						</div>


					</div>

					<button type="submit" className='submitButton'>Submit</button>
				</form>

			</div>






		</div>
	)
}

export default UpdateProfile