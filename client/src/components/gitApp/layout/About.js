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
    <div id='about'>
      <div className='container'>
        <Features />
        <div className='features-description'>
          <FadeInDown>
            <div className='feature-block'>
              <i className='fas fa-caret-right'></i>&nbsp;
              <p className='indent-features' style={{ marginTop: '2rem' }}>
                Save the time and pain of searching candidates' profiles and
                repos. With this app, you have all the info you need
              </p>
            </div>
            <div className='feature-block'>
              <i className='fas fa-caret-right'></i>&nbsp;
              <p className='indent-features'>
                Explore custom-made profiles of github users with just the
                information you need to make your hiring decision
              </p>
            </div>
            <div className='feature-block'>
              <i className='fas fa-caret-right'></i>&nbsp;&nbsp;
              <p className='indent-features'>
                Clone a prospect's repo on your local machine with the provided
                git command
              </p>
            </div>
            <div className='feature-block'>
              <i className='fas fa-caret-right'></i>&nbsp;
              <p className='indent-features'>
                Add the potential condidate to your directory, to access later.
              </p>
            </div>
            <div className='feature-block'>
              <i className='fas fa-caret-right'></i>&nbsp;
              <p className='indent-features'>
                Add notes regarding your prospects
              </p>
            </div>
            <div className='feature-block'>
              <i className='fas fa-caret-right'></i>&nbsp;
              <p className='indent-features'>
                Revisit your directory with all the saved profiles to compare
                github profiles
              </p>
            </div>
            <div className='feature-block'>
              <i className='fas fa-caret-right'></i>&nbsp;
              <p className='indent-features'>
                In case of a no-match, you can delete a candidate's profile from
                your directory
              </p>
            </div>
          </FadeInDown>
        </div>
        <Contact />
        <p>
          <strong>App:</strong>v. 1.0.0
        </p>
        <p>
          <strong>Author:</strong> Omar Salka
        </p>
      </div>
    </div>
  );
};

export default About;
