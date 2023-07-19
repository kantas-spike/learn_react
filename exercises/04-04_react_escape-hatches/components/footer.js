'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'

export default function Footer(){
    const current_path = usePathname()
    return (<>
        {(current_path === "/") ? null :
            <div>
                <hr  className="my-4"/>
                <Link className='m-4' href="/">Homeへ戻る</Link>
            </div>
        }
    </>)
}