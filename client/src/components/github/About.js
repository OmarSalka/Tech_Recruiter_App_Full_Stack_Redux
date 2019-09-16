import React, { Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';

const FadeInDown = styled.div`
  animation: 1s ${keyframes`${fadeInDown}`};
`;

const About = () => {
  return (
    <Fragment>
      <FadeInDown>
        <div style={aboutStyle}>
          <h1 style={{ fontFamily: 'Acme', color: '#388f83' }}>About:</h1>
          <p>
            Search Potential Candidates' Github accounts with the most valuable
            metrics displayed in a really convenient way, including an option to
            visit their profile and/or repositories with a click of a button!
          </p>
          <p style={{ margin: '1rem 0' }}>
            <strong style={{ fontFamily: 'Acme', color: '#388f83' }}>
              App: <br />
            </strong>{' '}
            v. 1.0.0
          </p>
          <p>
            <strong style={{ fontFamily: 'Acme', color: '#388f83' }}>
              Author: <br />
            </strong>{' '}
            Omar Salka
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '4rem',
            marginBottom: '4rem'
          }}
        >
          <i
            className='fab fa-github fa-10x'
            style={{ color: '#388f83', opacity: '0.5' }}
          ></i>
        </div>
      </FadeInDown>
    </Fragment>
  );
};

const aboutStyle = {
  boxShadow: '0px 8px 8px 0px rgba(0, 0, 0, 0.2)',
  borderRadius: 5,
  background: '#f3ececfa',
  padding: '2rem',
  border: '1px dotted #d6d1d1',
  margin: '1.5rem',
  textAlign: 'left'
};

export default About;
