'use client'

import { useImmer } from "use-immer"

export default function BucketList({artList}){
    const [list, updateList] = useImmer(artList)

    function handleToggle(artworkId, nextSeen)  {
        updateList(draft => {
            const artwork = draft.find(a => a.id === artworkId)
            artwork.seen = nextSeen
        })
    }

    return (
        <div className="m-4">
            <h1 className="text-2xl mb-4">Art Bucket List</h1>
            <h2 className="text-lg mb-4">My list of art to see:</h2>
            <ItemList artworks={list} onToggle={handleToggle}></ItemList>
        </div>
    )
}

function ItemList({ artworks, onToggle }) {
    return (
        <ul className="list-inside list-disc">
            { artworks.map(artwork => (
                <li key={artwork.id}>
                    <label>
                        <input type="checkbox"
                            checked={artwork.seen}
                            onChange={e => {
                                onToggle(artwork.id, e.target.checked)
                            }} />
                        <span className="ml-1">{artwork.title}</span>
                    </label>
                </li>
            ))}
        </ul>
    )
}