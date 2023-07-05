'use client'

import { useState } from "react"
import MyButton from "@/components/button"
import MyLink from "@/components/link"

const pages = [
  { title: 'About', path: '/about' },
  { title: 'Profile', path: '/profile' },
  { title: 'Shopping List', path: '/shopping_list' },
]

export default function Home() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  const listItems = pages.map( (page, idx) => <li key={idx}>
    <MyLink href={page.path}>{page.title}</MyLink>
  </li>)

  return (
    <div className="m-6">
      <h1>Welcom to my app</h1>

      <div className="my-6 flex flex-col max-w-sm gap-4">
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
      </div>

      <ul className="list-disc list-inside mt-6">
        {listItems}
      </ul>
    </div>
  )
}
