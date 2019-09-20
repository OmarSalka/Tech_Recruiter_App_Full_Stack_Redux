import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';

import AuthContext from '../../../Context/Authentication/authContext';

const FadeInDown = styled.div`
  animation: 2s ${keyframes`${fadeInDown}`};
`;

const Navbar = ({ icon, platform }) => {
  const authContext = useContext(AuthContext);

  const { logout } = authContext;

  const logoutClicked = () => {
    logout();
  };

  return (
    <div className='git navbar'>
      <FadeInDown>
        <Link to='/gitapp' className='logo'>
          <h1>
            <i className={icon} /> <span>{platform}</span>
          </h1>
        </Link>
      </FadeInDown>
      <ul>
        <li>
          <FadeInDown>
            <Link to='/gitapp'>Home</Link>
          </FadeInDown>
        </li>
        <li>
          <FadeInDown>
            <Link to='/gitapp/about'>About</Link>
          </FadeInDown>
        </li>
        <div className='dropdown'>
          <FadeInDown>
            {/* eslint-disable-next-line */}
            <span
              className='dropbtn'
              style={{ padding: '1rem', cursor: 'pointer' }}
            >
              <i className='fas fa-user-circle fa-2x'></i>
            </span>
          </FadeInDown>
          <div className='dropdown-content'>
            <Link to='/gitapp/database'>Database</Link>
            <span className='dropdown-item' onClick={logoutClicked}>
              Logout
            </span>
          </div>
        </div>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  icon: 'fab fa-github',
  platform: 'Git Finder'
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired
};

export default Navbar;
