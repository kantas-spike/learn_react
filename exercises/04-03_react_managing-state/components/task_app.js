'use client'

import AddTask from "./add_task";
import TaskList from "./task_list";
import TasksProvider from "./task_context";

export default function TaskApp(){
    return (
        <div className="m-4 p-4 border rounded-md">
            <TasksProvider>
                <h1 className="text-2xl mb-4">Prague itinerary</h1>
                <AddTask></AddTask>
                <TaskList></TaskList>
            </TasksProvider>
        </div>
    )
}
