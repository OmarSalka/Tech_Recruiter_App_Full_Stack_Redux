import React from 'react';
import { Link } from 'react-scroll';
import styled, { keyframes } from 'styled-components';
import { fadeIn, fadeInDown } from 'react-animations';

const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;
const FadeInPrimary = styled.div`
  animation: 4s ${keyframes`${fadeIn}`};
`;
const FadeInDownArr = styled.div`
  animation: 5s ${keyframes`${fadeInDown}`} infinite;
`;

const LandingPage = () => {
  return (
    <div id='section1'>
      <FadeIn>
        <div className='backgroundPic'>
          <div className='landing'>
            <div className='container'>
              <FadeInPrimary>
                <div className='showcaseContent'>
                  <h1>
                    Welcome to the Tech Recruiter App! <br />
                  </h1>
                  <h2>The app for Tech Recruiters</h2>
                </div>
                <div className='downArrow'>
                  <FadeInDownArr>
                    <Link
                      activeClass='active'
                      to='section2'
                      spy={true}
                      smooth={true}
                      offset={0}
                      duration={1100}
                    >
                      <i
                        className='fas fa-chevron-down fa-4x'
                        style={{ color: '#f4f4f4' }}
                      ></i>
                    </Link>
                  </FadeInDownArr>
                </div>
              </FadeInPrimary>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default LandingPage;
