import React from 'react';
import NavbarLanding from './layout/NavbarLanding';
import SideNavBar from './layout/SideNavBar';
import LandingSection1 from './layout/LandingSection1';
import LandingSection2 from './layout/LandingSection2';
import LandingSection3 from './layout/LandingSection3';

const LandingPage = () => {
  return (
    <div>
      <NavbarLanding />
      <SideNavBar />
      <LandingSection1 />
      <LandingSection2 />
      <LandingSection3 />
    </div>
  );
};

export default LandingPage;
