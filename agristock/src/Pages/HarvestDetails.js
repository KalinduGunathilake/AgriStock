import React, { useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import backendURL from '../Config/backendURL'
import '../Styles/harvestDetails.css'

import Details from '../Components/Details'
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage'
import { imageDB } from '../Firebase/config'
function HarvestDetails() {

	// const { cropName } = props.match.params;
	const { harvestID } = useParams();
	const [harvestDetails, setHarvestDetails] = useState([]);
	const [imageUrl, setImageUrl] = useState(null);
	const [imageName, setImageName] = useState('');
	const [pricePerKg, setPricePerKg] = useState(0);

	useEffect(() => {
		document.body.style.overflow = 'auto';
		fetch(backendURL + '/getharvestdetails?harvestID=' + harvestID)
			.then(response => response.json())
			.then(data => {
				if (Array.isArray(data.harvestDetails)) {
					setHarvestDetails(data.harvestDetails[0]); // Accessing the 'crop' array from the response
					// showCrops();
					setPricePerKg(data.harvestDetails[0].pricePerKg.$numberDecimal);
					setImageName(data.harvestDetails[0].uuid);
					console.log(data.harvestDetails[0].uuid)
					console.log("Data Received successfully");
					console.log(data.harvestDetails)
				} else {
					console.error('Invalid data format:', data);
				}
			})
			// .then(() => fetchImageUrl())
			.catch(error => console.log('Error fetching crops:', error));
	}, []);

	// useEffect(() => {
	// 	const fetchImageUrl = async () => {
	// 		try {
	// 			const imageRef = ref(imageDB, `images/${harvestDetails.uuid}`);
	// 			const url = await getDownloadURL(imageRef);
	// 			setImageUrl(url);
	// 		} catch (error) {
	// 			console.error('Error fetching image: ', error);
	// 		}
	// 	};

	// 	// fetchImageUrl();
	// }, [harvestDetails.uuid]);


	// useEffect(() => {
	// 	if(harvestDetails.pricePerKg !== null) {

	// 		setPricePerKg(harvestDetails.pricePerKg.$numberDecimal);
	// 	}
	// }, [harvestDetails.pricePerKg.$numberDecimal]);
	useEffect(() => {


		// const extensionsToTry = ['.png', '.jpg', '.jpeg'];
		// let foundImageUrl = null;

		// for (const extension of extensionsToTry) {
		// 	try {
		// 		const imageRef = ref(imageDB, `images/${harvestDetails.uuid}${extension}`);
		// 		const url = await getDownloadURL(imageRef);
		// 		foundImageUrl = url;
		// 		break; // Stop trying if image is found
		// 	} catch (error) {
		// 		console.error(`Error fetching image with ${extension} extension: `, error);
		// 	}
		// }
		const fetchImageUrl = async () => {
			console.log("entered function")
			try {
				const imageRef = ref(imageDB, `images/${imageName}`);
				const url = await getDownloadURL(imageRef);
				setImageUrl(url);
				console.log("Image Url :" + url)
			} catch (error) {
				console.error('Error fetching image: ', error);
			}
		};

		fetchImageUrl();
	}, [imageName]);

	function dateDiff(dateString) {
		const futureDate = new Date(dateString);
		const today = new Date();

		const diffTime = futureDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return diffDays;
	}

	const showCrops = () => {
		console.log(harvestID);
		// if (harvestDetails.length > 0) {
		// } else {
		// 	console.log('No crops available');

		// }
	}

	// showCrops();
	return (

		<div>
			<Navbar />
			<div className='harvestDetailsCont'>
				<div className='priorityIcon'>Priority</div>
				<div className='harvestDetailsLeftCont'>
					{/* <img className='harvestDetailsImg' src={imageUrl} /> */}
					{imageUrl ? (
						<img src={imageUrl} alt="Harvest" />
					) : (
						<p>Loading image...</p>
					)}

				</div>
				<div className='harvestDetailsRightCont'>
					<h3 className='harvestDetailsCropName'>{harvestDetails.cropName}</h3>
					<div className='harvestDetailsRightMiddleCont'>
						<div className='harvestDetailsRightMiddleLeftCont'>
							<h3 className='harvestDetailsOwner'>{harvestDetails.harvestOwner}</h3>
							<p className='harvestDetailsLocation'>{harvestDetails.location}</p>
							<p className='harvestDetailsContact'>{harvestDetails.contactNumber}</p>
						</div>
						<div className={dateDiff(harvestDetails.expectedHarvestDate) < 5 ? 'harvestDetailsRightMiddleRightCont redText' : 'harvestDetailsRightMiddleRightCont'}>
							<p className='harvestDetailsExpireText'>Expires in</p>
							<p className='harvestDetailsExpireDate'>{dateDiff(harvestDetails.expectedHarvestDate)} Days</p>
						</div>
					</div>
					<div className='harvestDetailsRightBottomCont'>
						<p>Listed On : {new Date(harvestDetails.listedOn).toLocaleDateString('en-GB')}</p>
						<p>{dateDiff(harvestDetails.expectedHarvestDate) > 0 ?"Expected Harvest Date": "Harvested On"} : {new Date(harvestDetails.expectedHarvestDate).toLocaleDateString('en-GB')}</p>
						<p>Quantity Available : {harvestDetails.expectedQuantity}kg</p>
						<p>Price per kg : Rs. {pricePerKg}</p>
					</div>
					<div className='harvestDetailsRightContactBtnCont'>
						<a href={`tel:${harvestDetails.contactNumber}`}>
							<button className='contactFarmerBtn'>Contact Farmer</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HarvestDetails
