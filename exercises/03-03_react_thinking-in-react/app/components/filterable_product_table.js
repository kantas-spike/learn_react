'use client'

import SearchBar from "./search_bar"
import ProductTable from "./product_table"
import { useState } from "react"

export default function FilterableProductTable({products}) {
    const [filterText, setFilterText] = useState('')
    const [inStockOnly, setInStockOnly] = useState(false)

    return (
        <div className="m-4 p-2 border w-96">
        <SearchBar
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={setFilterText}
            onInStockOnlyChange={setInStockOnly}
             />
        <ProductTable
            products={products}
            filterText={filterText}
            inStockOnly={inStockOnly} />
        </div>
    )
}