import React, { useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import "../Styles/harvestsAvailable.css"
import carrotImage from "../Images/CropImages/Carrot.png";
import { Link, Navigate, useParams } from 'react-router-dom';
import backendURL from '../Config/backendURL';
import Loader from '../Components/Loader';
import { useAuth } from '../Context/AuthContext/authContext';
import { getDownloadURL, ref } from '@firebase/storage';
import { imageDB } from '../Firebase/config';

const HarvestsAvailable = () => {


	const [isLoading, setIsLoading] = useState(true);
	const { cropName } = useParams();
	const [harvests, setHarvests] = useState([]);
	const { userLoggedIn } = useAuth();
	const [imageUrls, setImageUrls] = useState({});
	useEffect(() => {
		const fetchHarvests = async () => {
			try {
				const response = await fetch(backendURL + `/getharvests?cropName=${cropName}`);
				if (!response.ok) {
					throw new Error('Failed to fetch harvests');
				}
				const data = await response.json();
				console.log(data.harvests);
				setHarvests(data.harvests);
			} catch (error) {
				console.error(error);
			}
		};

		fetchHarvests().then(() => {
			setIsLoading(false);
		});
	}, [cropName]);

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

	if (isLoading) {
		return <Loader />;
	}
	const showHarvests = () => {
		if (harvests.length > 0) {
			console.log(harvests);
		} else {
			console.log('No harvests available');
		}
	}



	// useEffect(() => {



	// }, [location]);

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



	// showHarvests();

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
								<img className='harvestImage' src={imageUrls[harvest.uuid]}></img>
								<div className='harvestInfo'>
									<h3 className='harvestLocation'>{harvest.location}</h3>
									<div className={dateDiff(harvest.expectedHarvestDate) < 5 ? 'harvestDate redText' : 'harvestDate'}>
										<p className='harvestDateText'>Expires in</p>
										<p className='harvestDateNum'>{dateDiff(harvest.expectedHarvestDate)} days</p>
									</div>
									{/* <h3>{harvest.name}</h3> */}
									<Link to={userLoggedIn ? `/stocks/${cropName}/${harvest._id}` : '/login'} className='moreInfoBtn'>More Details</Link>
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