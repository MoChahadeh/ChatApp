import "./ContactsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import {faPenSquare} from "@fortawesome/fontawesome-free-solid";

fontawesome.library.add(faPenSquare)

const myContactsList = [
    {
        name: "Mohamad Chahadeh"
    },
    {
        name: "John Dowe"
    },
    {
        name: "NiggzSlayer69"
    }
]

function ContactsList(props) {


    return (
        <div id="contactsListContainer">
            
            <div id="topBar">
                <input id="searchInput" type="text" placeholder="Search" />
                <a id="newEntryButton">
                    <FontAwesomeIcon icon="fa-solid fa-pen-square" />
                </a>
            </div>

            <div id="list">
                <p>list</p>
            </div>

        </div>
    );
}

export default ContactsList;