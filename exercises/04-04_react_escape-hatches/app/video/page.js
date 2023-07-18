'use client'

import VideoPlayer from "@/components/video_player";
import { useState } from "react";

export default function VideoPage(){
    const [isPlaying, setIsPlaying] = useState(false)
    return (
        <main>
            <button className="my-4"
                onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <VideoPlayer isPlaying={isPlaying}
                 src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"></VideoPlayer>
        </main>
    )
}