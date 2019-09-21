import React, { useContext } from 'react';
import NavbarLanding from './layout/NavbarLanding';
import SideNavBar from './layout/SideNavBar';
import LandingSection1 from './layout/LandingSection1';
import LandingSection2 from './layout/LandingSection2';
import LandingSection3 from './layout/LandingSection3';
// import { Route } from 'react-router-dom';
// import GitApp from '../github/content/GitApp';

import Login from '../auth/Login';

import AuthContext from '../../Context/Authentication/authContext';

const LandingPage = () => {
  const authContext = useContext(AuthContext);

  const { nav_login_btn_clicked } = authContext;

  return (
    <div>
      {nav_login_btn_clicked ? (
        <Login />
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
