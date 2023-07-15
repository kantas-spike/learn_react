import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="m-4">
        <ul className='list-inside list-disc'>
          <li><Link href="/quiz_form">Quiz Form</Link></li>
        </ul>
      </div>
    </main>
  )
}
