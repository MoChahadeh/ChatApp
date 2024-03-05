import { useAuth } from "./useAuth";

import { useState } from "react";

export const useSignup = () => {

    const { dispatch } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (name, email, password) => {

        setLoading(true);
        setError(null);

        try {

            const response = await fetch(process.env.REACT_APP_ROOT_URL+"/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if(!response.ok) throw new Error(await response.text());

        } catch (error) {
            setError(error.message);
        }

        setLoading(false);

    };

    return { signup, loading, error };

}