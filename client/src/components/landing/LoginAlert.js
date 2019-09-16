import React, { useContext } from 'react';

import AuthContext from '../../Context/Authentication/authContext';

const LoginAlert = () => {
  const authContext = useContext(AuthContext);

  const { alert } = authContext;

  return (
    <div
      className='loginAlert'
      // style={!alert ? { display: 'none' } : { display: 'block' }}
    >
      <h3 style={{ color: 'red' }}>
        Please Enter a valid username and/or password
      </h3>
    </div>
  );
};

export default LoginAlert;
