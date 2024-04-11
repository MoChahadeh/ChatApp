import "./HomePage.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import ContactsList from "./components/ContactsList/ContactsList.jsx";
import ChatView from "./components/ChatView/ChatView";
import { useState, useEffect } from "react";
import { SocketProvider } from "../../contexts/SocketContext.js";
import { useAuth } from "../../hooks/useAuth.js";

function HomePage() {

    const [selectedContact, setSelectedContact] = useState(null);
    const {user} = useAuth();

    useEffect(() => {
        if(!selectedContact) return;
        const newConvo = user.convos.find(convo => convo._id == selectedContact._id);

        if(newConvo) setSelectedContact(newConvo);

    }, [user])

    return (
        <div id="homePage">
            <NavBar />
            <SocketProvider>
                <ContactsList selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
                <ChatView selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
            </SocketProvider>
        </div>
    );

}

export default HomePage;
