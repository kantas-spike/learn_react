export default function MyTodoList({person}) {
    return (
        <div style={person.theme}>
            <h1 className="mb-6 text-2xl">{person.name}'s Todos</h1>
            <img
                src={person.image_url}
                alt={person.image_alt}
                className="mb-6" />
            <ul className="list-inside list-disc">
                <li>Invent new traffic lights</li>
                <li>Rehearse a movie scene</li>
                <li>Imporve spectrum technology</li>
            </ul>
        </div>
    )
}