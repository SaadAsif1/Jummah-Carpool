import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { CarOutlined, SmileOutlined } from '@ant-design/icons';
import { isAuth } from '../../../helpers/auth';
import './Jummah.css';

const JummahOptions = ({ history }) => {
  // useEffect(() => {
  //   document.body.style.background = 'white';

  //   return () => {
  //     document.body.style.background = '#22313f';
  //   };
  // }, []);

  // Check is logged in user
  const checkAuth = () => {
    if (isAuth()) {
      history.push('/register-driver');
    } else {
      history.push('/sign-up');
    }
  };

  return (
    <div className='jummah-options-container'>
      <div>
        <h1 className='jummah-options-title l-spacing animated bounceInDown'>
          Please Choose Ride Type
        </h1>
        <Link to='/jummah-address'>
          <button className='jummah-options-btn animated bounceInLeft'>
            <SmileOutlined /> Rider
          </button>
        </Link>
        <button onClick={checkAuth} className='jummah-options-btn animated bounceInRight'>
          <CarOutlined /> Driver
        </button>
      </div>
    </div>
  );
};

export default withRouter(JummahOptions);
