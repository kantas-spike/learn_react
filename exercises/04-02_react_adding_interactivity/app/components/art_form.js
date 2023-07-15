'use client'

import { useImmer } from "use-immer"

export default function ArtForm({art}){
    const [person, updatePerson] = useImmer(art)

    function handleNameChange(e) {
        updatePerson(draft => {
            draft.name = e.target.value
        })
    }

    function handleTitleChange(e) {
        updatePerson(draft => {
            draft.artwork.title = e.target.value
        })
    }

    function handleCityChange(e) {
        updatePerson(draft => {
            draft.artwork.city = e.target.value
        })
    }

    function handleImageChange(e) {
        updatePerson(draft => {
            draft.artwork.image = e.target.value
        })
    }

    return (
        <>
            <label className="block m-4">
                <span className="mr-2">Name:</span>
                <input value={person.name}
                    onChange={handleNameChange} />
            </label>
            <label className="block m-4">
            <span className="mr-2">Title:</span>
                <input value={person.artwork.title}
                    onChange={handleTitleChange} />
            </label>
            <label className="block m-4">
            <span className="mr-2">City:</span>
                <input value={person.artwork.city}
                    onChange={handleCityChange} />
            </label>
            <label className="block m-4">
                <span className="mr-2">Image:</span>
                <input value={person.artwork.image}
                    onChange={handleImageChange} />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <img
                src={person.artwork.image}
                alt={person.artwork.name} />
        </>
    )
}