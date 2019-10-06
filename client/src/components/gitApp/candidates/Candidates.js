import React, { useEffect, useContext } from 'react';
import CandidateCard from './CandidateCard';

import CandidateContext from '../../../Context/Candidate/candidateContext';
import AuthContext from '../../../Context/Authentication/authContext';

import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeInUsers = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;
const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Candidates = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const candidateContext = useContext(CandidateContext);
  const { loadCandidates, loading, candidates, emptyFilter } = candidateContext;

  useEffect(() => {
    loadCandidates();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='empty-directory-message'>
      {loading ? (
        <div className='loader container'></div>
      ) : candidates.length === 0 ? (
        <FadeIn>
          <div>
            <i className='far fa-folder-open fa-3x'></i>
            <h3>No Candidates in your directory yet, {user && user.name}.</h3>
            <div>
              <p>Please go to the home page and search for candidates.</p>
              <p>
                Once you find an interesting candidate, click "More" to learn
                more about their github profile.
              </p>
              <p>
                Once in their profile, you'll find an option at the top to add
                them to your directory.
              </p>
            </div>
          </div>
        </FadeIn>
      ) : emptyFilter ? (
        <FadeIn>
          <div className='no-results-icon container'>
            <div className='sky'>
              <span>&nbsp;&nbsp;</span>
              <i className='fas fa-star hide-sky'></i>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <i className='fas fa-moon fa-3x'></i>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <i className='fas fa-star'></i>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <i className='fas fa-star hide-sky'></i>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div className='ground'>
              <i className='fas fa-tree fa-10x'></i>
              <i className='fas fa-campground fa-5x'></i>
              <i className='fas fa-tree fa-10x'></i>
            </div>
            <h2 style={{ marginTop: '0.5rem' }}>
              It's pretty quiet out here...
            </h2>
          </div>
        </FadeIn>
      ) : (
        <FadeInUsers>
          <div>
            <div
              className='userCards candidateCards'
              style={{ marginBottom: '1rem' }}
            >
              {candidates.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          </div>
        </FadeInUsers>
      )}
    </div>
  );
};

export default Candidates;
