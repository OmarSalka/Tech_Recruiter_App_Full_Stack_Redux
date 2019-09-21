import React, { useState } from 'react';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onSubmit = e => {
    e.preventDefault();
    console.log('Register Submit');
  };
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-background'>
      <div className='form-sm'>
        {/* like the container class but narrower */}
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          {/* <div className='form-group'> */}
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            placeholder='Enter name...'
            value={name}
            onChange={onChange}
          />
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
          <label htmlFor='password2'>Confirm Password:</label>
          <input
            type='password'
            name='password2'
            placeholder='Confirm password...'
            value={password2}
            onChange={onChange}
          />
          <input type='submit' value='Register' className='btn btn-primary' />
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
