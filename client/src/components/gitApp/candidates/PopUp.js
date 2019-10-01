import React, { useContext, useState } from 'react';
import CandidateContext from '../../../Context/Candidate/candidateContext';
import PopUpContext from '../../../Context/PopUp/popUpContext';

const PopUp = () => {
  const candidateContext = useContext(CandidateContext);
  const { addToDirectory, deleteCandidate } = candidateContext;

  const popUpContext = useContext(PopUpContext);
  const {
    candidateToBeDeleted,
    candidateToBeAdded,
    id,
    clearPopUps,
    popUpType
  } = popUpContext;

  const [addInput, setAddInput] = useState({
    position: '',
    notes: ''
  });
  const { position, notes } = addInput;

  const yes = () => {
    {
      popUpType === 'add' && console.log(candidateToBeAdded);
    }
    {
      popUpType === 'add' && // create real position and note when pop up is ready
        addToDirectory({
          git_account_id: id,
          position: position,
          notes: notes
        });
    }

    {
      popUpType === 'delete' && console.log(candidateToBeDeleted);
    }
    {
      popUpType === 'delete' && deleteCandidate(id);
    }
    clearPopUps();
  };

  const no = () => {
    console.log('no');
    clearPopUps();
  };

  const addOnChange = e => {
    setAddInput({ ...addInput, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {popUpType === 'delete' ? (
        <div className='popup'>
          <div className='popup-inner'>
            <p>
              Are you sure you want to remove{' '}
              <span style={{ color: 'red' }}>
                {candidateToBeDeleted ? candidateToBeDeleted : 'this candidate'}
              </span>{' '}
              from your directory?
            </p>
            <div className='confirmation'>
              <p
                onClick={yes}
                style={{
                  color: '#f4f4f4',
                  background: '#388f83'
                }}
              >
                Yes
              </p>
              <p
                onClick={no}
                style={{
                  color: '#333',
                  background: '#d9dbdb'
                }}
              >
                No
              </p>
            </div>
          </div>
        </div>
      ) : popUpType === 'add' ? (
        <div className='popup'>
          <div className='popup-inner'>
            <p style={{ paddingLeft: '2rem' }}>
              Enter the following about{' '}
              <span style={{ color: '#388f83' }}>{candidateToBeAdded}</span>?
            </p>
            <form className='form-sm'>
              <label htmlFor='position'>Potential Position:</label>
              <input
                type='text'
                name='position'
                value={position}
                placeholder='Enter position...'
                onChange={addOnChange}
              />
              <label htmlFor='notes'>Notes:</label>
              <input
                type='text'
                name='notes'
                value={notes}
                placeholder='Notes...'
                onChange={addOnChange}
              />
            </form>
            <div className='confirmation'>
              <p
                onClick={yes}
                style={{
                  color: '#f4f4f4',
                  background: '#388f83',
                  width: '5rem'
                }}
              >
                Ok
              </p>
              <p
                onClick={no}
                style={{
                  color: '#333',
                  background: '#d9dbdb',
                  width: '5rem'
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PopUp;
