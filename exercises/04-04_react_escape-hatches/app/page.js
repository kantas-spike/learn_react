import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <ul className='list-inside list-disc'>
        <li><Link href="/counter">Counter</Link></li>
      </ul>
    </main>
  )
}
