import { useState } from "react"
import { useTasksDispatch } from "./task_context"

export default function AddTask({onAddTask}){
    const [text, setText] = useState('')
    const dispatch = useTasksDispatch()

    return (
        <section>
            <div className="mb-4">
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={() => {
                    setText('')
                    dispatch({
                        type: 'added',
                        id: nextId++,
                        text: text
                    })
                }} className="mx-2">Add</button>
            </div>
        </section>
    )
}
let nextId = 3;