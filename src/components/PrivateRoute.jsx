import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function PrivateRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Redirect to="/" />;
  }
  return children;
}

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
