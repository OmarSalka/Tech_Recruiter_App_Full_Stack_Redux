import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './components/landing/LandingPage';
import GitApp from './components/gitApp/GitApp';
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import Auth from './components/Auth';

import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path={'/auth'} component={Auth} />
          <PrivateRoute path='/gitapp' component={GitApp} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
