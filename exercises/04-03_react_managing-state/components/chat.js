import { useState } from "react"

export default function Chat({contact}){
    const [text, setText] = useState('')
    return (
        <section className="m-4">
            <textarea rows={8} cols={24} placeholder={"Chat to " + contact.name}
                value={text}
                onChange={e => setText(e.target.value)}></textarea>
            <br />
            <button>Send to {contact.email}</button>
        </section>
    )
}