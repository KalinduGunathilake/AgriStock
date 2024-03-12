import React, { useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import "../Styles/harvestsAvailable.css"
import carrotImage from "../Images/CropImages/Carrot.png";
import { Link, useParams } from 'react-router-dom';
import backendURL from '../Config/backendURL';

const HarvestsAvailable = () => {

	const { cropName } = useParams(); 
	const [harvests, setHarvests] = useState([]);
	useEffect(() => {
		const fetchHarvests = async () => {
			try {
				const response = await fetch(backendURL + `/getharvests?cropName=${cropName}`);
				if (!response.ok) {
					throw new Error('Failed to fetch harvests');
				}
				const data = await response.json();
				setHarvests(data.harvests);
			} catch (error) {
				console.error(error);
			}
		};

		fetchHarvests();
	}, [cropName]);


	const showHarvests = () => {
		if (harvests.length > 0) {
			console.log(harvests);
		} else {
			console.log('No harvests available');
		}
	}


	showHarvests();

	// function formatDate(dateString) {
	// 	const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
	// 	  year: 'numeric',
	// 	  month: 'long',
	// 	  day: 'numeric',
	// 	});
	// 	return formattedDate;
	//   }
	function dateDiff(dateString) {
		const futureDate = new Date(dateString);
		const today = new Date();

		const diffTime = futureDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		// const formattedDate = futureDate.toLocaleDateString('en-US', {
		// 	year: 'numeric',
		// 	month: 'long',
		// 	day: 'numeric',
		// });

		return diffDays;
	}

	return (
		<div>
			<Navbar />
			<div >
				{harvests.length > 0 ? (
					<div className='harvestsCont'>
						{harvests.map((harvest) => (
							<div className='harvestCard' key={harvest._id}>
								<div className={dateDiff(harvest.expectedHarvestDate) < 5 ? 'priorityIcon redText' : 'priorityIcon'}>Priority!</div>
								<img className='harvestImage' src={carrotImage}></img>
								<div className='harvestInfo'>
									<h3 className='harvestLocation'>{harvest.location}</h3>
									<div className={dateDiff(harvest.expectedHarvestDate) < 5 ? 'harvestDate redText' : 'harvestDate'}>
										<p className='harvestDateText'>Expires in</p>
										<p className='harvestDateNum'>{dateDiff(harvest.expectedHarvestDate) } days</p>
									</div>
									{/* <h3>{harvest.name}</h3> */}
									<Link to={`/stocks/${cropName}/${harvest._id}`} className='moreInfoBtn'>More Info</Link>
								</div>
							</div>
						))}
					</div>
				) : (
					<p>No harvests available</p>
				)}
			</div>
		</div>
	)
}

export default HarvestsAvailable