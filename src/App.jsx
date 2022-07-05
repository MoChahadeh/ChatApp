import "./App.css";
import React, { useState } from "react";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from "./pages/HomePage/HomePage";

const rootUrl = "http://mocbook-2.local:3011";

function App() {

	const [signedIn, setSignedIn] = useState(false);
	const [token, setToken] = useState("");
	const [userObject, setUserObject] = useState({});
	const [signInServerMessage, setSignInServerMessage] = useState("");
	const [signUpServerMessage, setSignUpServerMessage] = useState("");

	async function signIn(signUp, obj) {

		if(signedIn) return;

		const route = signUp ? "/users/signup" : "/auth";

		try {
			const res = await fetch(rootUrl+ "/api" + route, {
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

					const userObjectResponse = await fetch(rootUrl+"/api/users/me", {
						method: "GET",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
							"x-auth-token": data.token,
						}
					})

					if(userObjectResponse.status == 200) {

						const userObjectData = await userObjectResponse.json();
						
						const userObj = userObjectData.user;
						userObj.convos = userObjectData.userConvos;

						console.log(userObj);

						setUserObject(userObj);

					} else {
						throw new Error("Could not get user info..");
					}

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
			{signedIn && ( <HomePage usr={userObject} signOut={signOut} token={token} /> )}
			{!signedIn && <SignInPage signInServerMessage={signInServerMessage} signUpServerMessage={signUpServerMessage} signIn={signIn} />}
		</div>
	);
}

export default App;
