import React from 'react';
import { withRouter } from 'react-router-dom';
import { signout } from '../../../helpers/auth';

const User = ({ history }) => {
  // Signout
  const handleSignOut = () => {
    signout(() => {
      history.push('/');
    });
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>USER ROUTE</h1>

      <br />
      <button className='btn' onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default withRouter(User);
