import React, { useEffect, useContext } from 'react';
import GithubContext from '../../../Context/Github/githubContext';
import Repos from '../profile/Repos';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft } from 'react-animations';

import { Link } from 'react-router-dom';

const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeInLeft}`};
`;

const UserProfile = ({ match }) => {
  const githubContext = useContext(GithubContext);
  console.log(githubContext.user);
  const {
    avatar_url,
    bio,
    company,
    email,
    followers,
    following,
    hireable,
    html_url,
    location,
    name,
    public_gists,
    public_repos
  } = githubContext.user;

  useEffect(() => {
    githubContext.getUser(match.params.login);
    githubContext.getRepos(match.params.login);
    console.log(typeof avatar_url);
    console.log(typeof html_url);
    // eslint-disable-next-line
  }, [avatar_url, html_url]);

  return (
    <FadeIn>
      <div className='container' style={{ display: 'flex' }}>
        <Link
          to='/gitapp'
          className='btn btn-primary'
          style={{ alignItems: 'left' }}
        >
          Back
        </Link>
      </div>
      <div className='container profileCard'>
        <div className='cardElements cardElement1'>
          <h1>{name}</h1>
          <img
            src={avatar_url}
            alt='Oops'
            style={{ borderRadius: '80%', width: '40%' }}
          />
          <hr style={{ border: '1px solid #d6d1d1', margin: '1rem' }} />
          <p style={{ textAlign: 'left' }}>
            <strong>Bio:</strong> <br />
            {bio ? bio : 'N/A'}
          </p>
          <p>
            <strong>Email:</strong> <br />
            {email ? (
              <a href={`mailto:${email}`} style={{ color: 'blue' }}>
                {email}{' '}
                <i
                  className='fas fa-envelope fa-1x'
                  style={{ color: '#388f83' }}
                ></i>
              </a>
            ) : (
              'N/A'
            )}
          </p>
          <p>
            <strong>Company:</strong> <br />
            {company ? company : 'N/A'}
          </p>
          <p>
            <strong>Location:</strong> <br />
            {location ? location : 'N/A'}
          </p>
          <a
            className='btn btn-primary btn-hover'
            style={{ borderRadius: 5 }}
            href={html_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Github Profile
          </a>
        </div>
        <div className='cardElements cardElement2'>
          <div className='flexStats'>
            <p className='hireable'>
              <span
                style={{
                  fontWeight: 'bold',
                  marginLeft: '1.5rem',
                  marginBottom: '1rem',
                  color: '#333'
                }}
              >
                Hireable:{' '}
              </span>{' '}
              {hireable ? (
                <i className='fas fa-check' style={{ color: '#388f83' }}></i>
              ) : (
                <i className='fas fa-times' style={{ color: '#dc3545' }}></i>
              )}
            </p>
            <div className='userQuantifiedInfo'>
              <p style={{ background: '#32CD32' }}>
                <span>Followers:</span> {followers}
              </p>
              <p style={{ background: '#FF4500' }}>
                <span>Following:</span> {following}
              </p>
              <p style={{ background: '#000' }}>
                <span>Public Gists:</span> {public_gists}
              </p>
              <p style={{ background: '#0000FF' }}>
                <span>Public Repos:</span> {public_repos}
              </p>
            </div>
          </div>
          <h1
            style={{
              textAlign: 'left',
              marginLeft: '1.5rem',
              marginTop: '1rem',
              marginBottom: '1rem'
            }}
          >
            <strong style={{ fontSize: '2rem' }}>Repos:</strong>
          </h1>
          <Repos />
        </div>
      </div>
    </FadeIn>
  );
};

export default UserProfile;
