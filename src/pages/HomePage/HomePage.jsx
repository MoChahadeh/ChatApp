import "./HomePage.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import ContactsList from "./components/ContactsList/ContactsList.jsx";
import ChatView from "./components/ChatView/ChatView";
import { useState } from "react";



function HomePage(props) {

    const [selectedContact, setSelectedContact] = useState(-1);

    const usrObject = {
        name: "John Doe",
        email: "example@example.com",
        admin: false,
        contactsList: [
            {
                name: "Mohamad Chahadeh",
            },
            {
                name: "John Dowe",
            },
            {
                name: "John Appleseed",
            },
            {
                name: "Mohamad Chahadeh",
            },
            {
                name: "John Dowe",
            },
            {
                name: "John Appleseed",
            },
            {
                name: "Mohamad Chahadeh",
            },
            {
                name: "John Dowe",
            },
            {
                name: "John Appleseed",
            },
            {
                name: "Mohamad Chahadeh",
            },
            {
                name: "John Dowe",
            },
            {
                name: "John Appleseed",
            },
            {
                name: "Mohamad Chahadeh",
            },
            {
                name: "John Dowe",
            },
            {
                name: "John Appleseed",
            },
            {
                name: "Mohamad Chahadeh",
            },
            {
                name: "John Dowe",
            },
            {
                name: "John Appleseed",
            },
        ],
    }

    return (
        <div id="homePage">
            <NavBar usr={usrObject} signOut={props.signOut}/>
            <ContactsList selectedContact={selectedContact} setSelectedContact={setSelectedContact} usr={usrObject}/>
            <ChatView usr={usrObject} selectedContact={selectedContact} setSelectedContact={setSelectedContact}/>
        </div>
    );

}

export default HomePage;
