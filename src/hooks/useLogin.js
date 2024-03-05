import { useAuth } from "./useAuth";

import { useState } from "react";

export const useLogin = () => {

    const { dispatch } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {

        setLoading(true);
        setError(null);

        try {

            const response = await fetch(process.env.REACT_APP_ROOT_URL+"/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if(!response.ok) throw new Error(await response.text());


            const data = await response.json();

            dispatch({
                type: "LOGIN",
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

        } catch (error) {
            setError(error.message);
        }

        setLoading(false);

    };

    return { login, loading, error };

}