export default function createConnection(serverUrl, roomId){
    return {
        connect() {
            console.log(`✅ Connecting to '${roomId}' room at ${serverUrl}...`)
        },
        disconnect() {
            console.log(`❌ Disconnected from '${roomId}' at ${serverUrl}.`)
        }
    }
}