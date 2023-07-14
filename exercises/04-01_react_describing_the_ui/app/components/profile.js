import Avatar from "./avatar";
import Card from "./card";

export default function Profile({person, size=100}) {
    return (
        <Card>
            <Avatar size={size} person={person}></Avatar>
        </Card>
     )
}