import Image from 'next/image'
import MyLink from './components/link'

export default function Home() {
  return (
    <div>
      <ul>
        <li><MyLink href="/toolbar">Toolbar</MyLink></li>
        <li><MyLink href="/gallery">Gallery</MyLink></li>
      </ul>
    </div>
  )
}
