'use client'

import { useState } from "react"

export default function BucketList({artList}){
    const [list, setList] = useState(artList)

    function handleToggle(artworkId, nextSeen)  {
        setList(list.map(artwork => {
            if (artwork.id === artworkId) {
                return { ...artwork, seen: nextSeen }
            } else {
                return artwork
            }
        }))
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