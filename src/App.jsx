import "./App.css";
import React, { useEffect, useState } from "react";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from "./pages/HomePage/HomePage";


function App() {

	const [signedIn, setSignedIn] = useState(false);
	const [token, setToken] = useState("");
	const [userObject, setUserObject] = useState(null);
	const [signInServerMessage, setSignInServerMessage] = useState("");
	const [signUpServerMessage, setSignUpServerMessage] = useState("");
	const [refreshes, setRefreshes] = useState(0);
	const [signing, setSigning] = useState(false);

	async function signIn(signUp, obj) {

		if(signedIn) return;

		const route = signUp ? "/users/signup" : "/auth";

		setSigning(true);

		try {
			const res = await fetch(process.env.REACT_APP_ROOT_URL+ "/api" + route, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			});

			if (res.status == 200) {

				if(signUp) {

					const text = await res.text();
					setSignUpServerMessage(text);

				}else {

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

			setSigning(false);
		} catch (err) {
			console.error(err);
			setSigning(false);
		}
	}


	useEffect(() => {
		setTimeout(async () => {

			setRefreshes(refreshes+1);

			if(token.length == 0) return;

			const userObjectResponse = await fetch(process.env.REACT_APP_ROOT_URL+"/api/users/me", {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				}
			})

			if(userObjectResponse.status == 200) {

				const userObjectData = await userObjectResponse.json();
				
				const userObj = userObjectData.user;
				userObj.convos = userObjectData.userConvos;

				// console.log(userObj);

				setUserObject(userObj);

			} else {
				throw new Error("Could not get user info..");
			}		

		}, 500);
	});


	const signOut = () => {
		console.log("Logged Out");
		setSignedIn(false);
		setToken("");
	};

	return (
		<div className="App">
			{signedIn && userObject && ( <HomePage refreshes={refreshes} usr={userObject} signOut={signOut} token={token} /> )}
			{!signedIn && <SignInPage signing={signing} signInServerMessage={signInServerMessage} signUpServerMessage={signUpServerMessage} signIn={signIn} />}
		</div>
	);
}

export default App;
