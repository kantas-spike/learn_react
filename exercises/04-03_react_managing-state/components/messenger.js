'use client'

import { useState } from "react";
import Chat from "./chat";
import ContactList from "./contact_list";

export default function Messenger(){
    const [to, setTo] = useState(contacts[0])
    return (
        <div className="flex">
            <ContactList
                contacts={contacts}
                selectedContact={to}
                onSelect={contact => setTo(contact)}></ContactList>
            <Chat key={to.email} contact={to}></Chat>
        </div>
    )
}

const contacts = [
    { name: 'Taylor', email: 'taylor@mail.com' },
    { name: 'Alice', email: 'alice@mail.com' },
    { name: 'Bob', email: 'bob@mail.com' }
]