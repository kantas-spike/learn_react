'use client'

import MyLink from "@/components/link"
import { usePathname } from "next/navigation"

export default function MyFooter() {
    const pathName = usePathname()

    let content
    if (pathName === "/") {
        content = null
    } else {
        content = <div>
            <hr className='my-4'/>
            <MyLink href="/">Homeへ戻る</MyLink>
        </div>
    }

    return (
        content
    )
}