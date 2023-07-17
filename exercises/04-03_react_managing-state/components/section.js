'use client'

import { LevelContext } from "./level_context";

export default function Section({level, children}){
    return (
        <section className="m-2 py-2 px-2 border rounded-md">
            <LevelContext.Provider value={level}>
                {children}
            </LevelContext.Provider>
        </section>
    )
}