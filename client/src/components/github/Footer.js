import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>Copyright {'\u00A9'} 2019, Social Media Finder, All Rights Reserved</p>
    </footer>
  );
};

const footerStyle = {
  position: 'absolute',
  bottom: '0',
  width: '100%',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  background: '#388f83',
  color: '#fff',
  opacity: '0.9'
};

export default Footer;
