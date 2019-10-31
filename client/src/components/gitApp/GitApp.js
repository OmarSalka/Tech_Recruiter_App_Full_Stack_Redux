import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './layout/Home';
import UserProfile from './profile/UserProfile';
import About from './layout/About';
import MyDirectory from './layout/MyDirectory';
import CandidateProfile from './candidates/CandidateProfile';
import Footer from './layout/Footer';
import App from '../../App';

const GitApp = ({ match, auth: { isAuthenticated }, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const containerStyling = {
    minHeight: isAuthenticated && '100vh',
    overflow: isAuthenticated && 'hidden',
    display: isAuthenticated && 'block',
    position: isAuthenticated && 'relative',
    paddingBottom: isAuthenticated && '70px'
  };

  return (
    <Fragment>
      <Router>
        <div style={containerStyling}>
          <Route path={match.url} component={Navbar} />
          <Switch>
            <Route exact path={match.url} component={Home} />
            <Route
              exact
              path={`${match.url}/user/:login`}
              component={UserProfile}
            />
            <Route exact path={`${match.url}/about`} component={About} />
            <Route
              exact
              path={`${match.url}/database`}
              component={MyDirectory}
            />
            <Route
              exact
              path={`${match.url}/database/:login`}
              component={CandidateProfile}
            />
            <Route exact path={'/'} component={App} />
          </Switch>
          <Route path={match.url} component={Footer} />
        </div>
      </Router>
    </Fragment>
  );
};
GitApp.propTypes = {
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadUser }
)(GitApp);
