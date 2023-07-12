import SearchBar from "./search_bar"
import ProductTable from "./product_table"

export default function FilterableProductTable({products}) {

    return (
        <div className="m-4 p-2 border w-96">
        <SearchBar/>
        <ProductTable products={products} />
        </div>
    )
}