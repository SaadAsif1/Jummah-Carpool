import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

// Import Routes
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import Team from './components/pages/Team/Team';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import Activate from './components/auth/Activate';
import ResetPassword from './components/auth/ResetPassword';
import RegisterMasjid from './components/auth/RegisterMasjid';

// Private Routes
import MasjidRoute from './MasjidRoute';
import UserRoute from './UserRoute';

// User Routes
import UserHome from './components/pages/User-Home/User';

// Masjid Routes
import MasjidHome from './components/pages/Masjid-Home/Masjid';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/team' component={Team} />
        <Route exact path='/register-masjid' component={RegisterMasjid} />
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/auth/password/reset/:token' component={ResetPassword} />
        <Route exact path='/auth/activate/:token' component={Activate} />

        <MasjidRoute exact path='/masjid-home' component={MasjidHome} />
        <UserRoute exact path='/user-home' component={UserHome} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
