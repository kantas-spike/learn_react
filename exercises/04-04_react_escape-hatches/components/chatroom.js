import createConnection from "@/components/chat"
import { useEffect } from "react"

const serverUrl = 'https://localhost:1234'

export default function ChatRoom({roomId}){
    useEffect(() => {
        const connection = createConnection(roomId, serverUrl)
        connection.connect()
        return () => connection.disconnect()
    }, [roomId])
    return (<h1>Welcom to the chat!</h1>)
}