import Image from 'next/image'
import MyLink from './components/link'

export default function Home() {
  return (
    <div>
      <MyLink href="/toolbar">Toolbar</MyLink>
    </div>
  )
}
