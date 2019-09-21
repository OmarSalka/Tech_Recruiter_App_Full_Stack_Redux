import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onSubmit = e => {
    e.preventDefault();
    console.log('Login Submit');
  };
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-background'>
      <div className='form-sm'>
        {/* like the container class but narrower */}
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          {/* <div className='form-group'> */}
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            placeholder='example@email.com'
            value={email}
            onChange={onChange}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            placeholder='Enter password...'
            value={password}
            onChange={onChange}
          />
          <input type='submit' value='Login' className='btn btn-primary' />
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
