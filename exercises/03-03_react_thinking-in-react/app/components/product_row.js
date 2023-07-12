export default function ProductRow({product}) {

    const name = product.stocked ? product.name : (
        <span className="text-red-500">{product.name}</span>
    )

    return (<tr>
        <td>{name}</td>
        <td className="pl-4">{product.price}</td>
    </tr>)
}