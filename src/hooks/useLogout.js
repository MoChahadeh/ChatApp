import {useState, useEffect} from 'react';
import {useAuth} from './useAuth';


export const useLogout = () => {

    const [unmounted, setUnmounted] = useState(false); // to prevent memory leaks
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuth();

    const logout = async () => {

        setIsLoading(true);
        setError(null);

        dispatch({
            type: "LOGOUT"
        })

        if (!unmounted) {
            setIsLoading(false);
        }



    }

    // clean up
    useEffect(() => {
        return () => {
            setUnmounted(true);
        }
    }, []);

    return {logout, error, isLoading}

}