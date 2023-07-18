'use client'

import { useContext } from "react";
import { LevelContext } from "./level_context";

export default function Section({children}){
    const level = useContext(LevelContext)
    return (
        <section className="m-2 py-2 px-2 border rounded-md">
            <LevelContext.Provider value={level + 1}>
                {children}
            </LevelContext.Provider>
        </section>
    )
}