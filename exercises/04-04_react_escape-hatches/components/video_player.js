import { useEffect, useRef } from "react"

export default function VideoPlayer({isPlaying, src}){
    const ref = useRef(null)

    useEffect(() => {
        if (isPlaying) {
            ref.current.play()
        } else {
            ref.current.pause()
        }
    }, [isPlaying])

    return (
        <video ref={ref} src={src}></video>
    )
}