import React from 'react';
import { Link } from 'react-scroll';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;
const FadeInPrimary = styled.div`
  animation: 4s ${keyframes`${fadeIn}`};
`;

const LandingPage = () => {
  document.body.style.background = '#333333';

  return (
    <div id='section1'>
      <FadeIn>
        <div className='backgroundPic'>
          <div className='landing'>
            <div className='container'>
              <div className='showcaseContent'>
                <FadeInPrimary>
                  <h1>
                    Welcome to the Tech Recruiter App! <br />
                  </h1>
                  <h2>The app for Tech Recruiters</h2>
                  <Link
                    activeClass='active'
                    to='section2'
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={1100}
                  >
                    <i
                      className='downArrow fas fa-chevron-down fa-4x'
                      style={{
                        color: '#f4f4f4',
                        marginTop: '4rem',
                        cursor: 'pointer'
                      }}
                    ></i>
                  </Link>
                </FadeInPrimary>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default LandingPage;
