import Image from 'next/image'
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ul>
        <li><Link href="/toolbar">Toolbar</Link></li>
        <li><Link href="/gallery">Gallery</Link></li>
        <li><Link href="/form">Form</Link></li>
        <li><Link href="/counter">Counter</Link></li>
        <li><Link href="/art_form">Art Form</Link></li>
        <li><Link href="/bucket_list">Bucket List</Link></li>
      </ul>
    </div>
  )
}
