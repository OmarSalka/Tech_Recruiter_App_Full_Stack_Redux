import React, { useState, useContext, useEffect } from 'react';
import Alert from '../Alert';
import AlertContext from '../../Context/Alert/alertContext';
import AuthContext from '../../Context/Authentication/authContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/gitapp');
    }
    if (
      error === 'Invalid Credentials' ||
      error === 'Please enter a valid email'
    ) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

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
    <div className='form-background'>
      <div className='form-sm'>
        <Alert />
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
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
          />
          <input type='submit' value='Login' className='btn btn-primary' />
        </form>
      </div>
    </div>
  );
};

export default Login;
