import React, { useContext, useState } from 'react';
import LoginAlert from './LoginAlert';
import PageSpinner from '../PageSpinner';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../Context/Authentication/authContext';

import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);

  const { authentication, authorized, danger, alert } = authContext;

  const Submit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      window.alert('Please fill in all fields');
    } else {
      authentication(email, password);
    }

    setEmail('');
    setPassword('');
  };

  const onChange_email = e => {
    setEmail(e.target.value);
  };

  const onChange_password = e => {
    setPassword(e.target.value);
  };

  if (authorized) {
    return (
      <div>
        <PageSpinner /> <Redirect to='/gitapp' />
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: '30vh' }}>
        <div className='login form'>
          {alert && (
            <FadeIn>
              <LoginAlert />
            </FadeIn>
          )}
          <h1>Login:</h1>
          <form onSubmit={Submit}>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='example@gmail.com'
              value={email}
              style={danger}
              onChange={onChange_email}
            />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              style={danger}
              onChange={onChange_password}
            />
            <input type='submit' value='Login' className='btn btn-primary' />
            <div>
              <p>
                New user?{' '}
                <span style={{ color: 'blue', cursor: 'pointer' }}>Create</span>{' '}
                {/* Need to add onClick*/}
                an account
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default LoginPage;
