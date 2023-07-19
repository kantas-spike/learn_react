import createConnection from "@/components/chat"
import { useEffect } from "react"
import showNotification from "./notifications"

const serverUrl = 'https://localhost:1234'

export default function ChatRoom({roomId, theme}){
    useEffect(() => {
        const options = {
            serverUrl: serverUrl,
            roomId: roomId
        }

        const connection = createConnection(options)
        connection.connect()
        return () => connection.disconnect()
    }, [roomId])
    return (<h1>Welcom to the chat!</h1>)
}