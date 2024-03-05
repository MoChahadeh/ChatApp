import "./App.css";
import React, { useEffect, useState } from "react";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from "./pages/HomePage/HomePage";
import { useAuth } from "./hooks/useAuth.js";


function App() {

	const {loggedIn, dispatch, token} = useAuth();

	useEffect(() => {
		setTimeout(async () => {

			if(!token || token.length == 0) return;

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

				dispatch({
					type: "UPDATEUSER",
					payload: {
						user: userObj
					}
				})

			} else {
				throw new Error("Could not get user info..");
			}		

		}, 500);
	});

	return (
		<div className="App">
			{loggedIn && ( <HomePage /> )}
			{!loggedIn && <SignInPage />}
		</div>
	);
}

export default App;
