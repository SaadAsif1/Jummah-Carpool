import React from "react";
import HomeNavbar from "../../layouts/Home-Navbar/Navbar";
import "./HowTo.css";

const About = () => {
  return (
    <div className="home-container">
      <HomeNavbar />
      <div className="about-container">
        <p>How to use Jummah Carpooling</p>
        <div className="video-container">
          <div>
            <iframe
              width="850"
              height="543"
              src="https://www.youtube.com/embed/za2I-fRi5D8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
