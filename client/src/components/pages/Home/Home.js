import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from '../../layouts/Home-Navbar/Navbar';
import Product from '../../../assets/product.svg';
import './Home.css';

const Home = () => {
  return (
    <div className='home-background'>
      <div className='home-container'>
        <HomeNavbar />

        <div className='home-landing-container'>
          <div className='home-landing-left animated slideInLeft'>
            <h1 className='home-main-text'>Jumma Connections</h1>
            <div className='home-sub-text'>
              Jummah carpooling website. Map feature to see what mosque is near. Connect
              with others etc
            </div>
            <div className='home-btn-container'>
              <Link to='sign-in'>
                <button
                  className='btn l-spacing home-btn'
                  style={{ padding: '0.5rem 2rem' }}
                  type='primary'
                >
                  Sign In
                </button>
              </Link>
              <Link to='sign-up'>
                <button
                  className='btn-inverted l-spacing home-btn'
                  style={{ padding: '0.4rem 2rem' }}
                  type='primary'
                >
                  Sign Up
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
