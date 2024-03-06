import React from "react";
import '../Styles/cropinfo.css';
import carrotImage from  '../Images/carrot.jpg';
import potatoImage from  '../Images/Potato.jpg';
import onionImage from  '../Images/Onion.jpg';
import tomatoImage from  '../Images/Tomato.jpg';
import brinjalImage from  '../Images/Brinjal.jpg';
import chillyPepperImage from  '../Images/Chilly Pepper.jpg';
import cucumberImage from  '../Images/Cucumber.jpg';
import cornImage from  '../Images/Corn.jpg';
const Cropinfor = () => {
  return (
    <div>
      <input type="text" placeholder="Select Crop" className="search_bar" />
      <div className="outer_container">
        <div className="image-grid">
          <div className="row">
            <div className="inner_container">
              <img src={carrotImage} alt="Carrot" />
              <div>Carrot</div>
            </div>  
            <div className="inner_container">
              <img src={potatoImage} alt="Potato" />
              <div>Potato</div>
            </div>
            <div className="inner_container">
              <img src={onionImage} alt="Onion" />
              <div>Onion</div>
            </div>
            <div className="inner_container">
              <img src={tomatoImage} alt="Tomato" />
              <div>Tomato</div>
            </div>
          </div>
          <div className="row">
            <div className="inner_container">
              <img src={brinjalImage} alt="Brinjal" />
              <div>Brinjal</div>
            </div>
            <div className="inner_container">
              <img src={chillyPepperImage} alt="Chilly pepper" />
              <div>Chilly pepper</div>
            </div>
            <div className="inner_container">
              <img src={cucumberImage} alt="Cucumber" />
              <div>Cucumber</div>
            </div>
            <div className="inner_container">
              <img src={cornImage} alt="Corn" />
              <div>Corn</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cropinfor;
