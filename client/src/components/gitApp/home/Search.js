import React, { useState, useContext } from 'react';
import GithubContext from '../../../Context/Github/githubContext';
import AlertContext from '../../../Context/Alert/alertContext';
import Alert from '../../Alert';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Search = () => {
  const githubContext = useContext(GithubContext);
  const { clearButton } = githubContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter a valid github username', 'secondary');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  const onChange = e => {
    setText(e.target.value);
  };

  const onClick = () => {
    githubContext.clearUsers();
  };

  return (
    <div className='container'>
      <FadeIn>
        <form className='form' onSubmit={onSubmit}>
          <div style={{ marginBottom: '0.3rem' }}>
            <Alert />
          </div>
          <input
            type='text'
            name='text'
            value={text}
            placeholder=' Search User....'
            onChange={onChange}
          />

          <input type='submit' value='Search' className='btn btn-primary' />

          {clearButton && !githubContext.users && (
            <input
              type='submit'
              value='Clear'
              className='btn btn-hover'
              style={{ background: '#d6d1d1', textAlign: 'center' }}
              onClick={onClick}
            />
          )}
        </form>
      </FadeIn>
    </div>
  );
};
export default Search;
