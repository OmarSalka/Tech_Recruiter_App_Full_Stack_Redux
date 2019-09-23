import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';

const FadeInDown = styled.div`
  animation: 2s ${keyframes`${fadeInDown}`};
`;

const LoginNavbar = ({ icon, platform }) => {
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
            <Link to='/auth/login'>Login</Link>
          </FadeInDown>
        </li>
        <li>
          <FadeInDown>
            <Link to='/auth/register'>Register</Link>
          </FadeInDown>
        </li>
      </ul>
    </div>
  );
};

LoginNavbar.defaultProps = {
  icon: 'fas fa-terminal',
  platform: 'Tech R.A.'
};

LoginNavbar.propTypes = {
  icon: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired
};

export default LoginNavbar;
