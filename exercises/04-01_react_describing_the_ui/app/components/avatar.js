import { getImageUrl } from "@/lib/utils";

export default function Avatar({person, size}) {
    return <img
                className="rounded-full"
                src={getImageUrl(person)}
                alt={person.name}
                width={size}
                height={size} />
}