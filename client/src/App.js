import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './components/landing/LandingPage';
import GitApp from './components/gitApp/GitApp';
import PageNotFound from './components/PageNotFound';
import AuthState from './Context/Authentication/AuthState';
import PrivateRoute from './components/routing/PrivateRoute';
import Auth from './components/Auth';

import GithubState from './Context/Github/GithubState';
import AlertState from './Context/Alert/AlertState';
import CandidateState from './Context/Candidate/CandidateState';
import PopUpState from './Context/PopUp/PopUpState';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthState>
        <GithubState>
          <CandidateState>
            <PopUpState>
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
            </PopUpState>
          </CandidateState>
        </GithubState>
      </AuthState>
    </Provider>
  );
};

export default App;
