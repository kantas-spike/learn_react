import createConnection from "@/components/chat"
import { useEffect } from "react"
import showNotification from "./notifications"

const serverUrl = 'https://localhost:1234'

export default function ChatRoom({roomId, theme}){
    useEffect(() => {
        const connection = createConnection(roomId, serverUrl)
        connection.on('connected', () => {
            showNotification('Connected!', theme)
        })
        connection.connect()
        return () => connection.disconnect()
    }, [roomId, theme])
    return (<h1>Welcom to the chat!</h1>)
}