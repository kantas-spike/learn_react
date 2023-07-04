'use client'

import { useState } from "react"

export default function MyButton() {

    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <button onClick={handleClick} className="border rounded-md px-2 py-1">Clicked {count} times!</button>
    )
}