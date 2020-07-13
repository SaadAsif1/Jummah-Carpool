import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import { signout, getCookie, isAuth } from '../../../helpers/auth';
import MasjidNavbar from '../../layouts/Masjid-Navbar/MasjidNavbar';
import './Masjid.css';

const MasjidHome = ({ history }) => {
  const [data, setData] = useState('');

  // Signout
  const handleSignOut = () => {
    signout(() => {
      history.push('/');
    });
  };

  useEffect(() => {
    // Get Token
    const token = getCookie('token');

    // Call Api to see if masjid filled out pre info
    axios
      .get(`/api/masjid/${isAuth()._id}`, {
        headers: {
          'auth-token': token,
        },
      })
      .then((response) => {
        setData(response.data.masjidProfile);
        console.log(response.data.masjidProfile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MasjidNavbar>
      {data ? (
        JSON.parse(data.setup) ? (
          <div>Masjid Home</div>
        ) : (
          <Redirect to='/masjid-info-form' />
        )
      ) : (
        <div></div>
      )}
    </MasjidNavbar>
  );
};

export default withRouter(MasjidHome);
