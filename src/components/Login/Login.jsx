import React, { useState } from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Link,
} from "@chakra-ui/core";

import {
  useHistory,
} from 'react-router-dom';

import './Login.scss';

import firebase from '../../services/firebase';

function Login() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { email, password } = formData;
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log(response);
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return(
    <div className="container">
      <h1>Login</h1>
      <FormControl className="form-control">
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
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl className="form-control">
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
        className="submit-btn"
        isLoading={isLoading}
        loadingText="Submitting"
        variantColor="teal"
        variant="outline"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Link onClick={() => history.push('/signup')}>Signup</Link>
    </div>
  )
}

export default Login;