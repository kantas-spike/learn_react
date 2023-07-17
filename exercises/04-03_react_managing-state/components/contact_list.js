export default function ContactList({contacts, selectedContact, onSelect}){
    return (
        <section className="m-4">
            <ul className="flex flex-col gap-2">
                {
                    contacts.map((contact) => (
                        <li key={contact.email}><button className={"w-full px-4 " + (selectedContact === contact ? "border-blue-400 text-blue-400" : "")} onClick={()=>onSelect(contact)}>{contact.name}</button></li>
                    ))
                }
            </ul>
        </section>
    )
}