import "./HomePage.css";


function HomePage(props) {

    return (
        <div id="homePage">
            <h1>HOME PAGE</h1>
            <button onClick={() => props.setSignedIn(false)}>Sign out</button>
        </div>
    );

}

export default HomePage;
