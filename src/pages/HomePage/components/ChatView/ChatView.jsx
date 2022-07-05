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

    const [message, setMessage] = useState("");


    const closeChatView = () => {

        props.setSelectedContact(-1);
        document.getElementById("chatView").classList.add("hidden");

    }

    async function sendMessage() {

        if(message.length == 0) return;
        if(message.length > 500) return alert("Messages should be less than 500 characters..");


        messages.push({
            received: false,
            message: message,
            date: new Date(),
        });

        try {

            const res = await fetch("http://mocbook-2.local:3011/api/send", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": props.token
                },
                body: JSON.stringify({
                    email: props.selectedContact.email,
                    message
                })
            })

            if(res.status == 200) {

                const data = await res.json();

                props.setSelectedContact(data);

            }

        } catch(err) {
            console.error(err);
        }

        const objDiv = document.getElementById("chatView");
        objDiv.scrollTop = objDiv.scrollHeight;
        setMessage("");

    }


    return (
        <div id="chatView" className="hidden">

            {props.selectedContact && <div id="chatViewContent">
                <div id="chatViewTopBar">
                    <h3>{props.selectedContact.users.filter(obj => obj.email != props.usr.email)[0].name}</h3>

                    <div onClick={closeChatView} id="chatViewTopBar-Right">
                        <FontAwesomeIcon id="chatViewTopBar-Right-X" icon="fa-solid fa-xmark" onClick={props.closeChatView} />
                    </div>

                </div>

                <div id="convo">
                    {props.selectedContact.messages.map((message, index) => {
                        return (
                            <div key={index}  className={message.sender == props.usr._id ? "message sent" : "message received"}>
                                {message.message}
                                <p className="textDate">{new Date(message.date).toLocaleDateString('en-US',{hour: '2-digit', minute: '2-digit'})}</p>
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