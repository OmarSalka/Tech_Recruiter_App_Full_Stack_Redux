import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';

// import NavbarLanding from './components/landing/NavbarLanding';
// import Navbar from './components/github/Navbar';
// import Home from './components/github/Home';
// import UserProfile from './components/github/content/UserProfile';
// import About from './components/github/About';
// import Footer from './components/github/Footer';

import LandingPage from './components/landing/LandingPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import GitApp from './components/gitApp/GitApp';
import PageNotFound from './components/PageNotFound';

import AuthState from './Context/Authentication/AuthState';
import GithubState from './Context/Github/GithubState';
import AlertState from './Context/Alert/AlertState';
// import Alert from './components/Alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <GithubState>
        <AlertState>
          <Router>
            <Router>
              {/* <Alert /> */}
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route path='/gitapp' component={GitApp} />
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
