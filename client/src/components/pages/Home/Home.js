import React from "react";
import { Link } from "react-router-dom";
import HomeNavbar from "../../layouts/Home-Navbar/Navbar";
import Product from "../../../assets/product.svg";
import Saad from "../../../assets/Saad.png";
import Umer from "../../../assets/Umer.jpg";
import Abdullah from "../../../assets/Abdalla.jpg";
import Mubariz from "../../../assets/Mubariz.jpg";

import "./Home.css";

const Front = () => {
  return (
    <div className='home-background'>
      <div className='home-container'>
        <HomeNavbar />

        <div className='home-landing-container'>
          <div className='home-landing-left animated slideInLeft align-center'>
            <h1 className='home-main-text'>Jummah Carpooling</h1>
            <div className='home-sub-text'>
              A carpooling website for Muslims. Sign up to offer a ride for others, or use
              our interactive map to find a ride for your next jummah.
            </div>
            <div className='home-btn-container'>
              <Link to='/jummah-options'>
                <button
                  className='btn l-spacing home-btn'
                  style={{ padding: "0.5rem 2rem" }}
                  type='primary'
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className='home-landing-right animated slideInRight'>
            <img src={Product} className='home-img' alt='Product' />
          </div>
        </div>
      </div>
    </div>
  );
};

const OurTeam = () => {
  return (
    <div className='team-container'>
      <div className='team-title-container'>
        <h2 className='team-title'>Our Team</h2>
      </div>

      <div className='card-container'>
        <div className='team-card'>
          <img src={Saad} alt='Saad' className='team-img' />
          <div className='team-dec-container'>
            <div className='team-role'>Full Stack Developer</div>
            <div className='team-name'>Saad Asif</div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/saad-asif-7268851a8/'
              className='team-links'
            >
              linkedin.com/in/saad-asif
            </a>
          </div>
        </div>

        <div className='team-card '>
          <img src={Mubariz} alt='Mubariz' className='team-img' />
          <div className='team-dec-container'>
            <div className='team-role'>Front End Developer</div>
            <div className='team-name'>Mubariz Afzal</div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/mubarizafzal/'
              className='team-links'
            >
              linkedin.com/in/mubarizafzal
            </a>
          </div>
        </div>

        <div className='team-card'>
          <img src={Umer} alt='Umer' className='team-img' />
          <div className='team-dec-container'>
            <div className='team-role'>Front End Developer</div>
            <div className='team-name'>Umer Pittal</div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/umer-pittal-a523a9149/'
              className='team-links'
            >
              linkedin.com/in/umer-pittal
            </a>
          </div>
        </div>

        <div className='team-card'>
          <img src={Abdullah} alt='Abdullah' className='team-img' />
          <div className='team-dec-container'>
            <div className='team-role'>Front End Developer</div>
            <div className='team-name'>Abdalla Atalla</div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='http://linkedin.com/in/abdalla-atalla-300616173'
              className='team-links'
            >
              linkedin.com/in/abdalla-atalla
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurMission = () => {
  return <h1>todo</h1>;
};

const Home = () => {
  return (
    <div>
      <Front />
      <OurTeam />
    </div>
  );
};

export default Home;
