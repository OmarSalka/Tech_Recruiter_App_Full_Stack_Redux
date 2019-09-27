import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';

import AuthContext from '../../../Context/Authentication/authContext';
import GithubContext from '../../../Context/Github/githubContext';

const FadeInDown = styled.div`
  animation: 2s ${keyframes`${fadeInDown}`};
`;

const Navbar = ({ icon, platform }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;

  const githubContext = useContext(GithubContext);
  const { clearUsers } = githubContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const logoutClicked = () => {
    clearUsers();
    logout();
  };

  const userNavItems = (
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
      <li className='mobile-nav-item'>
        <FadeInDown>
          <Link to='/gitapp/database'>MyDirectory</Link>
        </FadeInDown>
      </li>
      <li className='mobile-nav-item'>
        <FadeInDown>
          <Link to='/' onClick={logoutClicked}>
            Logout
          </Link>
        </FadeInDown>
      </li>
      <div className='dropdown'>
        <FadeInDown>
          <span style={{ cursor: 'pointer', fontSize: '0.5rem' }}>
            <i className='fas fa-user-circle fa-3x'></i>
          </span>
        </FadeInDown>
        <div className='dropdown-content'>
          <Link to='/gitapp/database'>My Directory</Link>
          <Link to='/' className='dropdown-item' onClick={logoutClicked}>
            Logout
          </Link>
        </div>
      </div>
    </ul>
  );

  const guestNavItems = (
    <ul>
      <li>
        <FadeInDown>
          <Link to='/auth/login'>Login</Link>
        </FadeInDown>
      </li>
      <li>
        <FadeInDown>
          <Link to='/auth/register'>Register</Link>
        </FadeInDown>
      </li>
    </ul>
  );

  return (
    <div className='git navbar'>
      <FadeInDown>
        <div className='logo'>
          <h1>
            <i className={icon} />{' '}
            <span>{user ? `Hi, ${user.name}` : platform}</span>
          </h1>
        </div>
      </FadeInDown>
      {isAuthenticated ? userNavItems : guestNavItems}
    </div>
  );
};

Navbar.defaultProps = {
  icon: 'fas fa-terminal',
  platform: 'Tech R.A.'
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired
};

export default Navbar;
