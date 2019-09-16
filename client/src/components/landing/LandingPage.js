import React, { useContext } from 'react';
import NavbarLanding from './NavbarLanding';
import SideNavBar from './SideNavBar';
import LandingSection1 from './LandingSection1';
import LandingSection2 from './LandingSection2';
import LandingSection3 from './LandingSection3';
import { Route } from 'react-router-dom';
import GitApp from '../github/content/GitApp';

import LoginPage from './LoginPage';

import AuthContext from '../../Context/Authentication/authContext';

const LandingPage = () => {
  const authContext = useContext(AuthContext);

  const { nav_login_btn_clicked } = authContext;

  return (
    <div>
      {nav_login_btn_clicked ? (
        <LoginPage />
      ) : (
        <div>
          <NavbarLanding />
          <SideNavBar />
          <LandingSection1 />
          <LandingSection2 />
          <LandingSection3 />
        </div>
      )}

      {/* <Route exact path='/gitapp' component={GitApp} /> */}
    </div>
  );
};

export default LandingPage;
