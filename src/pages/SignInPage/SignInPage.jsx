import { useState, useEffect } from "react";
import "./SignInPage.css";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";


function SignInPage(props) {

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPass, setSignInPass] = useState("");
    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPass, setSignUpPass] = useState("");

    const {login, loading :signInloading, error: signInError} = useLogin();
    const {signup, loading :signUpLoading, error: signUpError} = useSignup();
    const [loading, setLoading] = useState(signInloading || signUpLoading);

    const handleSignIn = async (e) => {
        e.preventDefault();

        login(signInEmail, signInPass);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        signup(signUpName, signUpEmail, signUpPass);
    }

    useEffect(() => {
        setLoading(signInloading || signUpLoading);
    }, [signInloading, signUpLoading]);
    
    return (
        <div id="signInPage">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        {signUpError && <p className="serverMessage">{signUpError}</p>}
                        <input required value={signUpName} onChange={(e) => setSignUpName(e.target.value)} type="text" placeholder="Name"  disabled={loading}/>
                        <input required value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)}  type="email" placeholder="Email"  disabled={loading}/>
                        <input required value={signUpPass} onChange={(e) => setSignUpPass(e.target.value)}   type="password" placeholder="Password"  disabled={loading}/>
                        <button className={loading ? "disabledSubmitButton" : ""} disabled={loading}>{ loading ? "Signing Up" : "Sign Up"}</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form  onSubmit={handleSignIn}>
                        <h1>Sign in</h1>
                        {signInError && <p className="serverMessage">{signInError}</p>}
                        <input required value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} type="email" placeholder="Email"  disabled={loading}/>
                        <input required value={signInPass} onChange={(e) => setSignInPass(e.target.value)}  type="password" placeholder="Password"  disabled={loading}/>
                        <a href="#">Forgot your password?</a>
                        <button className={loading ? "disabledSubmitButton" : ""} disabled={loading}>{loading ? "Signing In..." : "Sign In"}</button>
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