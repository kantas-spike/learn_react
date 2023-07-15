'use client'

import { useState } from "react"

export default function Gallery({list}) {
    const [index, setIndex] = useState(0)
    const [showMore, setShowMore] = useState(false)
    const hasNext = index < list.length - 1;

    function handleNextClick() {
        if (hasNext) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
    }

    function handleMoreClick() {
        setShowMore(!showMore)
    }

    let item = list[index]

    return (
        <>
        <button className="m-2" onClick={handleNextClick}>Next</button>
        <h2 className="m-2"><i>{item.name}</i> by {item.artist}</h2>
        <h3 className="m-2">
            ({index + 1} of {list.length})
        </h3>
        <button className="m-2" onClick={handleMoreClick}>
            {showMore ? 'Hide' : 'Show'} details
        </button>

        {
            showMore && <p className="m-2 mb-6">{item.description}</p>
        }

        <img className="m-2" src={item.url} alt={item.alt} />
        </>
    )
}