export default function SearchBar() {
    return (
        <div className="py-4 px-8 mb-2">
            <input type="text" placeholder="Search..." className="mb-2 pl-1"></input>
            <div>
                <input name="inStock" id="inStock" type="checkbox" className="mr-2"></input>
                <label htmlFor="inStock">Only show products in stock</label>
            </div>
        </div>
    )
}