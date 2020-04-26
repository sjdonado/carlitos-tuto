import React, { useState } from 'react';
import Proptypes from 'prop-types';

import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
} from '@chakra-ui/core';

import {
  useHistory,
} from 'react-router-dom';

import styles from './Login.module.scss';
import { auth } from '../../services/firebase';

function Login({ isAuth, setUserToken }) {
  const history = useHistory();

  if (isAuth) {
    history.push('/dashboard');
  }

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { email, password } = formData;
      const user = await auth.signInWithEmailAndPassword(email, password);
      console.log(user);
      setUserToken('');
    } catch (err) {
      console.log(err);
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
      <h1>Login</h1>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          aria-describedby="email-helper-text"
          onChange={handleInputChange}
        />
        <FormHelperText id="email-helper-text">
          We&apos;ll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
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
      <Button onClick={() => history.push('/signup')}>Go to Signup</Button>
    </div>
  );
}

Login.propTypes = {
  isAuth: Proptypes.bool.isRequired,
  setUserToken: Proptypes.func.isRequired,
};

export default Login;
