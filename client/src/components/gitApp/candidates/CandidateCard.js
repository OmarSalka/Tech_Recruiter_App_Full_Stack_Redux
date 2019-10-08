import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteCandidatePopUp,
  toggleDisplay
} from '../../../actions/popUpActions';
import { updateCandidate } from '../../../actions/candidateActions';
import PropTypes from 'prop-types';

const CandidateCard = ({
  candidate: { id, notes, position, name, hireable, login, avatar_url },
  popUp: { candidateToBeUpdated, editNotes },
  deleteCandidatePopUp,
  toggleDisplay,
  updateCandidate
}) => {
  const [editableField, setEditableField] = useState(notes);

  const removeCandidate = () => {
    deleteCandidatePopUp(name, id);
  };

  const onChange = e => {
    setEditableField(e.target.value);
  };

  const editNotesBtn = () => {
    toggleDisplay(true, id);
  };
  const cancelEdit = () => {
    toggleDisplay(false, id);
    setEditableField(notes);
  };

  const updateNotes = () => {
    updateCandidate({ notes: editableField }, id);
    toggleDisplay(false, id);
  };

  return (
    <div className='candidateCard'>
      <div className='candidateCardLayout'>
        <div className='left'>
          <Link to={`/gitapp/database/${login}`} className='candidatelogin'>
            <strong style={{ fontSize: '1.1rem' }}>
              {login ? login : 'N/A'}
            </strong>
          </Link>
          <img src={avatar_url} alt='Oops' />
          <p>
            Position:
            <br />
            <strong>{position}</strong>
          </p>
        </div>
        <div className='right'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ padding: '0rem', paddingLeft: '0.5rem' }}>
              <span
                style={{
                  marginBottom: '1rem',
                  color: '#333',
                  padding: '0rem'
                }}
              >
                Hireable:{' '}
              </span>{' '}
              {hireable ? (
                <i className='fas fa-check' style={{ color: '#388f83' }}></i>
              ) : hireable === false ? (
                <i className='fas fa-times' style={{ color: '#dc3545' }}></i>
              ) : (
                <i className='fas fa-question' style={{ color: 'grey' }}></i>
              )}
            </p>
            <p className='remove-from-directory' onClick={removeCandidate}>
              <i
                style={{ fontSize: '1.5rem', padding: 0 }}
                className='far fa-times-circle fa-2x'
              ></i>
            </p>
          </div>
          <div
            style={{
              textAlign: 'left',
              paddingLeft: '0.5rem',
              marginTop: '1rem'
            }}
          >
            <p className='notesHeader'>
              <strong>Notes:</strong>
            </p>
            {editNotes && candidateToBeUpdated === id ? (
              <div>
                <textarea
                  type='text'
                  name='notes'
                  value={editableField}
                  onChange={onChange}
                  placeholder={'Add some notes...'}
                  style={{ border: '1.5px solid #d6d1d1' }}
                />
                <div style={{ display: 'flex', alignContent: 'center' }}>
                  <p
                    className='btn btn-primary btn-primary-hover'
                    style={{
                      display: 'inline',
                      padding: '0.23rem 0.3rem',
                      color: '#f4f4f4'
                    }}
                    onClick={updateNotes}
                  >
                    Update
                  </p>
                  <p
                    className='btn btn-primary-hover'
                    style={{
                      display: 'inline',
                      marginLeft: '0.5rem',
                      padding: '0.23rem 0.3rem',
                      background: '#aaa9a9',
                      color: '#f4f4f4'
                    }}
                    onClick={cancelEdit}
                  >
                    Cancel
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ display: 'inline', fontStyle: 'italic' }}>
                  {editableField === '' ? 'N/A' : editableField}
                </p>
                <p
                  className='btn btn-primary-hover'
                  style={{
                    display: 'inline',
                    borderRadius: '5px',
                    marginLeft: '0.5rem',
                    padding: '0.2rem 0.3rem',
                    background: '#aaa9a9',
                    color: '#f4f4f4'
                  }}
                  onClick={editNotesBtn}
                >
                  Add
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
CandidateCard.propTypes = {
  candidate: PropTypes.object.isRequired,
  popUp: PropTypes.object.isRequired,
  updateCandidate: PropTypes.func.isRequired,
  deleteCandidatePopUp: PropTypes.func.isRequired,
  toggleDisplay: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  popUp: state.popUp
});

export default connect(
  mapStateToProps,
  { deleteCandidatePopUp, toggleDisplay, updateCandidate }
)(CandidateCard);
