'use client'

import Game from "@/components/game"
import { useEffect, useRef } from "react"

export default function Home() {
  const divRef = useRef(null)
  useEffect(() => {
    if (window.self !== window.top) {
      console.log("in frame")
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.borderBoxSize[0]) {
            console.log(entry.borderBoxSize[0])
            console.log(`h: ${entry.borderBoxSize[0].blockSize}, w: ${entry.borderBoxSize[0].inlineSize}`)
            window.parent.postMessage({ height: entry.borderBoxSize[0].blockSize }, "*")
          }
        }
      })
      resizeObserver.observe(divRef.current)
    } else {
      console.log("not in frame")
    }
    return () => {
      console.log("resizeObserver.disconnect()...")
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div ref={divRef} className="m-4 p-4 border rounded-md">
      <Game/>
    </div>
  )
}
