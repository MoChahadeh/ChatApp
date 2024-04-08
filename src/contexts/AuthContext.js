import { createContext, useReducer, useEffect } from "react";
import { io } from "socket.io-client";

export const AuthContext = createContext();

let useEffectCalled = false;
let socketCreated = false;

const initSocket = (token) => {

    const socket = io(process.env.REACT_APP_ROOT_URL, {
        auth: {
            token
        }
    }, {
        withCredentials: true
    });

    socket.on("connect", () => {
        console.log("Connected to socket!");
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from socket!");    
    });

    socket.on("message", (data) => {

        console.log("Received message: ", data);

    })

    return socket

}

const setAuth = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("loggedIn", true)

            if(!socketCreated) {
                console.log("No socket, creating new one");
                
                const socket = initSocket(action.payload.token);

                if(socket) socketCreated = true;

                return {
                    loggedIn: true,
                    token: action.payload.token,
                    user: action.payload.user,
                    socket
                }
            }

            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
                user: action.payload.user,
            }
        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem("user") ;
            localStorage.removeItem("loggedIn");
            state.socket.disconnect();
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
        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(setAuth, {
        loggedIn: false,
        token: null,
        user: null,
        socket: null,
    });
    
    // Runs once at startup to check if there is already a token saved in localStorage
    useEffect(() => {

        if(useEffectCalled) return;

        useEffectCalled = true;

        const unmountFunc = () => {
            if(state.socket) {
                state.socket.disconnect();
            }
        }

        if(state.token) return unmountFunc;

        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if( !user || !token ) return unmountFunc;

        console.log("Logging in with token from local storage");
        dispatch({
            type: "LOGIN",
            payload: {
                user,
                token
            }
        });

        return unmountFunc;
        
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );

}