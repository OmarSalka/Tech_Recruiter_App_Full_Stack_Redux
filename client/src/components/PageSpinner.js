import React from 'react';
import SpringLoader from 'react-spring-loaders';

const settings = {
  rebound: {
    tension: 14,
    friction: 10
  },
  spinner: {
    id: 'spinner',
    radius: 90,
    sides: 5,
    depth: 8,
    colors: {
      background: '#00272C',
      stroke: null,
      base: null,
      // child: '#02C39A'
      child: '#f4f4f4'
    },
    alwaysForward: false, // When false the spring will reverse normally.
    restAt: null, // A number from 0.1 to 0.9 || null for full rotation
    renderBase: false
  }
};

const PageSpinner = () => {
  return (
    <div style={{ display: '0vh' }}>
      {/* <SpringLoader settings={settings} /> */}
      {/* Default Settings  */}
      <SpringLoader config={{ duration: 100 }} />
    </div>
  );
};

export default PageSpinner;
