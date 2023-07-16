'use client'

import { useState } from "react"

export default function Accordion(){
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <div>
            <h2 className="text-2xl mb-4">Almaty, Kazakhstan</h2>
            <Panel
                title="About"
                isActive={activeIndex === 0}
                onShow={()=>setActiveIndex(0)}>
                With a population of about 2 million. Almaty is Kazakhstan&apos;s largest city.
                From 1929 to 1997, it was its capital city.
            </Panel>
            <Panel
                title="Etymology"
                isActive={activeIndex === 1}
                onShow={()=>setActiveIndex(1)}>
                The name comes from <span>алма</span>,
                the Kazakh word for &quot;apple&quot; and is often translated as &quot;full of apples&quot;.
                In fact, the region surrounding Almaty is thought to be the ancestral home of the apple,
                and the wild Malus sieversii is considered a likely candidate for the ancestor of the modern domestic apple.
            </Panel>
        </div>
    )
}

function Panel({title, children, isActive, onShow}) {
    return (
        <section className="border rounded-sm px-4 py-2">
            <h3 className="text-xl">{title}</h3>
            {
                isActive ? (<p>{children}</p>) : (
                    <button className="my-2" onClick={onShow}>show</button>
                )
            }
        </section>
    )
}