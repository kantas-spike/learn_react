import { calculateWinner } from "@/lib/game_logic"

export default function Status({xIsNext, squares}) {

    const winner = calculateWinner(squares)
    let status
    if (winner === "draw") {
        status = "this Game is a draw"
    } else if (winner) {
        status = "Winner: " + winner
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O")
    }

    return (<div>
        <div className="text-sm mb-4">{status}</div>
    </div>)
}