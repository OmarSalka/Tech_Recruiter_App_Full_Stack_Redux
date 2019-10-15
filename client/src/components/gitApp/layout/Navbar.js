import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';
import { connect } from 'react-redux';
import { logout, loadUser } from '../../../actions/authActions';
import { clearUsers } from '../../../actions/githubActions';
import PropTypes from 'prop-types';

const FadeInDown = styled.div`
  animation: 2s ${keyframes`${fadeInDown}`};
`;

const Navbar = ({
  icon,
  platform,
  auth: { isAuthenticated, user },
  logout,
  loadUser,
  clearUsers
}) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const logoutClicked = () => {
    logout();
    clearUsers();
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
          <Link to='/gitapp/database'>My Candidates</Link>
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
            <i className='fas fa-bars fa-3x'></i>
          </span>
        </FadeInDown>
        <div className='dropdown-content'>
          <Link to='/gitapp/database'>My Candidates</Link>
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
    <div className='navbar'>
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
  platform: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, loadUser, clearUsers }
)(Navbar);
