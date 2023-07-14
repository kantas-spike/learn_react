import ArtForm from "@/components/art_form";

export default function ArtFormPage(){
    const art = {
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    }

    return (
        <div>
            <ArtForm art={art}></ArtForm>
        </div>
    )
}