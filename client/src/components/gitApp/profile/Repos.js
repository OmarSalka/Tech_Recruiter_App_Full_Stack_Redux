import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Repository from './Repository';

const Repos = ({ github: { repos } }) => {
  return (
    <div style={{ alignItems: 'left' }}>
      {repos.map(repo => (
        <Repository key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

Repos.propTypes = {
  github: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  github: state.github
});

export default connect(mapStateToProps)(Repos);
