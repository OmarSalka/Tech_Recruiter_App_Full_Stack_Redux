import React, { useContext } from 'react';
import GithubContext from '../../../Context/Github/githubContext';
import UserCard from './UserCard';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeInUsers = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;
const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { users, clearButton, loading } = githubContext;

  return (
    <div>
      {loading ? (
        <div className='loader container'></div>
      ) : githubContext.users.length > 0 ? (
        <FadeInUsers>
          <div className='container'>
            <div className='userCards' style={{ marginBottom: '1rem' }}>
              {users.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </FadeInUsers>
      ) : githubContext.users.length === 0 && clearButton ? (
        <div>
          <h1>Oops, try again</h1>
        </div>
      ) : (
        <div className='home-github-icon'>
          <FadeIn>
            <i className='fab fa-github fa-10x'></i>
          </FadeIn>
        </div>
      )}
    </div>
  );
};

export default Users;
