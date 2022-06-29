import "./HomePage.css";
import NavBar from "./components/NavBar";

const usrObject = {
    name: "John Doe",
    email: "example@example.com",
    admin: false
}

function HomePage(props) {

    return (
        <div id="homePage">
            <NavBar usr={usrObject} setSignedIn={props.setSignedIn}/>
        </div>
    );

}

export default HomePage;
