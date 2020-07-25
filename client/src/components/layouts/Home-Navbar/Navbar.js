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
        <BuildOutlined /> Jummah Connections
      </Link>
      <div>
        <Link to='/howto' className={navigation('/howto')}>
          How To
        </Link>
        <Link to='/contact' className={navigation('/contact')}>
          Contact
        </Link>
        <Link to='/sign-in'>
          <button style={{ marginLeft: '3rem' }} className='btn l-spacing' type='primary'>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
