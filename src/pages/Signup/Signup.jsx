import React, { useState } from 'react';
import Proptypes from 'prop-types';

import {
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from '@chakra-ui/core';

import { useHistory } from 'react-router-dom';
import styles from './Signup.module.scss';

import { login, addUser } from '../../db/user';

function Signup({ setUserToken }) {
  const history = useHistory();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { email, password } = formData;
      const { user } = await login(email, password);
      await addUser(user.uid, formData);
      setUserToken(user.uid);
    } catch ({ message }) {
      toast({
        title: message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="name"
          name="name"
          value={formData.name}
          aria-describedby="name-helper-text"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor="name">Last Name</FormLabel>
        <Input
          type="name"
          name="lastName"
          value={formData.lastName}
          aria-describedby="lastName-helper-text"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor="name">Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          aria-describedby="email-helper-text"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor="name">Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={formData.password}
          aria-describedby="password-helper-text"
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        className={styles['submit-btn']}
        isLoading={isLoading}
        loadingText="Submitting"
        variantColor="teal"
        variant="outline"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button onClick={() => history.push('/login')}>Go to Login</Button>
    </div>
  );
}

Signup.propTypes = {
  setUserToken: Proptypes.func.isRequired,
};

export default Signup;
