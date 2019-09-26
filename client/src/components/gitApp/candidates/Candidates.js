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
  const { loadCandidates, loading, candidates } = candidateContext;

  useEffect(() => {
    loadCandidates();
    console.log(candidates);
  }, []);

  return (
    <div>
      {loading ? (
        <div className='loader container'></div>
      ) : candidates.length === 0 ? (
        <FadeIn>
          <h3>
            No Candidates in your directory yet, {user.name}. Please go to home
            and search for candidates once you find a candidate of interest,
            click more to learn more about their github profile. Then you'll
            find an option at the top of their profile to add them to your
            directory.
          </h3>
        </FadeIn>
      ) : (
        <FadeInUsers>
          <div className='userCards' style={{ marginBottom: '1rem' }}>
            {candidates.map(candidate => (
              <CandidateCard
                key={candidate.git_account_id}
                candidate={candidate}
              />
            ))}
          </div>
        </FadeInUsers>
      )}
    </div>
  );
};

export default Candidates;
