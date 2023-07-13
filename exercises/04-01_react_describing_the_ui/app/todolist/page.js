import MyTodoList from "@/components/todolist";

export default function TodoListPage() {
    const person = {
        name: 'Gergorio Y. Zara',
        theme: {
            backgroundColor: 'black',
            color: 'pink'
        },
        image_url: 'https://i.imgur.com/7vQD0fPs.jpg',
        image_alt: 'Gergorio Y. Zara'
    }
    return (<div className="m-8">
        <MyTodoList person={person}></MyTodoList>
    </div>)
}