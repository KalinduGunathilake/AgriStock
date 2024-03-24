import React, { useEffect } from "react";
import Navbar from "../Components/navbar";
import "../Styles/home.css";
import "../Styles/App.css";
import HeroImg from "../Images/Asset 11.png";
import Footer from "../Components/footer";
import { doSignOut } from "../Firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../Context/AuthContext/authContext";
import Loader from "../Components/Loader";

const Home = () => {

  // document.onload = function() {
    // Code to execute when the entire document has loaded
    // console.log('Document loaded');
    document.body.style.overflow = 'auto';
    // console.log(AuthProvider.userLoggedIn);
    // console.log(useAuth());
  // };
  useEffect(() => {
    // document.body.style.overflow = 'auto';
    setTimeout(() => {
      // navigate("/loader");
      <Loader />
    }, 3000);

  }, []);

  const navigate = useNavigate();
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
