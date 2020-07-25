import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

// Import Routes
import Home from './components/pages/Home/Home';
import HowTo from './components/pages/HowTo/HowTo';
import Contact from './components/pages/Contact/Contact';
import TermsConditions from './components/pages/Terms-Conditions/TermsConditions';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import Activate from './components/auth/Activate';
import ResetPassword from './components/auth/ResetPassword';

// Private Routes
import UserRoute from './UserRoute';

// Jummah Routes
import JummaOptions from './components/pages/Jummah-Routes/JummahOptions';
import JummaAddress from './components/pages/Jummah-Routes/JummahAddress';
import JummaMap from './components/pages/Jummah-Routes/Jummah-Map/JummahMap';
import RegisterDriver from './components/pages/Jummah-Routes/RejisterDriver';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/howto' component={HowTo} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/terms-conditions' component={TermsConditions} />
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/auth/password/reset/:token' component={ResetPassword} />
        <Route exact path='/auth/activate/:token' component={Activate} />
        <Route exact path='/jummah-options' component={JummaOptions} />
        <Route exact path='/jummah-address' component={JummaAddress} />
        <Route exact path='/jummah-map' component={JummaMap} />
        <Route exact path='/register-driver' component={RegisterDriver} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
