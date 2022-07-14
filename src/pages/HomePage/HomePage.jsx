import "./HomePage.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import ContactsList from "./components/ContactsList/ContactsList.jsx";
import ChatView from "./components/ChatView/ChatView";
import { useState, useEffect } from "react";


function HomePage(props) {

    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {


        setSelectedContact(selectedContact && selectedContact._id ? props.usr.convos.filter(obj => obj._id == selectedContact._id)[0] : selectedContact);

    },[props]);


    return (
        <div id="homePage">
            <NavBar usr={props.usr} signOut={props.signOut}/>
            <ContactsList selectedContact={selectedContact} token={props.token} setSelectedContact={setSelectedContact} usr={props.usr}/>
            <ChatView token={props.token} usr={props.usr} selectedContact={selectedContact} setSelectedContact={setSelectedContact}/>
        </div>
    );

}

export default HomePage;
