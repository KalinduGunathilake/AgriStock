import React from "react";
import Navbar from "../Components/navbar";
import "../Styles/home.css";
import "../Styles/App.css";
import HeroImg from "../Images/Asset 11.png";
import Footer from "../Components/footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="heroCont">
        <div className="heroContext">
          Bringing<br/> Independent <br/> Farmers into the<br/>  Marketplace
        </div>
        <div className="heroImgCont">
          <img src={HeroImg} className="heroImg" alt="heroImg"  />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
