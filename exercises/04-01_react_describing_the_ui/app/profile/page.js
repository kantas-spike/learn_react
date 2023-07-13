import Profile from "@/components/profile";

export default function ProfilePage() {
    const person = {name: 'Katsuko Saruhashi', imageId: 'YfeOqp2'}
    return (
        <div className="m-8">
            <Profile person={person}></Profile>
        </div>
    )

}