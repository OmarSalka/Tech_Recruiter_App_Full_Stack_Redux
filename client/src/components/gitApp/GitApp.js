import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../Context/Authentication/authContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './layout/Home';
import UserProfile from './profile/UserProfile';
import About from './layout/About';
import Database from './layout/Database';
import Footer from './layout/Footer';
import LandingPage from '../landing/LandingPage';

const GitApp = ({ match }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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
            <Route exact path={`${match.url}/database`} component={Database} />
            <Route exact path={'/'} component={LandingPage} />
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
  position: 'relative',
  paddingBottom: '70px'
};

export default GitApp;
