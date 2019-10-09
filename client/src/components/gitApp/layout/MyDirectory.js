import React, { useState } from 'react';
import PopUp from '../candidates/PopUp';
import Candidates from '../candidates/Candidates';
import { connect } from 'react-redux';
import {
  andFilterBtnToggled,
  orFilterBtnToggled,
  loadCandidates,
  loadFilteredCandidates,
  displayClearButton,
  maskClearButton
} from '../../../actions/candidateActions';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;

const MyDirectory = ({
  candidate: { filterType, clearButton },
  popUp: { popUpType },
  andFilterBtnToggled,
  orFilterBtnToggled,
  loadFilteredCandidates,
  displayClearButton,
  maskClearButton,
  loadCandidates
}) => {
  const [filters, setFilters] = useState({
    position: '',
    login: ''
  });
  const { position, login } = filters;

  const onSubmit = e => {
    e.preventDefault();
    if (position || login) {
      loadFilteredCandidates({
        position: position,
        login: login,
        filterType: filterType
      });
      displayClearButton();
    }
  };

  const onChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const andClicked = () => {
    andFilterBtnToggled();
  };
  const orClicked = () => {
    orFilterBtnToggled();
  };

  const clearFilterResults = () => {
    maskClearButton();
    setFilters({ position: '', login: '' });
    loadCandidates();
  };

  return (
    <div>
      {popUpType === 'delete' && (
        <FadeIn>
          <PopUp
            filterPosition={position}
            filterLogin={login}
            filterType={filterType}
          />
        </FadeIn>
      )}

      <div className='container'>
        <h1>Directory</h1>
        <form className='form-sm trim' onSubmit={onSubmit}>
          <h3 style={{ marginBottom: '1rem' }}>Filter By:</h3>
          <label htmlFor='position'>Potential Position:</label>
          <input
            type='text'
            name='position'
            placeholder='Enter the position name...'
            onChange={onChange}
            value={position}
          />
          <div className='filter-condition'>
            <p
              className={
                filterType === 'and' ? 'filter-selected' : 'filter-not-selected'
              }
              onClick={andClicked}
            >
              And
            </p>
            <p
              className={
                filterType === 'or' ? 'filter-selected' : 'filter-not-selected'
              }
              onClick={orClicked}
            >
              Or
            </p>
          </div>
          <label htmlFor='login'>Github Login:</label>
          <input
            type='text'
            name='login'
            placeholder='Enter the github login...'
            onChange={onChange}
            value={login}
          />
          <input className='btn btn-primary' type='submit' value='Filter' />

          {clearButton && (
            <input
              type='submit'
              value='Clear'
              className='btn btn-hover'
              style={{
                background: '#d6d1d1',
                textAlign: 'center',
                marginTop: '0.5rem'
              }}
              onClick={clearFilterResults}
            />
          )}
        </form>
        <Candidates />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  candidate: state.candidate,
  popUp: state.popUp,
  andFilterBtnToggled: PropTypes.func.isRequired,
  orFilterBtnToggled: PropTypes.func.isRequired,
  loadFilteredCandidates: PropTypes.func.isRequired,
  displayClearButton: PropTypes.func.isRequired,
  maskClearButton: PropTypes.func.isRequired,
  loadCandidates: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  {
    andFilterBtnToggled,
    orFilterBtnToggled,
    loadFilteredCandidates,
    loadCandidates,
    displayClearButton,
    maskClearButton
  }
)(MyDirectory);
