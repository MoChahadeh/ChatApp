import {createContext, useState, useEffect} from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import useSound from 'use-sound';

export const SocketContext = createContext();

let connectedToSocket = false;

const initSocket = (token, dispatch, playSound) => {

    const socket = io(process.env.REACT_APP_ROOT_URL, {
        auth: {
            token
        }
    },
    {
        transports: ['websocket'],
        withCredentials: true
    });

    // socket.on("connect_error", () => {
    //     dispatch({type: "LOGOUT"});
    // });

    socket.on("connect", () => {
        console.log("Connected to socket");
    })

    // socket.on("disconnect", () => {
    //     dispatch({type: "LOGOUT"});
    // });

    socket.on("newMessage", (convo) => {

        dispatch({type: "NEW_MESSAGE", payload: {convo}});
        const objDiv = document.getElementById("chatView");
        if(objDiv) objDiv.scrollTop = objDiv.scrollHeight;
        // console.log("New message received")
        playSound();

    })

    socket.on("message_read", ({convo_id, message_id}) => {

        dispatch({type: "MESSAGE_READ", payload: {convo_id, message_id}});

    })

    return socket;
}

export const SocketProvider = ({children}) => {


    const [socket, setSocket] = useState(null);
    const {token, loggedIn, user, dispatch} = useAuth();
    const [playSound,] = useSound(process.env.PUBLIC_URL+ "new_message_sound.mp3");


    const disconnectSocket = () => {

        if(socket) socket.disconnect();

        // connectedToSocket = false;
        setSocket(null);
    
    }

    useEffect(() => {

        if(!(token && loggedIn && user)) return;

        console.log("This 1");

        if(connectedToSocket) return;

        const newSocket = initSocket(token, dispatch, playSound);

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
