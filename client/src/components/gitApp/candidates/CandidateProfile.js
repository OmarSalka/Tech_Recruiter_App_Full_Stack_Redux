import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser, getRepos } from '../../../actions/githubActions';
import { loadUser } from '../../../actions/authActions';
import PropTypes from 'prop-types';

import Repos from '../profile/Repos';
import PopUp from '../candidates/PopUp';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft } from 'react-animations';

import { Link } from 'react-router-dom';

const FadeInLeft = styled.div`
  animation: 1s ${keyframes`${fadeInLeft}`};
`;

const CandidateProfile = ({
  match,
  github: { user },
  getUser,
  getRepos,
  loadUser
}) => {
  const {
    id,
    login,
    bio,
    company,
    email,
    followers,
    following,
    hireable,
    location,
    name,
    public_gists,
    public_repos
  } = user;

  useEffect(() => {
    getUser(match.params.login);
    getRepos(match.params.login);
    loadUser();
    // eslint-disable-next-line
  }, [id]);

  return (
    <FadeInLeft>
      <PopUp />
      <div className='container' style={{ display: 'flex' }}>
        <Link
          to='/gitapp/database'
          className='btn btn-primary'
          style={{ alignItems: 'left' }}
        >
          Back
        </Link>
      </div>
      <div className='container profileCard'>
        <div className='cardElement1'>
          <div className='topCardElement'>
            <p className='hide-mobile-item hireable-mobile'>
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
              ) : hireable === false ? (
                <i className='fas fa-times' style={{ color: '#dc3545' }}></i>
              ) : (
                <i className='fas fa-question' style={{ color: 'grey' }}></i>
              )}
            </p>
            <i className='fas fa-code fa-6x' style={{ color: 'grey' }}></i>
            <h1>{name ? name : login}</h1>
          </div>
          <hr style={{ border: '1px solid #d6d1d1', margin: '1rem' }} />
          <div className='bottomCardElement'>
            <p style={{ textAlign: 'left' }}>
              <strong>Bio:</strong> <br />
              {bio ? bio : 'N/A'}
            </p>
            <p>
              <strong>Email:</strong> <br />
              {email ? (
                <a className='email-Link' href={`mailto:${email}`}>
                  {email} <i className='fas fa-envelope fa-1x'></i>
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
          </div>
        </div>
        <hr
          className='hide-mobile-item'
          style={{
            border: '1px solid #d6d1d1',
            margin: '1rem',
            marginBottom: '0rem'
          }}
        />
        <div className='cardElements cardElement2'>
          <div className='profileStats'>
            <p>
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
              ) : hireable === false ? (
                <i className='fas fa-times' style={{ color: '#dc3545' }}></i>
              ) : (
                <i className='fas fa-question' style={{ color: 'grey' }}></i>
              )}
            </p>
            <div className='userQuantifiedInfo'>
              <p>
                <span>Followers:</span> {followers}
              </p>
              <p>
                <span>Following:</span> {following}
              </p>
              <p>
                <span>Public Gists:</span> {public_gists}
              </p>
              <p>
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
    </FadeInLeft>
  );
};
CandidateProfile.propTypes = {
  match: PropTypes.object.isRequired,
  github: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getRepos: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapSateToProps = state => ({
  github: state.github
});

export default connect(
  mapSateToProps,
  { getUser, getRepos, loadUser }
)(CandidateProfile);
