import React from 'react';
import PropTypes from 'prop-types';

const Repository = ({ repo }) => {
  const { clone_url, name, description } = repo;

  return (
    <div className='repo'>
      <a href={clone_url} target='_blank' rel='noopener noreferrer'>
        <h2 style={{ display: 'inline' }}>{name}</h2>&nbsp;&nbsp;
        <i style={{ color: '#1da1f2' }} className='fas fa-link'></i>
      </a>

      <p style={{ fontSize: 14 }}>{description}</p>
      <p>
        ~ Clone repo ~
        <br />
        <span style={{ fontWeight: 'bold' }}>git clone {clone_url}</span>
      </p>
    </div>
  );
};

Repository.propTypes = {
  repo: PropTypes.object.isRequired
};

export default Repository;
