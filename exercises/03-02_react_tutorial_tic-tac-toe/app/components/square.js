'use client'

export default function Square({value}) {
    function handleClick() {
        console.log('clicked!')
    }

    return <button onClick={handleClick} className="border w-8 h-8">{value}</button>
}