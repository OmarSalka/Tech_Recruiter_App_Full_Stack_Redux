import React from 'react';
import Search from './content/Search';
import Users from './content/Users';

const Home = () => {
  return (
    <div style={{ homePageStyle }}>
      <Search />
      <Users />
    </div>
  );
};

const homePageStyle = {
  minHeight: '100vh',
  overflow: 'hidden',
  display: 'block',
  position: 'relative',
  paddingBottom: '60px'
};

export default Home;
