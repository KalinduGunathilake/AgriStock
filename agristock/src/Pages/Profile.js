import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext/authContext'
import { Navigate, useNavigate } from 'react-router-dom';
import backendURL from '../Config/backendURL'
import Navbar from '../Components/navbar';
import UpdateHarvest from '../Components/UpdateHarvest.js';
import { doSignOut } from '../Firebase/auth';
import '../Styles/profile.css'
import { imageDB } from '../Firebase/config';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import Loader from '../Components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPenToSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {

	const { userLoggedIn } = useAuth();
	const { currentUser } = useAuth()
	const uid = currentUser ? currentUser.uid : ''
	// const name = currentUser ? currentUser.displayName : ''
	const [name, setUserName] = useState('');
	const [role, setRole] = useState('');
	const [harvests, setHarvests] = useState([]);
	const navigate = useNavigate();
	const [imageUrl, setImageUrl] = useState(null);
	const [imageName, setImageName] = useState('');
	const [imageUrls, setImageUrls] = useState({});
	const [updateHarvest, setUpdateHarvest] = useState(false);

	useEffect(() => {
		if (userLoggedIn) {
			console.log(userLoggedIn)
			fetch(backendURL + `/getuserdetails?firebaseId=${uid}`)
				.then(response => response.json())
				.then(data => {
					// setRole(data.users.role)
					console.log(data)
					setRole(data.users[0].role)
					setUserName(data.users[0].name)
					setHarvests(data.farmersHarvests)
				})
		}
		// fetch(backendURL + `/getfarmerHarvests?firebaseId=${uid}`)
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		// setRole(data.users.role)
		// 		console.log(data.users[0].role)
		// 		setRole(data.users[0].role)
		// 	})
	}, [userLoggedIn])

	useEffect(() => {
		const fetchImageUrls = async () => {
			const urls = {};
			for (const harvest of harvests) {
				try {
					const imageUrl = await fetchImageUrl(harvest.uuid);
					urls[harvest.uuid] = imageUrl;
				} catch (error) {
					console.error(`Error fetching image URL for ${harvest.uuid}: `, error);
					urls[harvest.uuid] = null;
				}
			}
			setImageUrls(urls);
		};

		fetchImageUrls();
	}, [harvests]);

	const fetchImageUrl = async (imagename) => {
		try {
			const imageRef = ref(imageDB, `images/${imagename}`);
			const url = await getDownloadURL(imageRef);
			return url;
		} catch (error) {
			console.error('Error fetching image: ', error);
			return null;
		}
	};


	const deleteHarvest = async (uuid) => {
		if (window.confirm('Are you sure you want to delete this harvest?')) {
			try {
				// const imageName = harvests.find(harvest => harvest.uuid === uuid).imageName;
				const imageRef = ref(imageDB, `images/${uuid}`);
				const response = await deleteObject(imageRef);
				console.log('Image deleted:', response);
				const deleteResponse = await fetch(backendURL + `/deleteHarvest?uuid=${uuid}`, {
					method: 'delete',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (deleteResponse.ok) {
					setHarvests(harvests.filter(harvest => harvest.uuid !== uuid));
				}
			} catch (error) {
				console.error(`Error deleting harvest ${uuid}:`, error);
			}
		}
	};
	// const deleteHarvest = async (uuid) => {
	// 	if (window.confirm('Are you sure you want to delete this harvest?')) {
	// 		try {
	// 			const response = await fetch(backendURL + `/deleteHarvest?uuid=${uuid}`, {
	// 				method: 'delete',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 			});
	// 			if (response.ok) {
	// 				setHarvests(harvests.filter(harvest => harvest.uuid !== uuid));
	// 			}
	// 		} catch (error) {
	// 			console.error(`Error deleting harvest ${uuid}:`, error);
	// 		}
	// 	}
	// };

	function dateDiff(dateString) {
		const futureDate = new Date(dateString);
		const today = new Date();

		const diffTime = futureDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return diffDays;
	}

	// const updateHarvest = (harvest) => {
	// 	navigate('/updateharvest', { state: harvest });
	// };

	// const showUpdateHarvest = (harvest) => {
	// 	return (
	// 		// <UpdateHarvest
	// 		// 	harvest={harvest}
	// 		// 	// deleteHarvest={deleteHarvest}
	// 		// 	// updateHarvest={updateHarvest}
	// 		// />
	// 		<Loader/>
	// 	);
	// };

	// if (updateHarvest) {
	// 	return <UpdateHarvest harvest={harvest} />;
	// }





	return (
		<div>
			<Navbar />

			{!userLoggedIn ?
				<Navigate to={'/login'} replace={true} />
				:
				<>
					{/* {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}
					{uid} <br />
					{name} <br />
					{role} <br />
					{harvests.map((harvest) => (
						<div key={harvest._id}>
							{harvest.cropName} <br />
							{harvest.harvestOwner} <br />
							{harvest.location} <br />
							{harvest.contactNumber} <br />
							{harvest.listedOn} <br />
						</div>
					))}
					Hello<br />
					<button onClick={() => { doSignOut().then(() => { navigate('/') }) }}>logout</button> */}
					<button className='profileCreateHarvests' onClick={() => { navigate('/createharvest') }}>+ Add Harvest</button>
					<div className='profileCont'>
						<div className='profileUserCont'>
							<div className='profileUserDetailsCont'>
								<div className='profileImgCont'>
									{/* <img alt='profileImg' className='profileImg' /> */}
								</div>
								<h3 className='profileName'>
									<p className='profileText'>Welcome,</p>{name}
									{/* <p>{currentUser.email}</p> */}
								</h3>
								<div className='updateInfoCont'>
									<button className='profileUpdateInfo' onClick={() => { navigate(`/updateprofile/${currentUser.uid}`) }}><FontAwesomeIcon icon={faPenToSquare} /></button>
								</div>
							</div>
							<div className='profileDivider'></div>
							<div className='profilecurrentWeatherCont'>
								<p>Current Location Weather Information here</p>
							</div>
						</div>
						<div className='profileDivider'></div>
						{/* <div className='profileHarvestsCont'> */}
						{
							harvests.length > 0 ?
								<>
									{/* <p className='profileText upcoming'>Upcoming Harvests</p> */}
									{
										harvests.map((harvest) => (
											<div key={harvest._id} className='profileHarvestCard'>
												<div className='profileHarvestTopCont'>
													<div className='profileHarvestImgCont'>
														<img alt='profileImg' className='profileHarvestImg' src={imageUrls[harvest.uuid]} />
													</div>
													<div className='profileHarvestDetailsCont'>
														{harvest.cropName} <br />
														{harvest.harvestOwner} <br />
														{harvest.location} <br />
														{harvest.contactNumber} <br />
														{/* {harvest.listedOn} <br /> */}
														{dateDiff(harvest.expectedHarvestDate)} Days
													</div>
												</div>
												<div className='profileHarvestBottomCont'>
													<button className='harvestDelete harvestBtn' onClick={() => { deleteHarvest(harvest.uuid) }}>Delete</button>
													<button className='harvestUpdate harvestBtn' onClick={() => navigate(`/updateharvest/${harvest.uuid}`)} >
														Update
													</button>
												</div>
												{/* {showUpdateHarvest && <UpdateHarvest harvest={harvests[harvests.length - 1]} setShowUpdateHarvest={setShowUpdateHarvest} />} */}
											</div>
										))
									}
								</>

								:

								<p className='profileText'>No Harvests Listed</p>
						}
						{/* </div> */}
					</div>
					{/* </div> */}
					<button onClick={() => { doSignOut().then(() => { navigate('/') }) }}>logout</button>
				</>
			}
		</div >
	)
}

export default Profile