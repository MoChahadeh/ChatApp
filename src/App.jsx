import './App.css';
import React, {useState} from "react";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from './pages/HomePage/HomePage';

function App() {

  const [signedIn, setSignedIn] = useState(true);

  return (
    <div className="App">
      {signedIn && <HomePage setSignedIn={setSignedIn} />}
      {!signedIn && <SignInPage setSignedIn={setSignedIn} />}
    </div>
  );
}

export default App;
