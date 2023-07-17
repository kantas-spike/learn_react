'use client'

import { useState } from "react"

export default function CheckInForm(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const fullName = firstName + ' ' + lastName

    function handleFirstName(e) {
        setFirstName(e.target.value)
    }

    function handleLastName(e) {
        setLastName(e.target.value)
    }

    return (
        <div className="m-6 border rounded-md p-6">
            <h2 className="text-2xl mb-4">Let's check you in</h2>
            <label className="block mb-4">
                First name: {' '}
                <input type="text" value={firstName} onChange={handleFirstName} />
            </label>
            <label className="block mb-4">
                Last name: {' '}
                <input type="text" value={lastName} onChange={handleLastName} />
            </label>
            <p>
                Your ticket will be issued to: <b>{fullName}</b>
            </p>
        </div>
    )
}