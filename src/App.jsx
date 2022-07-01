import "./App.css";
import React, { useState } from "react";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from "./pages/HomePage/HomePage";
import { getSuggestedQuery } from "@testing-library/react";

function App() {

	const [signedIn, setSignedIn] = useState(false);
	const [token, setToken] = useState("");
	const [signInServerMessage, setSignInServerMessage] = useState("");
	const [signUpServerMessage, setSignUpServerMessage] = useState("");

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

			if (res.status == 200) {
				const data = await res.json();

				if (data.token) {
					console.log(data.token);
					setToken(data.token);
					setSignInServerMessage("");
					setSignUpServerMessage("");
					setSignedIn(true);
				} else {
					throw new Error("No token provided");
				}
			} else {

				const err = await res.text();
				if(signUp) {
					setSignUpServerMessage(err);
				} else {
					setSignInServerMessage(err);
				}
				throw new Error(err);
			}
		} catch (err) {
			console.error(err);
		}
	}

	const signOut = () => {
		console.log("Logged Out");
		setSignedIn(false);
		setToken("");
	};

	return (
		<div className="App">
			{signedIn && (
				<HomePage
					usrObject={async () => {
						return await fetchUser();
					}}
					signOut={signOut}
					token={token}
				/>
			)}
			{!signedIn && <SignInPage signInServerMessage={signInServerMessage} signUpServerMessage={signUpServerMessage} signIn={signIn} />}
		</div>
	);
}

export default App;
