import Square from "./square"

export default function Board() {
    return (
        <div>
            <div className="flex">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="flex">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="flex">
                <Square />
                <Square />
                <Square />
            </div>
        </div>
    )
}