import {createContext, useState, useEffect} from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

export const SocketContext = createContext();

let connectedToSocket = false;

const initSocket = (token, dispatch, getInfo) => {

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
    const {token, loggedIn, user, dispatch} = useAuth();


    const disconnectSocket = () => {

        if(socket) socket.disconnect();

        // connectedToSocket = false;
        setSocket(null);
    
    }

    console.log("This 0");

    useEffect(() => {

        if(!(token && loggedIn && user)) return;

        console.log("This 1");

        if(connectedToSocket) return;

        const newSocket = initSocket(token, dispatch);

        if(!newSocket) {

            dispatch({type: "LOGOUT"});

            return;
        };

        connectedToSocket = true;

        dispatch({type: "SOCKET_CONNECTION", payload: {socket: newSocket}});
        setSocket(newSocket);

        return disconnectSocket;

    }, [token]);

    return (
        <SocketContext.Provider value={{socket, disconnectSocket}}>
            {children}
        </SocketContext.Provider>
    );

};
