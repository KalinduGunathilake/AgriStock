import React, { useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import backendURL from '../Config/backendURL'
import '../Styles/harvestDetails.css'

import Details from '../Components/Details'
import { useParams } from 'react-router-dom';
function HarvestDetails() {

	// const { cropName } = props.match.params;
	const { harvestID } = useParams();
	const [harvestDetails, setHarvestDetails] = useState([]);

	useEffect(() => {
		document.body.style.overflow = 'auto';
		fetch(backendURL +'/getharvestdetails?harvestID=' + harvestID)
			.then(response => response.json())
			.then(data => {
				if (Array.isArray(data.harvestDetails)) {
					setHarvestDetails(data.harvestDetails[0]); // Accessing the 'crop' array from the response
					// showCrops();
					console.log("Data Received successfully");
					console.log(data.harvestDetails)
				} else {
					console.error('Invalid data format:', data);
				}
			})
			.catch(error => console.log('Error fetching crops:', error));
	}, []);

	function dateDiff(dateString) {
		const futureDate = new Date(dateString);
		const today = new Date();

		const diffTime = futureDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return diffDays;
	}

	const showCrops = () => {
		if (harvestDetails.length > 0) {
			console.log(harvestDetails);
		} else {
			console.log('No crops available');

		}
	}

	showCrops();
	return (

		<div>
			<Navbar />
			<div className='harvestDetailsCont'>
				<div className='priorityIcon'>Priority</div>
				<div className='harvestDetailsLeftCont'>
					<img className='harvestDetailsImg' src={harvestDetails.image} />
					<div className='harvestDetailsLeftBottomCont'>
						<div className='harvestDetailsLeftBottomLeftCont'>
							<h3 className='harvestDetailsOwner'>{harvestDetails.harvestOwner}</h3>
							<p className='harvestDetailsLocation'>{harvestDetails.location}</p>
							<p className='harvestDetailsContact'>{harvestDetails.contactNumber}</p>
						</div>
						<div className={dateDiff(harvestDetails.expectedHarvestDate) < 5 ? 'harvestDetailsLeftBottomRightCont redText' : 'harvestDetailsLeftBottomRightCont'}>
							<p className='harvestDetailsExpireText'>Expires in</p>
							<p className='harvestDetailsExpireDate'>{dateDiff(harvestDetails.expectedHarvestDate) } Days</p>
						</div>
					</div>
				</div>
				<div className='harvestDetailsRightCont'>

				</div>
			</div>
		</div>
	)
}

export default HarvestDetails
