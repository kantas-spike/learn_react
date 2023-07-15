'use client'

import { usePathname } from "next/navigation"
import Link from "next/link";

export default function MyFooter() {
    const pathName = usePathname()
    let content = null
    if (pathName !== "/") {
        content = (<div>
            <hr className="my-4"/>
            <Link href="/">Homeへ戻る</Link>
        </div>)
    }
    return (content)
}