import React from 'react';
import { isAuth, signout } from '../../../helpers/auth';

const JummahNavbar = () => {
  // Signout
  const handleSignOut = () => {
    signout(() => {
      history.push('/');
    });
  };

  return (
    <div>
      {isAuth() ? (
        <div>
          <button
            onClick={handleSignOut}
            className='btn'
            style={{
              padding: '0.5rem 2rem',
              fontSize: '1.3rem',
              marginTop: '2rem',
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleSignOut}
            className='jummah-options-btn animated bounceInRight'
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default JummahNavbar;
