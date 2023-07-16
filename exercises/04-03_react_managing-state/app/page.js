import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="m-4">
        <ul className='list-inside list-disc'>
          <li><Link href="/quiz_form">Quiz Form</Link></li>
          <li><Link href="/checkin_form">Check in Form</Link></li>
          <li><Link href="/accordion">Accordion</Link></li>
          <li><Link href="/messenger">Messenger</Link></li>
        </ul>
      </div>
    </main>
  )
}
