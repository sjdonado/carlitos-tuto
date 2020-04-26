import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';

import {
  Button,
  CircularProgress,
  Stack,
  Box,
  Heading,
  Text,
} from '@chakra-ui/core';

import { allUsers } from '../../db/user';

function User({ name, lastName }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{name}</Heading>
      <Text mt={4}>{lastName}</Text>
    </Box>
  );
}

User.propTypes = {
  name: Proptypes.string.isRequired,
  lastName: Proptypes.string.isRequired,
};

function Dashboard({ logout }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    // Only execute if component did mount or updated
    const loadUsers = async () => {
      try {
        const { docs } = await allUsers();
        setUsers(docs.map((user) => user.data()));
        console.log(users);
      } catch (err) {
        console.log(err);
      }
    };
    if (!users) {
      loadUsers();
    }
  }, [users, setUsers]);

  return (
    <>
      <h1>Dashboard</h1>
      <Button onClick={logout}>Logout</Button>
      {users ? (
        <Stack spacing={8}>
          {users.map(({ name, email, lastName }) => (
            <User
              key={email}
              name={name}
              lastName={lastName}
            />
          ))}
        </Stack>
      ) : <CircularProgress isIndeterminate />}
    </>
  );
}

Dashboard.propTypes = {
  logout: Proptypes.func.isRequired,
};

export default Dashboard;
