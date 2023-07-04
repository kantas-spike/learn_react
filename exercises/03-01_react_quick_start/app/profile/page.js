const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90
}

export default function Profile() {
    return (
        <div className="m-8">
        <h1 className="text-2xl mb-3">{user.name}</h1>
        <img className="rounded-full"
            src={user.imageUrl}
            alt={'Photo of ' + user.name}
            style={{
                width: user.imageSize,
                height: user.imageSize
              }}
        />
        </div>
    )
}