import "./ChatView.css";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

fontawesome.library.add(faXmark);
fontawesome.library.add(faPaperPlane);


const messages = [
    {
        received: true,
        message: "Hi!",
        date: new Date(),
    },
    {
        received: false,
        message: "Hey! How Are You?",
        date: new Date(),
    },
    {
        received: true,
        message: "I'm Fine thanks for asking, I was checking your work on the project and I have noticed point A and B and C aren't working. Can you please fix them?",
        date: new Date(),
    },
    {
        received: false,
        message: "I'm sorry, I'm just a bot. I'm not a real human being.",
        date: new Date(),
    },
    {
        received: true,
        message: "Haha very funny fix them.. bye.",
        date: new Date(),
    },
]

function ChatView(props) {

    const closeChatView = () => {

        props.setSelectedContact(-1);
        document.getElementById("chatView").classList.add("hidden");

    }

    const sendMessage = () => {

        if(message.length == 0) return;
        if(message.length > 500) return alert("Messages should be less than 500 characters..");


        messages.push({
            received: false,
            message: message,
            date: new Date(),
        });

        var objDiv = document.getElementById("chatView");
        objDiv.scrollTop = objDiv.scrollHeight;
        setMessage("");

    }

    const [message, setMessage] = useState("");

    return (
        <div id="chatView" className="hidden">

            {props.selectedContact != -1 && <div id="chatViewContent">
                <div id="chatViewTopBar">
                    <h3>{props.usr.contactsList[props.selectedContact].name}</h3>

                    <div onClick={closeChatView} id="chatViewTopBar-Right">
                        <FontAwesomeIcon id="chatViewTopBar-Right-X" icon="fa-solid fa-xmark" onClick={props.closeChatView} />
                    </div>

                </div>

                <div id="convo">
                    {messages.map((message, index) => {
                        return (
                            <div key={index}  className={message.received ? "message received" : "message sent"}>
                                {message.message}
                                <p className="textDate">{message.date.toLocaleDateString('en-US',{hour: '2-digit', minute: '2-digit'})}</p>
                            </div>
                        )
                    })}
                </div>

                <form id="chatViewBottomBar" onSubmit={sendMessage} >
                    <input autoComplete="off" value={message} onChange={(ev) => setMessage(ev.target.value)} type="text" id="messageInput" placeholder="Message" />
                    <a id="chatViewBottomBar-Buttons" onClick={sendMessage}>
                        <FontAwesomeIcon id="sendButton" icon="fa-solid fa-paper-plane" />
                    </a>
                </form>
            </div> }

        </div>
    );

}

export default ChatView;