import "./App.css";
import React, { useState } from "react";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from "./pages/HomePage/HomePage";
import { getSuggestedQuery } from "@testing-library/react";

function App() {
	const [signedIn, setSignedIn] = useState(false);

	const [token, setToken] = useState("");

	async function signIn(signUp, obj) {

		const route = signUp ? "/users/signup" : "/auth";

		try {
			const res = await fetch("http://localhost:3011/api" + route, {
				method: "POST",
        mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			});

      const data = await res.json();
      
      if(data.token) {
        console.log(data.token);
        setToken(data.token);
        setSignedIn(true);
      }
      else {
        new Error("No token provided");
      }

		} catch (err) {
      console.error(err);
			alert(err.message);
		}
	}


	const signOut = () => {
		console.log("Logged Out");
		setSignedIn(false);
		setToken("");
	};

	return (
		<div className="App">
			{signedIn && <HomePage usrObject={async () => {return await fetchUser()}} signOut={signOut} token={token} />}
			{!signedIn && <SignInPage signIn={signIn} />}
		</div>
	);
}

export default App;
