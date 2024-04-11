import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

let useEffectCalled = false;

const setAuth = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("loggedIn", true)

            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
                user: action.payload.user,
            }
        case "SOCKET_CONNECTION":
            return {
                ...state,
                socket: action.payload.socket
            }
        
        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem("user") ;
            localStorage.removeItem("loggedIn");
            if(state.socket) state.socket.disconnect();
            return {
                loggedIn: false,
                token: null,
                user: null,
                socket: null    
            }
        case "UPDATE_USER":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload
            }

        case "NEW_MESSAGE":

            const newConvo = action.payload.convo;

            if(!state.user) return state;

            if(!state.user.convos.some(convo => convo._id == newConvo._id)) {
                const newUser = {
                    ...state.user,
                    convos: [...state.user.convos, newConvo]
                };

                localStorage.setItem("user", JSON.stringify(newUser));
                return {
                    ...state,
                    user: newUser
                }
            };

            const newUser = {
                ...state.user,
                convos: state.user.convos.map(convo => convo._id == newConvo._id ? newConvo : convo)
            };

            localStorage.setItem("user", JSON.stringify(newUser));

            return {
                ...state,
                user: newUser
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

        if(useEffectCalled) return;

        useEffectCalled = true;


        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if(!user || !token) return;

        console.log("Logging in with token from local storage");
        dispatch({
            type: "LOGIN",
            payload: {
                user,
                token,
            }
        });
        
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );

}