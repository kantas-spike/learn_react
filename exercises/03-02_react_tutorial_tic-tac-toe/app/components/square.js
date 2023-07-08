'use client'

export default function Square({value, onSquareClick}) {
    return <button onClick={onSquareClick} className="border w-8 h-8">{value}</button>
}