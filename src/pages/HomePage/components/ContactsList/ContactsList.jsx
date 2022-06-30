import "./ContactsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faPenSquare } from "@fortawesome/fontawesome-free-solid";

import {useState} from 'react'

fontawesome.library.add(faPenSquare);

function ContactsList(props) {

	const showChatOf = (index) => {
		props.setSelectedContact(index);
		document.getElementById("chatView").classList.remove("hidden");
	}

	return (
		<div id="contactsListContainer">
			<div id="topBar">
				<input id="searchInput" type="text" placeholder="Search" />
				<a id="newEntryButton">
					<FontAwesomeIcon icon="fa-solid fa-pen-square" />
				</a>
			</div>

			<div id="list">
				{props.usr.contactsList.map((contact, index) => (
					<div key={index} onClick={() => showChatOf(index)} className={"contact " + (props.selectedContact == index ? "contactSelected " : null)}>
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
