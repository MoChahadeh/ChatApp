import "./App.css";
import React, { useEffect, useState } from "react";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from "./pages/HomePage/HomePage";
import { useAuth } from "./hooks/useAuth.js";


function App() {

	const {loggedIn} = useAuth();

	return (
		<div className="App">
			{loggedIn && ( <HomePage /> )}
			{!loggedIn && <SignInPage />}
		</div>
	);
}

export default App;
