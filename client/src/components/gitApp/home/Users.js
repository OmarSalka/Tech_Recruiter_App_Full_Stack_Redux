import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeInUsers = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;
const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Users = ({ github: { users, clearButton, loading } }) => {
  return (
    <div>
      {loading ? (
        <div className='loader container'></div>
      ) : users.length > 0 ? (
        <FadeInUsers>
          <div className='container'>
            <div className='userCards' style={{ marginBottom: '1rem' }}>
              {users.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </FadeInUsers>
      ) : users.length === 0 && clearButton ? (
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
        <div className='home-github-icon'>
          <FadeIn>
            <i
              style={{ display: 'block' }}
              className='fas fa-search fa-10x'
            ></i>
            <p style={{ marginTop: '1rem' }}>
              Search for candidates using either their "name" or "github login"
            </p>
            <p style={{ fontSize: '0.8rem' }}>
              **Github users referencing other github users in their bio might
              get displayed in the results as well
            </p>
          </FadeIn>
        </div>
      )}
    </div>
  );
};
Users.propTypes = {
  github: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  github: state.github
});
export default connect(mapStateToProps)(Users);
