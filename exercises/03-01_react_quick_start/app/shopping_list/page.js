const products = [
    { title: 'Cabbage', isFruit: false, id: 1},
    { title: 'Garlic', isFruit: false, id: 2},
    { title: 'Apple', isFruit: true, id: 3},
]

export default function ShoppingList() {
    const listItems = products.map(product =>
        <li key={product.id}
            className={" " +
            (product.isFruit ? " text-amber-700 " : " text-green-700")}
        >
            {product.title}
        </li>
    )
    return (
        <div className="m-6">
            <ul className="list-disc list-inside">{listItems}</ul>
        </div>
    )
}