'use client'

export default function MyButton() {
    function handleClick() {
        alert('You clicked me!')
    }

    return (
        <button onClick={handleClick} className="border rounded-md px-2 py-1">I'm a button</button>
    )
}