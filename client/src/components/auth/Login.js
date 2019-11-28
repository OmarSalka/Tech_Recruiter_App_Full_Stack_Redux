import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../Alert';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import PropTypes from 'prop-types';

const Login = ({
  history,
  auth: { error, isAuthenticated },
  setAlert,
  clearErrors,
  login
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/gitapp');
    }
    if (
      error === 'Invalid Credentials' ||
      error === 'Please enter a valid email'
    ) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onSubmit = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-sm'>
      <Alert />
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            placeholder='example@email.com'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            placeholder='Enter password...'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='redirect-login_register'>
        Not a Tech R.A. user yet? <Link to='/auth/register'>Register</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, clearErrors, setAlert })(
  Login
);
