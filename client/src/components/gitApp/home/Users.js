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
      ) : clearButton ? (
        <FadeInUsers>
          <div className='container'>
            <div className='userCards' style={{ marginBottom: '1rem' }}>
              {users.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </FadeInUsers>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '7rem'
          }}
        >
          <FadeIn>
            <i
              className='fab fa-github fa-10x'
              style={{ color: '#388f83', opacity: '0.5' }}
            ></i>
          </FadeIn>
        </div>
      )}
    </div>
  );
};

export default Users;
