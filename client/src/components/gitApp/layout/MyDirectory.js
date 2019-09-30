import React, { Fragment, useState, useContext } from 'react';
import PopUp from '../candidates/PopUp';
import Candidates from '../candidates/Candidates';
import CandidateContext from '../../../Context/Candidate/candidateContext';
import PopUpContext from '../../../Context/PopUp/popUpContext';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;

const MyDirectory = () => {
  const candidateContext = useContext(CandidateContext);
  const { andFilterBtnToggled, orFilterBtnToggled, and, or } = candidateContext;

  const popUpContext = useContext(PopUpContext);
  const { popUpType } = popUpContext;

  const [filters, setFilters] = useState({
    position: '',
    login: ''
  });
  const { position, login } = filters;

  const onSubmit = e => {
    e.preventDefault();
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

  return (
    <div>
      {popUpType === 'delete' && (
        <FadeIn>
          <PopUp />
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
              onClick={andClicked}
              style={{
                color: and ? '#f4f4f4' : '#333',
                background: and ? '#388f83' : '#d9dbdb'
              }}
            >
              And
            </p>
            <p
              onClick={orClicked}
              style={{
                color: or ? '#f4f4f4' : '#333',
                background: or ? '#388f83' : '#d9dbdb'
              }}
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
        </form>
        <Candidates />
      </div>
    </div>
  );
};

export default MyDirectory;
