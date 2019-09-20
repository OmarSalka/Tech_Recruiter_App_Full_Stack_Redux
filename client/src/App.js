import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GithubState from './Context/Github/GithubState';
// import NavbarLanding from './components/landing/NavbarLanding';
// import Navbar from './components/github/Navbar';
// import Home from './components/github/Home';
// import UserProfile from './components/github/content/UserProfile';
// import About from './components/github/About';
// import Footer from './components/github/Footer';

import LandingPage from './components/landing/LandingPage';
import GitApp from './components/gitApp/GitApp';
import PageNotFound from './components/PageNotFound';

import AuthState from './Context/Authentication/AuthState';

const App = () => {
  return (
    <AuthState>
      <GithubState>
        <Router>
          <Router>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/gitapp' component={GitApp} />
              <Route component={PageNotFound} />
            </Switch>
          </Router>
        </Router>
      </GithubState>
    </AuthState>
  );
};

export default App;
