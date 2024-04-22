import "./Message.css";

import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faCheck } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef} from 'react';
import {useAuth} from "../../../../../../hooks/useAuth.js";


fontawesome.library.add(faCheck);
fontawesome.library.add(faCheckDouble);

export const Message = ({convo, message}) => {

    const {socket, user} = useAuth();
    const messageRef = useRef(null);

    if (!message) return <></>;


    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {

                if(message && !message.read && message.sender != user._id) {
                    socket.emit("read_receipt", {convo_id: convo._id, message});
                }
            }
          },
          { threshold: 0.5 } // Adjust threshold as needed
        );
    
        if (messageRef.current) {
          observer.observe(messageRef.current);
        }
    
        return () => {
          if (messageRef.current) {
            observer.unobserve(messageRef.current);
          }
        };
      }, [message]);

    return (
        <div key={"message_"+message._id} ref={messageRef} id={"message_"+message._id} className={message.sender == user._id ? "message sent" : "message received"} >
            {message.message}
            <p className="textDate">{message.sending? "Sending" : new Date(message.date).toLocaleDateString('en-US',{hour: '2-digit', minute: '2-digit'})} {message.sender == user._id && !message.sending && (message.read ? <FontAwesomeIcon icon="fa-solid fa-check-double"/> : <FontAwesomeIcon icon="fa-solid fa-check"/>)}</p>
            
    </div>

    );


}