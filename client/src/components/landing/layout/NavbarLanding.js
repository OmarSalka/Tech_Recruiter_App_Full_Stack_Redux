import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';

import AuthContext from '../../../Context/Authentication/authContext';

const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeInDown}`};
`;

const NavbarLanding = ({ icon, platform }) => {
  const authContext = useContext(AuthContext);

  const { navLoginClicked } = authContext;

  const clickHandler = () => {
    navLoginClicked();
  };

  return (
    <div className='navbar navLanding'>
      <FadeIn>
        <h1 className='logo'>
          <i className={icon} /> {platform}
        </h1>
      </FadeIn>
      <ul>
        <li>
          <FadeIn>
            <LinkScroll
              activeClass='active'
              to='section1'
              spy={true}
              smooth={true}
              offset={0}
              duration={1100}
            >
              <span>Home</span>
            </LinkScroll>
          </FadeIn>
        </li>
        <li>
          <FadeIn>
            <LinkScroll
              activeClass='active'
              to='section2'
              spy={true}
              smooth={true}
              offset={0}
              duration={1100}
            >
              <span>Features</span>
            </LinkScroll>
          </FadeIn>
        </li>
        <li>
          <FadeIn>
            <LinkScroll
              activeClass='active'
              to='section3'
              spy={true}
              smooth={true}
              offset={0}
              duration={1100}
            >
              <span>Contact</span>
            </LinkScroll>
          </FadeIn>
        </li>
        <li>
          <FadeIn>
            <a
              href='#!'
              style={{ padding: 0, margin: '1rem' }}
              onClick={clickHandler}
            >
              <span
                className='theLoginButton btn'
                style={{ padding: '0.15rem 0.4rem' }}
              >
                Login <i className='fas fa-sign-in-alt'></i>
              </span>
            </a>
          </FadeIn>
        </li>
      </ul>
    </div>
  );
};

NavbarLanding.defaultProps = {
  icon: 'fas fa-terminal',
  platform: 'Tech R.A.'
};

NavbarLanding.propTypes = {
  icon: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired
};

export default NavbarLanding;
