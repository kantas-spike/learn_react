'use client'

import { useState } from "react"

export default function Square() {
    const [value, setValue] = useState(null)

    function handleClick() {
        setValue('X')
    }

    return <button onClick={handleClick} className="border w-8 h-8">{value}</button>
}