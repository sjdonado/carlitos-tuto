import React, {useState} from 'react';
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

import './Signup.scss'


import {db, auth} from '../../services/firebase'


function Signup() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name:'',
    lastName:'',
    email:'',
    password:'',
  });

  const addUser = () => {
    db.collection("Users").add({
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { name, lastName, email, password } = formData;
      const response = await auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error)
      });
      console.log(response);
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
    <div className="container">
      <h1>Sign Up</h1>
      <FormControl className="form-control">
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="name"
          id="name"
          name="name"
          value={formData.name}
          aria-describedby="name-helper-text"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className="form-control">
        <FormLabel htmlFor="name">Last Name</FormLabel>
        <Input
          type="name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          aria-describedby="lastName-helper-text"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className="form-control">
        <FormLabel htmlFor="name">Email</FormLabel>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          aria-describedby="email-helper-text"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className="form-control">
        <FormLabel htmlFor="name">Password</FormLabel>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          aria-describedby="password-helper-text"
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        className="submit-btn"
        isLoading={isLoading}
        loadingText="Submitting"
        variantColor="teal"
        variant="outline"
        onClick={handleSubmit, addUser}
      >
        Submit
      </Button>
    </div>
  );
}

export default Signup;
