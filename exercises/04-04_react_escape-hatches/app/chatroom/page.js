'use client'

import createConnection from "@/components/chat"
import { useEffect } from "react"

export default function ChatRoomPage(){
    useEffect(() => {
        const connection = createConnection()
        connection.connect()
        return () => connection.disconnect()
    }, [])
    return (<main>
        <h1>Welcom to the chat!</h1>
    </main>)
}