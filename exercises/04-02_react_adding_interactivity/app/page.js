import Image from 'next/image'
import MyLink from './components/link'

export default function Home() {
  return (
    <div>
      <ul>
        <li><MyLink href="/toolbar">Toolbar</MyLink></li>
        <li><MyLink href="/gallery">Gallery</MyLink></li>
        <li><MyLink href="/form">Form</MyLink></li>
        <li><MyLink href="/counter">Counter</MyLink></li>
        <li><MyLink href="/art_form">Art Form</MyLink></li>
        <li><MyLink href="/bucket_list">Bucket List</MyLink></li>
      </ul>
    </div>
  )
}
