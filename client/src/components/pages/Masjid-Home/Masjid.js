import React from 'react';
import { withRouter } from 'react-router-dom';
import { signout } from '../../../helpers/auth';

const Masjid = ({ history }) => {
  // Signout
  const handleSignOut = () => {
    signout(() => {
      history.push('/');
    });
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Masjid Route</h1>

      <br />
      <button className='btn' onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default withRouter(Masjid);
