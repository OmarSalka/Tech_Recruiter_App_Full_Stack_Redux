import React, { useState, useContext, useEffect } from 'react';
import Alert from '../Alert';
import AlertContext from '../../Context/Alert/alertContext';
import AuthContext from '../../Context/Authentication/authContext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/gitapp');
    }
    if (error === 'User already exists') {
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
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            placeholder='Enter name...'
            value={name}
            onChange={onChange}
            required
          />
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            placeholder='example@email.com'
            value={email}
            onChange={onChange}
            required
          />
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
          <input type='submit' value='Register' className='btn btn-primary' />
        </form>
      </div>
    </div>
  );
};

export default Register;
