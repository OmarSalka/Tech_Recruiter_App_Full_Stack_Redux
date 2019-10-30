import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../Alert';
import { connect } from 'react-redux';
import { register, clearErrors } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import PropTypes from 'prop-types';

const Register = ({
  history,
  auth: { error, isAuthenticated },
  register,
  clearErrors,
  setAlert
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/gitapp');
    }
    if (
      error === 'User already exists' ||
      error === 'Please enter a valid email'
    ) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onSubmit = e => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-background'>
      <div className='form-sm'>
        <Alert />
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              placeholder='Enter name...'
              value={name}
              onChange={onChange}
              required
            />
          </div>
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
          <div>
            <label htmlFor='password2'>Confirm Password:</label>
            <input
              type='password'
              name='password2'
              placeholder='Confirm password...'
              value={password2}
              onChange={onChange}
              required
              minLength='6'
            />
          </div>
          <input type='submit' value='Register' className='btn btn-primary' />
        </form>
        <p className='redirect-login_register'>
          Already a user? <Link to='/auth/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register, clearErrors, setAlert }
)(Register);
