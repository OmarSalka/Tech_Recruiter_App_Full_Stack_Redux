import React from 'react';
import PropTypes from 'prop-types';

const Repository = ({ repo }) => {
  const { name, description, clone_url } = repo;
  return (
    <div className='repo'>
      <h3>
        <a href={clone_url} target='_blank' rel='noopener noreferrer'>
          {name} <i className='fas fa-link'></i>
        </a>
      </h3>
      <p style={{ fontSize: 14 }}>{description}</p>
    </div>
  );
};

Repository.propTypes = {
  repo: PropTypes.object.isRequired
};

export default Repository;
