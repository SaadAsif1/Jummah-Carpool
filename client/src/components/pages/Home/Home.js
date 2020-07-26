import React from "react";
import { Link } from "react-router-dom";
import HomeNavbar from "../../layouts/Home-Navbar/Navbar";
import Product from "../../../assets/product.svg";
import Saad from '../../../assets/Saad.png';
import Umer from '../../../assets/Umer.jpg';
import Abdullah from '../../../assets/Abdalla.jpg';
import Mubariz from '../../../assets/Mubariz.jpg';

import "./Home.css";
import "./fonts/font-awesome.min.css"

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
          <div className='link-container'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/saad-asif-7268851a8/'
              className='team-links'
            >
              <i class="fa fa-linkedin"></i>
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/SaadAsif1'
              className='team-links'
            >
              <i class="fa fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      <div className='team-card '>
        <img src={Mubariz} alt='Mubariz' className='team-img' />
        <div className='team-dec-container'>
          <div className='team-role'>Front End Developer</div>
          <div className='team-name'>Mubariz Afzal</div>
          <div className='link-container'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/mubarizafzal/'
              className='team-links'
            >
              <i class="fa fa-linkedin"></i>
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/mubarizafzal'
              className='team-links'
            >
              <i class="fa fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      <div className='team-card'>
        <img src={Umer} alt='Umer' className='team-img' />
        <div className='team-dec-container'>
          <div className='team-role'>Front End Developer</div>
          <div className='team-name'>Umer Pittal</div>
          <div className='link-container'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/umer-pittal-a523a9149/'
              className='team-links'
            >
              <i class="fa fa-linkedin"></i>
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/umerp'
              className='team-links'
            >
              <i class="fa fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      <div className='team-card'>
        <img src={Abdullah} alt='Abdullah' className='team-img' />
        <div className='team-dec-container'>
          <div className='team-role'>Front End Developer</div>
          <div className='team-name'>Abdalla Atalla</div>
          <div className='link-container'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='http://linkedin.com/in/abdalla-atalla-300616173'
              className='team-links'
            >
              <i class="fa fa-linkedin"></i>
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/abdalla-atalla'
              className='team-links'
            >
              <i class="fa fa-github"></i>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const OurMission = () => {
  return (
    <div className="mission-container">
      <div className="h" >
      </div>
      <div className='mission-title-container'>
        <h2 className='team-title'>Our Mission</h2>
      </div>
      <div className="bismillah"> بسم الله الرحمن الرحيم</div>
      <div className="mission-para">
        Seeing the issues faced by Muslims on their commute to Jummah, we 
        came together to help the people find and share rides to their local Jummah. 
      </div>
      <div className="mission-para">
        Often we find ourselvse in close proximity with other Jummah-goers, but we're unable to pool a ride together.
        Some of us cannot find a ride, and the parking issues that take place at our Masjids are well-known.
      </div>
      <div className="mission-para">
        Jummah Connections is aimed to provide a platform for drivers to earn the reward of helping their
         fellow Muslims fulfill their Jummah obligation, and for riders to discover trips in their locality
         in an online, simple and intuitive way, all while reducing CO2 emissions.
      </div>
      <div className="mission-para">
      Our inspiration came from our religion which teaches us the importance of Jummah and to take care of our plnaet. 
      As stated in this Hadith: "The world is beautiful and verdant, and verily God, be He exalted, has made you His stewards
       in it, and He sees how you acquit yourselves.” (Muslim)
      </div>
    </div>
  );
};

const Home = () => {
  return (
      <div>
        <Front />
        <OurMission />
        <OurTeam />
      </div>
  );
};

export default Home;
