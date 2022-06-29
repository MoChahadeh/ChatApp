import "./SignInPage.css";
// import "./styleAnimations.js";


function SignInPage(props) {
    
    return (
        <div id="signInPage">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Already Registered?</h1>
                            <p>Sign In to user account from here</p>
                            <button className="ghost" id="signIn" onClick={() => document.getElementById("container").classList.remove("right-panel-active")}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>New Here?</h1>
                            <p>Sign up with your email address from here</p>
                            <button className="ghost" id="signUp" onClick={() => document.getElementById("container").classList.add("right-panel-active")}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignInPage;