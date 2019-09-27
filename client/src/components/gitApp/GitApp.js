import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../Context/Authentication/authContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './layout/Home';
import UserProfile from './profile/UserProfile';
import About from './layout/About';
import MyDirectory from './layout/MyDirectory';
import Footer from './layout/Footer';
import App from '../../App';

const GitApp = ({ match }) => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

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
            <Route exact path={'/'} component={App} />
          </Switch>
          <Route path={match.url} component={Footer} />
        </div>
      </Router>
    </Fragment>
  );
};

export default GitApp;
