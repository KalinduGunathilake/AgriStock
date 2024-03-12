import React, { useEffect, useState } from "react";
import '../Styles/cropinfo.css';
import carrotImage from "../Images/CropImages/Carrot.png";
import potatoImage from "../Images/CropImages/Potato.png";
import onionImage from "../Images/CropImages/Onion.png";
import tomatoImage from "../Images/CropImages/Tomato.png";
import brinjalImage from "../Images/CropImages/Brinjal.png";
import chillyPepperImage from "../Images/CropImages/Chilly Pepper.png";
import cucumberImage from "../Images/CropImages/Cucumber.png";
import cornImage from "../Images/CropImages/Corn.png";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { Link, NavLink } from "react-router-dom";
import backendURL from "../Config/backendURL";


const Cropinfor = () => {

  const [crops, setCrops] = useState([]);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    fetch(backendURL +'/getcrops')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.crop)) {
          setCrops(data.crop); // Accessing the 'crop' array from the response
          // showCrops();
        } else {
          console.error('Invalid data format:', data);
        }})
      .catch(error => console.log('Error fetching crops:', error));
  }, []);

  const showCrops = () => {
    if (crops.length > 0) {
      console.log(crops);
    }else {
      console.log('No crops available');

  }}

  // const showcrops

  const imageMap = {
    "Carrot": carrotImage,
    "Potato": potatoImage,
    "Onion": onionImage,
    "Tomato": tomatoImage,
    "Brinjal": brinjalImage,
    "Chilly Pepper": chillyPepperImage,
    "Cucumber": cucumberImage,
    "Corn": cornImage,
  };

  // showCrops();

  return (
    
    // showCrops());

    <div>

      <Navbar />
      <div className="cropsCont">

        <div className="cropCard">
          {crops.map((crop) => (
            <NavLink component={Link}  to={`/stocks/${crop.CropName}`} key={crop.id} className="cropItem">
              <img src={imageMap[crop.CropName]} alt={crop.CropName} />
              <p>{crop.CropName}</p>
            </NavLink>
          ))}
        </div>
      </div>
      
      {/* <Footer/> */}
    </div>
    
  )
}
export default Cropinfor;
