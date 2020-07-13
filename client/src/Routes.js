import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

// Import Routes
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import Team from './components/pages/Team/Team';
import TermsConditions from './components/pages/Terms-Conditions/TermsConditions';
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
import UserHome from './components/pages/User-Routes/User-Home/User';

// Masjid Routes
import MasjidInfoForm from './components/pages/Masjid-Routes/MasjidInfoForm';
import MasjidHome from './components/pages/Masjid-Routes/MasjidHome';
import MasjidSettings from './components/pages/Masjid-Routes/MasjidSettings';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/team' component={Team} />
        <Route exact path='/terms-conditions' component={TermsConditions} />
        <Route exact path='/register-masjid' component={RegisterMasjid} />
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/auth/password/reset/:token' component={ResetPassword} />
        <Route exact path='/auth/activate/:token' component={Activate} />

        {/* Masjid Routes */}
        <MasjidRoute exact path='/masjid-info-form' component={MasjidInfoForm} />
        <MasjidRoute exact path='/masjid-home' component={MasjidHome} />
        <MasjidRoute exact path='/masjid-settings' component={MasjidSettings} />

        <UserRoute exact path='/user-home' component={UserHome} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
