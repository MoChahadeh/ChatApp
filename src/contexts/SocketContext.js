import {createContext, useState, useEffect} from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

export const SocketContext = createContext();

let connectedToSocket = false;

const initSocket = (token, dispatch) => {

    const socket = io(process.env.REACT_APP_ROOT_URL, {
        auth: {
            token
        }
    },
    {
        transports: ['websocket'],
        withCredentials: true
    });

    socket.on("connect_error", () => {
        dispatch({type: "LOGOUT"});
    });

    socket.on("connect", () => {
        console.log("Connected to socket");
    })

    socket.on("disconnect", () => {
        dispatch({type: "LOGOUT"});
    });

    socket.on("newMessage", (convo) => {

        dispatch({type: "NEW_MESSAGE", payload: {convo}});

    })

    return socket;
}

export const SocketProvider = ({children}) => {


    const [socket, setSocket] = useState(null);
    const {token, dispatch} = useAuth();

    useEffect(() => {

        const unmountFunc = () => {
            if(socket) socket.disconnect();
        };

        if(!token) return unmountFunc;


        if(connectedToSocket) return unmountFunc;

        const newSocket = initSocket(token, dispatch);

        if(!newSocket) {

            dispatch({type: "LOGOUT"});

            throw new Error("Failed to initialize socket")
        };

        connectedToSocket = true;

        setSocket(newSocket);

        return unmountFunc;

    }, [token]);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );

};
