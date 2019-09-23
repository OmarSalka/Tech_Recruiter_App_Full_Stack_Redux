import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginNavbar from './auth/LoginNavbar';
import Register from './auth/Register';
import Login from './auth/Login';
import Footer from './gitApp/layout/Footer';
import GitApp from './gitApp/GitApp';

const Auth = ({ match }) => {
  return (
    <Fragment>
      <Router>
        <div style={containerStyling}>
          <Route path={match.url} component={LoginNavbar} />
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

const containerStyling = {
  minHeight: '100vh',
  overflow: 'hidden',
  display: 'block',
  position: 'relative'
};

export default Auth;
