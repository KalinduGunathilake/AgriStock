import React from "react";
import Navbar from "../Components/navbar";
import "../Styles/home.css";
import "../Styles/App.css";
import HeroImg from "../Images/Asset 11.png";
import Footer from "../Components/footer";
import { useAuth } from "../Context/AuthContext/authContext";

const Home = () => {

  // document.onload = function() {
    // Code to execute when the entire document has loaded
    // console.log('Document loaded');
    document.body.style.overflow = 'auto';
    console.log(1 + '1');
  // };
  const { currentUser } = useAuth()
  
  return (
    <div>
      <Navbar />
      <div className="heroCont">
        <div className="heroContext">
          Bringing<br/> Independent <br/> Farmers into the<br/>  Marketplace
          {/* Welcome {currentUser.displayName ? currentUser.displayName : currentUser.email} */}
        </div>
        <div className="heroImgCont">
          <img src={HeroImg} className="heroImg" alt="heroImg"  />
        </div>
        
      </div>
      <div className="additionalContent" >
          
        </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
