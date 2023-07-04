'use client'

export default function MyButton({count, onClick}) {
    return (
        <button onClick={onClick} className="border rounded-md px-2 py-1">Clicked {count} times!</button>
    )
}