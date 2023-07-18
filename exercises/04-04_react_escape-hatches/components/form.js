'use client'

import { useRef } from "react"

export default function From(){
    const inputRef = useRef(null)

    function handleClick() {
        inputRef.current.focus()
    }

    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={handleClick}>Focus the input</button>
        </>
    )
}