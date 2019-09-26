import React from 'react';

const CandidateCard = ({ candidate: { login } }) => {
  return (
    <div className='userCard'>
      <p>{login}</p>
    </div>
  );
};

export default CandidateCard;
