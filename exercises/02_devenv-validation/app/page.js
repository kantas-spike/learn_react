import Link from 'next/link'

export default function Home() {
  return (
  <div>
    <div class="mt-8 mx-4 text-6xl">はじめてのNext.js</div>
    <div class="my-6 mx-8">
      <ul>
        <li><Link href="/test01" className="underline underline-offset-4 text-blue-500">Test01を表示します</Link></li>
      </ul>
    </div>
  </div>
  )
}