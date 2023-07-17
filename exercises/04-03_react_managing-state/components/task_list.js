import { useState } from "react"
import { useTasks, useTasksDispatch } from "./task_context"

export default function TaskList(){
    const tasks = useTasks()
    return (
        <section>
            <ul>
                {
                    tasks.map(task => (
                        <li key={task.id}>
                            <Task task={task} />
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

function Task({task}) {
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useTasksDispatch()

    function handleChangeTask(task) {
        dispatch({
            type: 'changed',
            task: task
        })
    }

    function handleDeleteTask(taskId) {
        dispatch({
            type: 'deleted',
            id: taskId
        })
    }

    let taskContent
    if (isEditing) {
        taskContent = (
            <>
            <input type="text" className="mr-2"
                value={task.text}
                onChange={(e) => {
                    handleChangeTask({
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
                    handleChangeTask({
                        ...task,
                        done: e.target.checked
                    })
                }}
             />
            {taskContent}
        </label>
        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </>
    )
}