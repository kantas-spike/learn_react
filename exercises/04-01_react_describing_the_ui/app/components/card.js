export default function Card({children}) {
    return (<div className="border rounded-xl p-8 inline-flex justify-center">
        {children}
    </div>)
}