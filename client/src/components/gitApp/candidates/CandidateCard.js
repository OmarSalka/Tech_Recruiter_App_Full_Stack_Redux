import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopUpContext from '../../../Context/PopUp/popUpContext';
import CandidateContext from '../../../Context/Candidate/candidateContext';

const CandidateCard = ({
  dbCandidate: { git_account_id, notes, position }
}) => {
  // console.log('id', git_account_id);
  const popUpContext = useContext(PopUpContext);
  const {
    deleteCandidatePopUp,
    toggleDisplay,
    editNotes,
    candidateToBeUpdated
  } = popUpContext;
  useEffect(() => {
    loadSingleCandidate(git_account_id);
    // eslint-disable-next-line
  }, []);

  const candidateContext = useContext(CandidateContext);
  const { updateCandidate, loadSingleCandidate, candidate } = candidateContext;

  const [editableField, setEditableField] = useState(notes);

  const removeCandidate = () => {
    deleteCandidatePopUp(candidate.name, git_account_id);
  };

  const onChange = e => {
    setEditableField(e.target.value);
  };

  const editNotesBtn = () => {
    toggleDisplay(true, git_account_id);
  };
  const cancelEdit = () => {
    toggleDisplay(false, git_account_id);
  };

  const updateNotes = () => {
    updateCandidate({ notes: editableField }, git_account_id);
    toggleDisplay(false, git_account_id);
  };

  return (
    <div className='candidateCard'>
      <div className='cardHeader'></div>
      <div className='candidateCardLayout'>
        <div className='left'>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#388f83', fontSize: '1.1rem' }}>
              {candidate && candidate.name ? candidate.name : 'N/A'}
            </strong>
          </p>
          <img src={candidate && candidate.avatar_url} alt='Oops' />
          <p>
            Position:
            <br />
            <strong>{position}</strong>
          </p>
          <Link
            to={`/gitapp/database/${candidate && candidate.login}`}
            className='btn btn-primary btn-primary-hover'
            style={{
              borderRadius: '5px',
              marginTop: '0.5rem',
              padding: '0.2rem 0.3rem'
            }}
          >
            Profile
          </Link>
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
              {candidate && candidate.hireable ? (
                <i className='fas fa-check' style={{ color: '#388f83' }}></i>
              ) : candidate && candidate.hireable === false ? (
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
            {editNotes && candidateToBeUpdated === git_account_id ? (
              <div>
                <label
                  htmlFor='notes'
                  style={{ color: '#388f83', align: 'center' }}
                >
                  Notes:{' '}
                </label>
                <input
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
                      background: '#388f83',
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
                <p style={{ color: '#388f83' }}>
                  <strong>Notes:</strong>
                </p>
                <p style={{ display: 'inline', fontStyle: 'italic' }}>
                  {notes ? notes : 'N/A'}
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
                  Edit
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
