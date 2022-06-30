import "./HomePage.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import ContactsList from "./components/ContactsList/ContactsList.jsx";

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
        </div>
    );

}

export default HomePage;
