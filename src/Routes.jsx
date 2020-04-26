import React from 'react';
import { useCookies } from 'react-cookie';

import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function Routes() {
  const [cookies, setCookie] = useCookies(['user-token']);

  const setUserToken = (uid) => {
    setCookie('user-token', uid, { path: '/' });
  };

  console.log(cookies['user-token']);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login
            isAuth={Boolean(cookies['user-token'])}
            setUserToken={setUserToken}
          />
        </Route>
        <Route path="/signup">
          <Signup
            isAuth={Boolean(cookies['user-token'])}
            setUserToken={setUserToken}
          />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default Routes;
