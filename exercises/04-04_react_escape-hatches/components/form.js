'use client'

import { useEffect, useRef, useState } from "react"

export default function From(){
    const [firstName, setFirstName] = useState('Taylor')
    const [lastName, setLastName] = useState('Swift')
    const inputRef = useRef(null)

    const fullName = firstName + ' ' + lastName

    function handleClick() {
        inputRef.current.focus()
    }

    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={handleClick}>Focus the input</button>
            <h4 className="mt-4">Name</h4>
            <div className="mx-4 mt-1">
                <ul>
                    <li>first name: {firstName}</li>
                    <li>last name: {lastName}</li>
                    <li>full name: {fullName}</li>
                </ul>
            </div>
        </>
    )
}