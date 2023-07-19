'use client'

import ChatRoom from "@/components/chatroom"
import { useState } from "react"

export default function ChatRoomPage(){
    const [roomId, setRoomId] = useState('general')
    return (<main>
        <label>
            choose the chat room: {' '}
            <select
                value={roomId}
                onChange={e => setRoomId(e.target.value)}>
                    <option value="general">general</option>
                    <option value="travel">travel</option>
                    <option value="music">music</option>
            </select>
        </label>
        <hr className="m-4"/>
        <ChatRoom roomId={roomId}></ChatRoom>
    </main>)
}