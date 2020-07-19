import React from "react";
import { Link } from "react-router-dom";
import HomeNavbar from "../../layouts/Home-Navbar/Navbar";
import Product from "../../../assets/product.svg";
import "./Home.css";

const Home = () => {
  return (
    <div className='home-background'>
      <div className='home-container'>
        <HomeNavbar />

        <div className='home-landing-container'>
          <div className='home-landing-left animated slideInLeft align-center'>
            <h1 className='home-main-text'>Jummah Connections</h1>
            <div className='home-sub-text'>
              Jummah carpooling website. Map feature to see what mosque is near. Connect
              with others etc
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

export default Home;
