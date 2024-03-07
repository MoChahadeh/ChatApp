import "./NavBar.css";
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/fontawesome-free-solid'

import { useAuth } from "../../../../hooks/useAuth";
import { useLogout } from "../../../../hooks/useLogout";

fontawesome.library.add(faUserTie);

function NavBar() {

    const {user} = useAuth();
    const {logout} = useLogout();

    return (
        <div id="navBar">
            <div id="navBar-left">
                <div id="navBar-left-title">
                    <h2 id="navBar-title">ChatApp</h2>
                </div>
            </div>

            <div id="navBar-right">
                <div id="navBar-right-user-icon">
                    <FontAwesomeIcon id="navBar-user-icon" onClick={togglePopUp} icon="fa-solid fa-user-tie" />
                    <div id="user-popup" className="hidden">
                        <div id="user-popup-name">{user.name}</div>
                        <a onClick={logout} id="sign-out-btn">
                            Sign Out
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

}

function togglePopUp() {
    const popup = document.getElementById("user-popup");
    popup.classList.toggle("hidden");
}

export default NavBar;