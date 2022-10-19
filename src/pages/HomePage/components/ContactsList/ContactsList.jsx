import "./ContactsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faPenSquare, faSquareXmark } from "@fortawesome/free-solid-svg-icons";

import {useState} from 'react'

fontawesome.library.add(faPenSquare);
fontawesome.library.add(faSquareXmark);

function ContactsList(props) {

	const [newConvo, setNewConvo] = useState(false);
	const [search, setSearch] = useState("");
	const [searchedUsers, setSearchedUsers] = useState([]);

	const showChatOf = (contact) => {
		props.setSelectedContact(contact);
		document.getElementById("chatView").classList.remove("hidden");
	}

	const newConvoObj = (contact) => {

		return {
			users: [props.usr, contact],
			messages: [],
		}

	}


	async function setSearched(query) {

		setSearch(query);

		if(newConvo) {

			try {
				const res = await fetch(`${process.env.REACT_APP_ROOT_URL}/api/users/search?email=${search}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"x-auth-token": props.token,
					}
				})

				if(res.status == 200) {

					const data = await res.json();

					setSearchedUsers(data);

				} else {
					throw new Error("Couldn't find users");
				}
			} catch (err) {
				console.log(err);
			}

		} 


	}

	return (
		<div id="contactsListContainer">
			<div id="topBar">
				<input id="searchInput" value={search} onChange={async (e) => await setSearched(e.target.value)} type="text" placeholder={newConvo ? "Start new conversation with.." : "Search conversations"} />
				<a id="newEntryButton" onClick={() => setNewConvo(!newConvo)}>
					{!newConvo && <FontAwesomeIcon icon="fa-solid fa-pen-square" />}
					{newConvo &&<FontAwesomeIcon icon="fa-solid fa-square-xmark" />}
				</a>
			</div>

			{!newConvo && <div className="list">
				{props.usr.convos.map((convo, index) => (
					<div key={index} onClick={() => showChatOf(convo)} className={"contact " + (props.selectedContact && props.selectedContact.users.some(obj1=> obj1._id == convo.users.filter(obj=> obj._id != props.usr._id)[0]._id) ? "contactSelected " : null)}>
						<div className="innerContainer">
                            <div className="contactProfilePic" />
                            <div className="infoColumn">
                                <div className="contactName">{convo.users.filter(obj => obj.email != props.usr.email)[0].name}</div>
                                {/* <div className="contactNumber">{convo.users.filter(obj => obj.email != props.usr.email)[0].email}</div> */}
                            </div>
                        </div>
					</div>
				))}
			</div>}

			{newConvo && <div className="list">
			{searchedUsers.map((contact, index) => (
					<div key={index} onClick={() => showChatOf(newConvoObj(contact))} className={"contact " + (props.selectedContact && props.selectedContact.users.some(obj => obj._id == contact._id) ? "contactSelected " : "")}>
						<div className="innerContainer">
                            <div className="contactProfilePic" />
                            <div className="infoColumn">
                                <div className="contactName">{contact.name}</div>
                                {/* <div className="contactNumber">{contact.email}</div> */}
                            </div>
                        </div>
					</div>
				))}
			</div>
			}
		</div>
	);
}

export default ContactsList;
