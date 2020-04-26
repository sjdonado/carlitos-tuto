import React from 'react';
import Proptypes from 'prop-types';

import {
  Button,
} from '@chakra-ui/core';

function Dashboard({ logout }) {
  return (
    <>
      <h1>Dashboard</h1>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}

Dashboard.propTypes = {
  logout: Proptypes.func.isRequired,
};

export default Dashboard;
