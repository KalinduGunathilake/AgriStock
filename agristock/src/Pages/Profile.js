import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext/authContext'
import { Navigate, useNavigate } from 'react-router-dom';
import backendURL from '../Config/backendURL'
import Navbar from '../Components/navbar';
import { doSignOut } from '../Firebase/auth';
import '../Styles/profile.css'

const Profile = () => {

	const { userLoggedIn } = useAuth();
	const { currentUser } = useAuth()
	const uid = currentUser ? currentUser.uid : ''
	// const name = currentUser ? currentUser.displayName : ''
	const [name , setUserName] = useState('');
	const [role, setRole] = useState('');
	const [harvests, setHarvests] = useState([]);
	const navigate = useNavigate();

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
					<div className='profileCont'>
						<div className='profileUserCont'>
							<div className='profileUserDetailsCont'>
								<div className='profileImgCont'>
									{/* <img alt='profileImg' className='profileImg' /> */}
								</div>
								<h3 className='profileName'><p className='profileText'>Welcome,</p>{name}</h3>
							</div>
							<div className='profileDivider'></div>
							<div className='profilecurrentWeatherCont'>
								<p>Current Location Weather Information here</p>
							</div>
						</div>
						<div className='profileHarvestsCont'>
						<div className='profileDivider'></div>
							<p className='profileText'>Upcoming Harvests</p>
							{harvests.map((harvest) => (
								<div key={harvest._id} className='profileHarvestCard'>
									{harvest.cropName} <br />
									{harvest.harvestOwner} <br />
									{harvest.location} <br />
									{harvest.contactNumber} <br />
									{harvest.listedOn} <br />
								</div>
							))}
						</div>
						<button className='profileCreateHarvests' onClick={() => { navigate('/createharvest') }}>Create Harvest</button>
					</div>
					<button onClick={() => { doSignOut().then(() => { navigate('/') }) }}>logout</button>
				</>
			}
		</div>
	)
}

export default Profile