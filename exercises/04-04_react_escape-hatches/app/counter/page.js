'use client'

import { useRef } from "react"

export default function CounterPage(){
    const ref = useRef(0)

    function handleClick() {
        ref.current = ref.current + 1
        alert('You clicked ' + ref.current + ' times!!')
    }

    return (
        <main>
            <button onClick={handleClick}>{`Click me!! : ${ref.current}`}</button>
        </main>
    )
}