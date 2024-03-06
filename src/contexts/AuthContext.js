import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const setAuth = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("loggedIn", true)
            return {
                loggedIn: true,
                token: action.payload.token,
                user: action.payload.user
            }
        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem("user") ;
            localStorage.removeItem("loggedIn");
            return {
                loggedIn: false,
                token: null,
                user: null
            }
        case "UPDATE_USER":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}


export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(setAuth, {
        loggedIn: false,
        token: null,
        user: null,
    });
    
    // Runs once at startup to check if there is already a token saved in localStorage
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            if(!user) return;
            dispatch({
                type: "LOGIN",
                payload: {
                    token,
                    user
                }
            });
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );

}