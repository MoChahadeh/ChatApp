import { useState } from "react";
import "./SignInPage.css";
  

function SignInPage(props) {

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPass, setSignInPass] = useState("");
    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPass, setSignUpPass] = useState("");
    
    return (
        <div id="signInPage">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={async () => await props.signIn(true, {email: signUpEmail, name:signUpName, password: signUpPass})}>
                        <h1>Create Account</h1>
                        {props.signUpServerMessage && <p className="serverMessage">{props.signUpServerMessage}</p>}
                        <input required value={signUpName} onChange={(e) => setSignUpName(e.target.value)} type="text" placeholder="Name"  disabled={props.signing}/>
                        <input required value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)}  type="email" placeholder="Email"  disabled={props.signing}/>
                        <input required value={signUpPass} onChange={(e) => setSignUpPass(e.target.value)}   type="password" placeholder="Password"  disabled={props.signing}/>
                        <button className={props.signing ? "disabledSubmitButton" : ""} disabled={props.signing}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form  onSubmit={async () => await props.signIn(false, {email: signInEmail, password: signInPass})}>
                        <h1>Sign in</h1>
                        {props.signInServerMessage && <p className="serverMessage">{props.signInServerMessage}</p>}
                        <input required value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} type="email" placeholder="Email"  disabled={props.signing}/>
                        <input required value={signInPass} onChange={(e) => setSignInPass(e.target.value)}  type="password" placeholder="Password"  disabled={props.signing}/>
                        <a href="#">Forgot your password?</a>
                        <button className={props.signing ? "disabledSubmitButton" : ""} disabled={props.signing}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Already Registered?</h1>
                            <p>Sign In to your account from here</p>
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