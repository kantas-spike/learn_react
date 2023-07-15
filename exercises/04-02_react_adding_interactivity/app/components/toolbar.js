import Button from "@/components/button"

export default function Toolbar({ onPlayMovie, onUploadImage }) {
    return (
        <div>
            <Button onClick={onPlayMovie}>Play Movie</Button>
            <Button onClick={onUploadImage}>Upload Image</Button>
        </div>
    )
}