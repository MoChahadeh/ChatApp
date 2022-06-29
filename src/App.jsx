import './App.css';
import React, {useState} from "react";
import SignInPage from "./pages/SignInPage.jsx";
import HomePage from './pages/HomePage';
// import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  const [signedIn, setSignedIn] = useState(true);

  return (
    <div className="App">
      {signedIn && <HomePage />}
      {!signedIn && <SignInPage />}
    </div>
  );
}

export default App;
