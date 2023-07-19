'use client'

import ChatRoom from "@/components/chatroom"
import { useState } from "react"

export default function ChatRoomPage(){
    const [isDark, setIsDark] = useState(false)
    const [roomId, setRoomId] = useState('general')
    return (<main>
        <label className="block">
            choose the chat room: {' '}
            <select
                value={roomId}
                onChange={e => setRoomId(e.target.value)}>
                    <option value="general">general</option>
                    <option value="travel">travel</option>
                    <option value="music">music</option>
            </select>
        </label>
        <label htmlFor="chk_dark" className="m-4 block">
            <input type="checkbox" name="chk_dark" id="chk_dark"
                checked={isDark}
                onChange={e => setIsDark(e.target.checked)} />
                Use dark theme
        </label>
        <hr className="m-4"/>
        <ChatRoom roomId={roomId} theme={isDark ? 'dark' : 'light'}></ChatRoom>
    </main>)
}