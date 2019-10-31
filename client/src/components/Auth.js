import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './gitApp/layout/Navbar';
import Register from './auth/Register';
import Login from './auth/Login';
import Footer from './gitApp/layout/Footer';
import GitApp from './gitApp/GitApp';

const Auth = ({ match, auth: { isAuthenticated } }) => {
  const containerStyling = {
    minHeight: !isAuthenticated && '100vh',
    overflow: !isAuthenticated && 'hidden',
    display: !isAuthenticated && 'block',
    paddingBottom: !isAuthenticated && '70px',
    position: !isAuthenticated && 'relative'
  };

  document.body.style.background = '#fff';

  return (
    <Fragment>
      <Router>
        <div style={containerStyling}>
          <Route path={match.url} component={Navbar} />
          <Switch>
            <Route exact path={`${match.url}/login`} component={Login} />
            <Route exact path={`${match.url}/register`} component={Register} />
            <Route exact path={'/gitapp'} component={GitApp} />
          </Switch>
          <Route path={match.url} component={Footer} />
        </div>
      </Router>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Auth);
