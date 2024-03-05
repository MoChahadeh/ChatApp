import "./HomePage.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import ContactsList from "./components/ContactsList/ContactsList.jsx";
import ChatView from "./components/ChatView/ChatView";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";


function HomePage() {

    const [selectedContact, setSelectedContact] = useState(null);

    return (
        <div id="homePage">
            <NavBar />
            <ContactsList selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
            <ChatView selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
        </div>
    );

}

export default HomePage;
