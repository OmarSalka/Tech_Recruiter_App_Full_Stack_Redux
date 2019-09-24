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
        <div id='about' style={aboutStyle}>
          <h1 style={{ color: '#388f83' }}>About:</h1>
          <p className='indent-features'>
            <i className='fas fa-caret-right' style={{ color: '#388f83' }}></i>{' '}
            Search Potential Candidates' Github account with the most valuable
            metrics displayed in a very convenient way
          </p>
          <p className='indent-features'>
            <i className='fas fa-caret-right' style={{ color: '#388f83' }}></i>{' '}
            Feel like learning more about the condidate? Use our links to their
            github profile and repos
          </p>
          <p className='indent-features'>
            <i className='fas fa-caret-right' style={{ color: '#388f83' }}></i>{' '}
            Add the potential condidate to your directory
          </p>
          <p className='indent-features'>
            <i className='fas fa-caret-right' style={{ color: '#388f83' }}></i>{' '}
            Revisit your directory with all the saved profiles for comparisons
          </p>
          <p className='indent-features'>
            <i className='fas fa-caret-right' style={{ color: '#388f83' }}></i>{' '}
            In case of a no match, you can delete a candidate's profile from
            your directory
          </p>
          <h2 style={{ color: '#388f83', marginTop: '1rem' }}>App:</h2>
          <p className='indent-features'>v. 1.0.0</p>
          <h2 style={{ color: '#388f83', marginTop: '1rem' }}>
            Author: <br />
          </h2>
          <p className='indent-features'>Omar Salka</p>
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
