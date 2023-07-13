import { people } from "@/lib/data"
import { getImageUrl } from "@/lib/utils"
import Avatar from "./avatar"

export default function MyList() {
    const listItems = people.map((person) => (
        <li key={person.id} className="flex mx-6 my-8">
            <Avatar person={person}></Avatar>
            <p className="ml-8 w-64">
                <b>{person.name}</b>
                {' ' + person.profession + ' '}
                known for {person.accomplishment}
            </p>
        </li>
    ))
    return (
        <article>
            <h1 className="text-2xl">Scientists</h1>
            <ul>
                {listItems}
            </ul>
        </article>
    )
}