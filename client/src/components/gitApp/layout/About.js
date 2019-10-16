import React from 'react';
import Features from '../../gitApp/about/Features';
import Contact from '../../gitApp/about/Contact';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeInDown = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;

const About = () => {
  return (
    <div id='about' className='container'>
      <Features />
      <hr className='divider' />
      <FadeInDown>
        <p className='indent-features'>
          <i className='fas fa-caret-right'></i> Save the time and pain of
          searching candidates' profiles and repos. With this app, you have all
          the info you need
        </p>
        <p className='indent-features'>
          <i className='fas fa-caret-right'></i> Explore custom-made profiles of
          github users with just the information you need to make your hiring
          decision
        </p>
        <p className='indent-features'>
          <i className='fas fa-caret-right'></i> Clone a prospect's repo on your
          local machine with the provided git command
        </p>
        <p className='indent-features'>
          <i className='fas fa-caret-right'></i> Add the potential condidate to
          your directory, to access later.
        </p>
        <p className='indent-features'>
          <i className='fas fa-caret-right'></i> Add notes regarding your
          prospects
        </p>
        <p className='indent-features'>
          <i className='fas fa-caret-right'></i> Revisit your directory with all
          the saved profiles to compare github profiles
        </p>
        <p className='indent-features'>
          <i className='fas fa-caret-right'></i> In case of a no-match, you can
          delete a candidate's profile from your directory
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '4rem',
            marginBottom: '4rem'
          }}
        ></div>
      </FadeInDown>
      <Contact />
      <p>
        <strong>App:</strong>v. 1.0.0
      </p>
      <p>
        <strong>Author:</strong> Omar Salka
      </p>
    </div>
  );
};

export default About;
