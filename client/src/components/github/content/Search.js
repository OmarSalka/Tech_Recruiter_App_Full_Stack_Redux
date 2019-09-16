import React, { useState, useContext } from 'react';
import GithubContext from '../../../Context/Github/githubContext';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Search = () => {
  const githubContext = useContext(GithubContext);

  const { clearButton } = githubContext;

  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    githubContext.searchUsers(text);
    setText('');
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
          <input
            type='text'
            name='text'
            value={text}
            placeholder=' Search User....'
            onChange={onChange}
          />

          <input type='submit' value='Search' className='btn btn-primary' />

          {clearButton && (
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
