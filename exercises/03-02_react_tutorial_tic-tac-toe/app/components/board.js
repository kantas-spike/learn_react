import Square from "./square"

export default function Board() {
    return (
        <div>
            <div className="flex">
                <Square value="1" />
                <Square value="2" />
                <Square value="3" />
            </div>
            <div className="flex">
                <Square value="4" />
                <Square value="5" />
                <Square value="6" />
            </div>
            <div className="flex">
                <Square value="7" />
                <Square value="8" />
                <Square value="9" />
            </div>
        </div>
    )
}