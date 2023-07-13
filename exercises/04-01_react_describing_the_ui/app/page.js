import MyLink from "@/components/link";


export default function Home() {
  return (
    <ul className="list-inside list-disc m-6">
      <li><MyLink href="/gallery">Gallery</MyLink></li>
      <li><MyLink href="/todolist">TODO List</MyLink></li>
      <li><MyLink href="/profile">Profile</MyLink></li>
    </ul>
  )
}
