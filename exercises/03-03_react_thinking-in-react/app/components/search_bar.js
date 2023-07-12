export default function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
    return (
        <div className="py-4 px-8 mb-2">
            <input type="text" value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)}
                placeholder="Search..." className="mb-2 pl-1 text-black"></input>
            <div>
                <input name="inStock"  checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}
                    id="inStock" type="checkbox" className="mr-2"></input>
                <label htmlFor="inStock">Only show products in stock</label>
            </div>
        </div>
    )
}