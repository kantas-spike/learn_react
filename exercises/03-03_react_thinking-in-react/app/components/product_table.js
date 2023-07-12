import ProductCategoryRow from "./product_category_row"
import ProductRow from "./product_row"

export default function ProductTable({products}) {
    const grouped_products = products.reduce((group, item) => {
        const category = item.category
        group[category] ||= []
        group[category].push(item)
        return group
    }, {})

    const rows = []
    for (const [category] of Object.entries(grouped_products)) {
        rows.push(<ProductCategoryRow category={category}></ProductCategoryRow>)
        for (const product of grouped_products[category]) {
            rows.push(<ProductRow product={product}></ProductRow>)
        }
    }

    return (
        <div className="px-8 pb-4">
            <table>
                <thead>
                    <tr><th>Name</th><th>Price</th></tr>
                </thead>
                <tbody>
                { rows }
                </tbody>
            </table>

        </div>
    )
}