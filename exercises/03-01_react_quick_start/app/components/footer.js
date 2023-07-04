'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MyFooter() {
    const pathName = usePathname()

    let content
    if (pathName === "/") {
        content = null
    } else {
        content = <div>
            <hr className='my-4'/>
            <Link href="/" className="underline underline-offset-4 text-blue-400">Homeへ戻る</Link>
        </div>
    }

    return (
        content
    )
}