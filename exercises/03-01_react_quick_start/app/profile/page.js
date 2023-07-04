import MyButton from "@/components/button"

const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
    isLoggedIn: true
}

export default function Profile() {
    let content
    if (user.isLoggedIn) {
        content = <button className="border rounded-md px-2 py-1">ログアウト</button>
    } else {
        content = <MyButton />
    }
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
        {content}
        <p className="mt-8 text-xs">{ user.isLoggedIn ? (
            <span>ログイン中</span>
            ) : (
            <span>未ログイン</span>
            )
            }</p>
        </div>
    )
}