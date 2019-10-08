import React, { useState } from 'react';
import { connect } from 'react-redux';
import { clearUsers, searchUsers } from '../../../actions/githubActions';
import { setAlert } from '../../../actions/alertActions';
import PropTypes from 'prop-types';
import Alert from '../../Alert';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Search = ({
  github: { users, clearButton },
  clearUsers,
  searchUsers,
  setAlert
}) => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter a valid github username', 'secondary');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  const onChange = e => {
    setText(e.target.value);
  };

  const onClick = () => {
    clearUsers();
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

          {clearButton && !users && (
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
Search.propTypes = {
  github: PropTypes.object.isRequired,
  clearUsers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  github: state.github
});

export default connect(
  mapStateToProps,
  { clearUsers, searchUsers, setAlert }
)(Search);
