import {useState, useEffect} from "react";
import { useAuth } from "./useAuth";


export const useGetInfo = () => {

    const { token, dispatch } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unmounted, setUnmounted] = useState(false); // to prevent memory leaks


    const getInfo = async () => {

        setLoading(true);
        setError(false);

        console.log("getInfo called");
        try {

            const response = await fetch(process.env.REACT_APP_ROOT_URL+"/api/users/me", {

                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                }

            })

            if(!response.ok) throw new Error(await response.text());

            const data = await response.json();

            
            dispatch({
                type: "UPDATE_USER",
                payload: data
            });

            return Promise.resolve(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
            return Promise.reject(err);
        }

        setLoading(false);

    }

    return {getInfo};
}