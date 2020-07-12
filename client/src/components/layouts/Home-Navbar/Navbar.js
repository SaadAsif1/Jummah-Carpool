import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BuildOutlined } from '@ant-design/icons';
import './Navbar.css';

const Navbar = ({ history }) => {
  const navigation = (path) => {
    if (path === history.location.pathname) {
      return 'home-nav-link l-spacing middle middle-visable';
    } else {
      return 'home-nav-link l-spacing middle ';
    }
  };

  return (
    <div className='home-nav flex-center'>
      <Link to='/' className='home-log'>
        <BuildOutlined /> Jummah
      </Link>
      <div>
        <Link to='/about' className={navigation('/about')}>
          About
        </Link>
        <Link to='/team' className={navigation('/team')}>
          Meet The Team
        </Link>
        <Link to='/contact' className={navigation('/contact')}>
          Contact
        </Link>
        <Link to='/register-masjid'>
          <button style={{ marginLeft: '3rem' }} className='btn l-spacing' type='primary'>
            Register Masjid
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
