import { useState } from "react"

export default function AddTask({onAddTask}){
    const [text, setText] = useState('')

    return (
        <section>
            <div className="mb-4">
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={() => {
                    setText('')
                    onAddTask(text)
                }} className="mx-2">Add</button>
            </div>
        </section>
    )
}