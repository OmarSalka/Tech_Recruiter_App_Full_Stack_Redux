import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './components/landing/LandingPage';
import GitApp from './components/gitApp/GitApp';
import PageNotFound from './components/PageNotFound';
import AuthState from './Context/Authentication/AuthState';
import GithubState from './Context/Github/GithubState';
import AlertState from './Context/Alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';
import Auth from './components/Auth';

const App = () => {
  return (
    <AuthState>
      <GithubState>
        <AlertState>
          <Router>
            <Router>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path={'/auth'} component={Auth} />
                <PrivateRoute path='/gitapp' component={GitApp} />
                <Route component={PageNotFound} />
              </Switch>
            </Router>
          </Router>
        </AlertState>
      </GithubState>
    </AuthState>
  );
};

export default App;
