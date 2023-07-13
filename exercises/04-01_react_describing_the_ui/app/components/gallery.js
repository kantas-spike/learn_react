import Profile from "@/components/profile"

export default function Gallery() {
    const person={name: 'Katsuko Saruhashi', imageId: 'YfeOqp2'}
    return (
        <section className="rounded-md bg-white text-black p-4">
            <h1 className="mb-6 text-2xl">Amazing scientists</h1>
            <Profile person={person}></Profile>
            <Profile person={person}></Profile>
            <Profile person={person}></Profile>
        </section>
    )
}