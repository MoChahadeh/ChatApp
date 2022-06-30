import "./HomePage.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import ContactsList from "./components/ContactsList/ContactsList.jsx";
import ChatView from "./components/ChatView/ChatView";

const usrObject = {
    name: "John Doe",
    email: "example@example.com",
    admin: false
}

function HomePage(props) {

    return (
        <div id="homePage">
            <NavBar usr={usrObject} setSignedIn={props.setSignedIn}/>
            <ContactsList />
            <ChatView />
        </div>
    );

}

export default HomePage;
