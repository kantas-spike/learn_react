import ProductCategoryRow from "./product_category_row"
import ProductRow from "./product_row"

export default function ProductTable({products, filterText, inStockOnly}) {
    const grouped_products = products.reduce((group, item) => {
        if (filterText.length > 0 && !item.name.toLowerCase().includes(filterText.toLowerCase())) {
            return group
        }
        if (inStockOnly && !item.stocked) {
            return group
        }
        const category = item.category
        group[category] ||= []
        group[category].push(item)
        return group
    }, {})

    const rows = []
    let idx = 0
    for (const [category] of Object.entries(grouped_products)) {
        rows.push(<ProductCategoryRow key={category} category={category}></ProductCategoryRow>)
        for (const product of grouped_products[category]) {
            idx += 1
            rows.push(<ProductRow key={idx} product={product}></ProductRow>)
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