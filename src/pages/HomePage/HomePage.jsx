import "./HomePage.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import ContactsList from "./components/ContactsList/ContactsList.jsx";
import ChatView from "./components/ChatView/ChatView";
import { useState, useEffect } from "react";
import { useGetInfo } from "../../hooks/useGetInfo.js";

function HomePage() {

    const [selectedContact, setSelectedContact] = useState(null);
    const {getInfo} = useGetInfo();

    const [update, setUpdate] = useState(false);

    useEffect(() => {

        setTimeout(async () => {

            try {
                const newInfo = await getInfo();

                const newConvo = newInfo.convos.find(convo => (convo._id == selectedContact._id || convo.users.all(user => selectedContact.users.includes(user))));

                if (newConvo.messages.length != selectedContact.messages.length) setSelectedContact(newConvo);

            } catch (err) {
                console.error(err);
            }

            setUpdate(!update);
        
        }, 500)

    }, [update])

    return (
        <div id="homePage">
            <NavBar />
            <ContactsList selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
            <ChatView selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
        </div>
    );

}

export default HomePage;
