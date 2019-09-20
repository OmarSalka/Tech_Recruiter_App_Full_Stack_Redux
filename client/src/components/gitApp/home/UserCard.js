import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user: { avatar_url, login } }) => {
  return (
    <div className='userCard'>
      <img src={avatar_url} alt='Oops' />
      <p style={{ marginBottom: '0.5rem' }}>
        <strong style={{ fontFamily: 'Acme' }}>{login}</strong>
      </p>
      <Link
        to={`/gitapp/user/${login}`}
        className='btn btn-primary btn-primary-hover'
        style={customBtn}
      >
        More
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
export default UserCard;
