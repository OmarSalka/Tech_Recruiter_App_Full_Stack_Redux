import React, { Fragment, useContext, useState } from 'react';
import AuthContext from '../../../Context/Authentication/authContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PageSpinner from '../../PageSpinner';
import Navbar from '../Navbar';
import Home from '../Home';
import UserProfile from './UserProfile';
import About from '../About';
import Database from '../../database/Database';
import Footer from '../Footer';

const GitApp = ({ match }) => {
  const authContext = useContext(AuthContext);

  const { authorized } = authContext;

  if (authorized === null) {
    return (
      <div>
        <PageSpinner />
        <Redirect to='/' />
      </div>
    );
  } else {
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
                component={Database}
              />
            </Switch>
            <Route path={match.url} component={Footer} />
          </div>
        </Router>
      </Fragment>
    );
  }
};

const containerStyling = {
  minHeight: '100vh',
  overflow: 'hidden',
  display: 'block',
  position: 'relative',
  paddingBottom: '70px'
};

export default GitApp;
