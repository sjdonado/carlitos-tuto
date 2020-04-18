import React from 'react';

import {
  Link,
} from 'react-router-dom';

function Signup() {
  return (
    <>
      <h1>Signup</h1>
      <Link to="/login">Return to Login</Link>
    </>
  )
}

export default Signup;