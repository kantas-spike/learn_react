'use client'

import Board from "@/components/board"
import { useState } from "react"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 == 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move === 0) {
        description = "Go to game start"
    } else {
        description = "Go to move #" + move
    }
    return (
        <li key={move}>
            <button className="border rounded-sm py-1 px-2 my-2" onClick={() => jumpTo(move) }>{description}</button>
        </li>
    )
  })

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Board>
        <div>
            <ol>
                {moves}
            </ol>
        </div>

    </div>
  )
}
