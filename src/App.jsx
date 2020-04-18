import React from 'react';
import './App.scss';

import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';


const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
};

function App() {
  return (
    <ThemeProvider
      theme={customTheme}
    >
      <CSSReset />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
