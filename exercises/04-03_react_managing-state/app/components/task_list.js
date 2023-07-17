import { useState } from "react"

export default function TaskList({tasks, onChangeTask, onDeleteTask}){
    return (
        <section>
            <ul>
                {
                    tasks.map(task => (
                        <li key={task.id}>
                            <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

function Task({task, onChange, onDelete}) {
    const [isEditing, setIsEditing] = useState(false)
    let taskContent
    if (isEditing) {
        taskContent = (
            <>
            <input type="text" className="mr-2"
                value={task.text}
                onChange={(e) => {
                    onChange({
                        ...task,
                        text: e.target.value,
                    })
                }} />
                <button className="mr-2" onClick={() => setIsEditing(false)}>Save</button>
            </>
        )
    } else {
        taskContent = (
            <>
            <span className="mr-2">{task.text}</span>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
        )
    }

    return (
        <>
        <label htmlFor={`t_${task.id}`} className="mr-2">
            <input type="checkbox" name={`t_${task.id}`} id={`t_${task.id}`} className="mr-1"
                checked={task.done}
                onChange={(e) => {
                    onChange({
                        ...task,
                        done: e.target.checked
                    })
                }}
             />
            {taskContent}
        </label>
        <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
    )
}