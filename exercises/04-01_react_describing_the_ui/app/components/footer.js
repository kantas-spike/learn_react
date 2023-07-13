'use client'

import { usePathname } from "next/navigation"
import MyLink from "@/components/link"

export default function MyFooter() {
    const pathName = usePathname()
    let content = null
    if (pathName !== "/") {
        content = (<div>
            <hr className="my-4"/>
            <MyLink href="/">Homeへ戻る</MyLink>
        </div>)
    }
    return (content)
}