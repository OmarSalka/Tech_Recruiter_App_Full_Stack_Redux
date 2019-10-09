import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alert: { alert } }) => {
  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
