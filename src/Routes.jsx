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
import Dashboard from './pages/Dashboard/Dashboard';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

function Routes() {
  const [cookies, setCookie, removeCookie] = useCookies(['user-token']);

  const setUserToken = (uid) => {
    setCookie('user-token', uid, { path: '/', expires: new Date(Date.now() + 8.64e+7) });
  };

  const logout = () => {
    removeCookie('user-token', { path: '/' });
  };

  const routes = [
    {
      isPublic: true,
      path: '/login',
      children: <Login setUserToken={setUserToken} />,
    },
    {
      isPublic: true,
      path: '/signup',
      children: <Signup setUserToken={setUserToken} />,
    },
    {
      isPublic: false,
      path: '/dashboard',
      children: <Dashboard setUserToken={setUserToken} logout={logout} />,
    },
  ];

  return (
    <Router>
      <Switch>
        {routes.map(({ isPublic, path, children }) => (
          <Route key={path} path={path}>
            {isPublic ? (
              <PublicRoute isAuth={Boolean(cookies['user-token'])}>
                {children}
              </PublicRoute>
            ) : (
              <PrivateRoute isAuth={Boolean(cookies['user-token'])}>
                {children}
              </PrivateRoute>
            )}
          </Route>
        ))}
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default Routes;
