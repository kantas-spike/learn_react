import createConnection from "@/components/chat"
import { useEffect } from "react"
import showNotification from "./notifications"

const serverUrl = 'https://localhost:1234'

export default function ChatRoom({roomId, theme}){
    const options = {
        serverUrl: serverUrl,
        roomId: roomId
    }
    useEffect(() => {
        const connection = createConnection(options)
        connection.connect()
        return () => connection.disconnect()
    }, [options])
    return (<h1>Welcom to the chat!</h1>)
}