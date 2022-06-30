import "./ContactsList.css";


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
            
            <div id="searchBar"><p>search bar</p></div>

            <div id="list">
                <p>list</p>
            </div>

        </div>
    );
}

export default ContactsList;