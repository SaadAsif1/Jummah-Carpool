import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  YuqueFilled,
  HomeOutlined,
  SlidersOutlined,
  SettingOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { signout, isAuth } from '../../../helpers/auth';
import './MasjidNavbar.css';

const MasjidNavbar = ({ history, children }) => {
  // Signout
  const handleSignOut = () => {
    signout(() => {
      history.push('/');
    });
  };

  // hightlight navabr
  const activeLink = (Link) => {
    if (history.location.pathname === Link) {
      return {
        backgroundColor: 'rgb(75, 91, 121)',
      };
    }
  };

  useEffect(() => {
    document.body.style.background = 'white';

    return () => {
      // Anything in here is fired on component unmount.
      document.body.style.background = '#22313f';
    };
  }, []);

  return (
    <div>
      <div className='admin-navbar-container'>
        <div className='admin-navbar-title-container'>
          <h2 className='admin-title-navbar'>{isAuth().name}</h2>
        </div>

        <div className='admin-navbar-links-container'>
          <Link
            style={activeLink('/masjid-home')}
            to='/masjid-home'
            className='admin-nav-link'
          >
            <span className='admin-nav-icon'>
              <HomeOutlined />
            </span>
            Home
          </Link>
          {/* <Link style={activeLink('/explore')} to='/explore' className='admin-nav-link'>
            <span className='admin-nav-icon'>
              <SlidersOutlined />
            </span>
            Explore
          </Link> */}
          <Link
            style={activeLink('/masjid-settings')}
            to='/masjid-settings'
            className='admin-nav-link'
          >
            <span className='admin-nav-icon'>
              <SettingOutlined />
            </span>
            Settings
          </Link>
          <span onClick={handleSignOut} className='admin-nav-link'>
            <span className='admin-nav-icon'>
              <ExportOutlined />
            </span>
            Sign Out
          </span>
        </div>
        <Link
          to='/admin/home'
          style={{ color: 'white' }}
          className='align-center admin-navbar-title'
        >
          <YuqueFilled /> Jummah
        </Link>
      </div>
      <div className='admin-container-body'>{children}</div>
    </div>
  );
};

export default withRouter(MasjidNavbar);
