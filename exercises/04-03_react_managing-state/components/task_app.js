'use client'

import { useReducer } from "react";
import AddTask from "./add_task";
import TaskList from "./task_list";

export default function TaskApp(){
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

    function handleAddTask(text) {
        dispatch({
            type: 'added',
            id: nextId++,
            text: text
        })
    }

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

    return (
        <div className="m-4 p-4 border rounded-md">
            <h1 className="text-2xl mb-4">Prague itinerary</h1>
            <AddTask onAddTask={handleAddTask}></AddTask>
            <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask}></TaskList>
        </div>
    )
}

function tasksReducer(tasks, action) {
    switch(action.type) {
        case 'added': {
            return [...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ]
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task
                } else {
                    return t
                }
            })
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id)
        }
        default: {
            throw Error(`Unknown action: ${action.type}`)
        }
    }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];