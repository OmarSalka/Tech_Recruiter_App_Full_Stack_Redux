import React, { useContext } from 'react';
import GithubContext from '../../../Context/Github/githubContext';
import Repository from './Repository';

const Repos = () => {
  const githubContext = useContext(GithubContext);

  const { repos } = githubContext;

  return (
    <div style={{ alignItems: 'left' }}>
      {repos.map(repo => (
        <Repository key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default Repos;
