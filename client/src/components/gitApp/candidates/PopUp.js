import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearPopUps } from '../../../actions/popUpActions';
import {
  addToDirectory,
  deleteCandidate
} from '../../../actions/candidateActions';
import { setAlert } from '../../../actions/alertActions';
import Alert from '../../Alert';

const PopUp = ({
  filterPosition,
  filterLogin,
  filterType,
  popUp: { candidateToBeDeleted, candidateToBeAdded, login, id, popUpType },
  clearPopUps,
  addToDirectory,
  deleteCandidate,
  setAlert
}) => {
  const [addInput, setAddInput] = useState({
    position: '',
    notes: ''
  });
  const { position, notes } = addInput;

  const yes = () => {
    if (popUpType === 'add') {
      if (position === '') {
        setAlert(
          'Please enter a position for your potential candidate',
          'danger'
        );
      } else {
        addToDirectory({
          git_account_id: id,
          login: login,
          position: position,
          notes: notes
        });
        // checkIfCandidate(id);
        clearPopUps();
      }
    }

    if (popUpType === 'delete') {
      deleteCandidate(
        {
          position: filterPosition,
          login: filterLogin,
          filterType: filterType
        },
        id
      );
      clearPopUps();
    }
  };

  const no = () => {
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
              <p className='positive' onClick={yes}>
                Yes
              </p>
              <p className='negative' onClick={no}>
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
              <span className='highlighted-name'>{candidateToBeAdded}</span>:
            </p>
            <form className='form-sm'>
              <Alert />
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
                className='positive'
                onClick={yes}
                style={{
                  width: '5rem'
                }}
              >
                Ok
              </p>
              <p
                className='negative'
                onClick={no}
                style={{
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
PopUp.defaultProps = {
  filterPosition: '',
  filterLogin: '',
  filterType: ''
};

PopUp.propTypes = {
  popUp: PropTypes.object.isRequired,
  clearPopUps: PropTypes.func.isRequired,
  addToDirectory: PropTypes.func.isRequired,
  deleteCandidate: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  filterPosition: PropTypes.string.isRequired,
  filterLogin: PropTypes.string.isRequired,
  filterType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  popUp: state.popUp
});

export default connect(
  mapStateToProps,
  { clearPopUps, addToDirectory, deleteCandidate, setAlert }
)(PopUp);
