import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <ul className='list-inside list-disc'>
        <li><Link href="/counter">Counter</Link></li>
        <li><Link href="/form">Form</Link></li>
        <li><Link href="/video">Video</Link></li>
      </ul>
    </main>
  )
}
