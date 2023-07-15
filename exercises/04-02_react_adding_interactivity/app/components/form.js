'use client'

import { useState } from "react"

export default function Form(){
    const [to, setTo] = useState('Alice')
    const [message, setMessage] = useState('Hello')

    function handleSubmit(e) {
        e.preventDefault()
        setTimeout(()=> {
            alert(`You said ${message} to ${to}`)
        }, 5000)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="block m-4">
                    To:{' '}
                    <select
                        value={to}
                        onChange={e => setTo(e.target.value)} >
                        <option value="Alice">Alice</option>
                        <option value="Bob">Bob</option>
                    </select>
                </label>
                <textarea
                    className="block m-4"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)} />
                <button className="m-4" type="submit">Send</button>
            </form>
        </div>
    )
}