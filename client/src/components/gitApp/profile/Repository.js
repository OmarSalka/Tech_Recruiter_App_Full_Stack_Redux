import React from 'react';
import PropTypes from 'prop-types';

const Repository = ({ repo }) => {
  const { clone_url, name, description } = repo;

  return (
    <div className='repo'>
      <h2>{name}</h2>
      <p style={{ fontSize: 14 }}>{description}</p>
      <p>
        Clone repo command:{' '}
        <span style={{ fontWeight: 'bold' }}>git clone {clone_url}</span>
      </p>
    </div>
  );
};

Repository.propTypes = {
  repo: PropTypes.object.isRequired
};

export default Repository;
