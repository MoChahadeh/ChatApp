import "./ContactsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faPenSquare } from "@fortawesome/fontawesome-free-solid";

fontawesome.library.add(faPenSquare);

const myContactsList = [
	{
		name: "Mohamad Chahadeh",
	},
	{
		name: "John Dowe",
	},
	{
		name: "John Appleseed",
	},
];

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
				{myContactsList.map((contact, index) => (
					<div key={index} className="contact">
						<div className="innerContainer">
                            <div className="contactProfilePic" />
                            <div className="infoColumn">
                                <div className="contactName">{contact.name}</div>
                                <div className="contactNumber">+989121234567</div>
                            </div>
                        </div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ContactsList;
