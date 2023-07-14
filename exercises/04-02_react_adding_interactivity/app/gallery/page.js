import Gallery from "@/components/gallery";
import { sculptureList } from "@/lib/data";

export default function GalleryPage() {

    return (
        <div>
        <Gallery list={sculptureList}></Gallery>
        </div>
    )
}