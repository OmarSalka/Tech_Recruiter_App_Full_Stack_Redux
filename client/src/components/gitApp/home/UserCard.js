import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkIfCandidate } from '../../../actions/candidateActions';
import PropTypes from 'prop-types';

const UserCard = ({ user: { avatar_url, login, id }, checkIfCandidate }) => {
  const onClick = () => {
    checkIfCandidate(id);
  };

  return (
    <div className='userCard'>
      <p style={{ marginBottom: '0.5rem' }}>
        <strong style={{ fontFamily: 'Acme' }}>{login}</strong>
      </p>
      <Link
        to={`/gitapp/user/${login}`}
        className='btn btn-primary btn-primary-hover'
        style={customBtn}
        onClick={onClick}
      >
        Profile
      </Link>
    </div>
  );
};

const customBtn = {
  display: 'inline-block',
  padding: '0.1rem 0.5rem',
  fontSize: '1rem',
  borderRadius: '5px',
  margin: '0 auto'
};
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  checkIfCandidate: PropTypes.func.isRequired
};

export default connect(
  null,
  { checkIfCandidate }
)(UserCard);
