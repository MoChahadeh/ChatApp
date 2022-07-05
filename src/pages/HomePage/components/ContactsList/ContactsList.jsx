import "./ContactsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faPenSquare, faSquareXmark } from "@fortawesome/free-solid-svg-icons";

import {useState} from 'react'

fontawesome.library.add(faPenSquare);
fontawesome.library.add(faSquareXmark);

const rootUrl = "http://mocbook-2.local:3011";

function ContactsList(props) {

	const [newConvo, setNewConvo] = useState(false);
	const [search, setSearch] = useState("");
	const [searchedUsers, setSearchedUsers] = useState([]);

	const showChatOf = (contact) => {
		props.setSelectedContact(contact);
		document.getElementById("chatView").classList.remove("hidden");
	}


	async function setSearched(query) {


		if(newConvo) {

			try {
				const res = await fetch(`${rootUrl}/api/users/search?email=${search}`, {
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

		setSearch(query);


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
					<div key={index} onClick={() => showChatOf(convo)} className={"contact " + (props.selectedContact == index ? "contactSelected " : null)}>
						<div className="innerContainer">
                            <div className="contactProfilePic" />
                            <div className="infoColumn">
                                <div className="contactName">{convo.users.filter(obj => obj.email != props.usr.email)[0].name}</div>
                                <div className="contactNumber">+989121234567</div>
                            </div>
                        </div>
					</div>
				))}
			</div>}

			{newConvo && <div className="list">

			{searchedUsers.map((contact, index) => (
					<div key={index} onClick={() => showChatOf(contact)} className={"contact " + (props.selectedContact == index ? "contactSelected " : "")}>
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
			}
		</div>
	);
}

export default ContactsList;
