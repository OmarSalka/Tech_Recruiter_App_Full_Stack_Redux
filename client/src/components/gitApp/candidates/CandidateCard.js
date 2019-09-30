import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PopUpContext from '../../../Context/PopUp/popUpContext';

const CandidateCard = ({
  candidate: { id, hireable, avatar_url, name, notes, position, login }
}) => {
  const popUpContext = useContext(PopUpContext);
  const { deleteCandidatePopUp } = popUpContext;

  const removeCandidate = () => {
    deleteCandidatePopUp(name, id);
  };

  return (
    <div className='userCard'>
      <p className='remove-from-directory' onClick={removeCandidate}>
        <i className='far fa-times-circle'></i> Remove
      </p>
      <p>
        <span
          style={{
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#333'
          }}
        >
          Hireable:{' '}
        </span>{' '}
        {hireable ? (
          <i className='fas fa-check' style={{ color: '#388f83' }}></i>
        ) : (
          <i className='fas fa-times' style={{ color: '#dc3545' }}></i>
        )}
      </p>
      <img src={avatar_url} alt='Oops' />
      <p>
        <strong>{name ? name : 'N/A'}</strong>
      </p>
      <p>
        <i
          className='fas fa-briefcase fa-fw'
          style={{
            padding: '0rem'
          }}
        ></i>{' '}
        {position}
      </p>
      <Link
        to={`/gitapp/database/${login}`}
        className='btn btn-primary btn-primary-hover'
        style={{ borderRadius: '5px', marginTop: '0.5rem' }}
      >
        More
      </Link>
    </div>
  );
};

export default CandidateCard;
