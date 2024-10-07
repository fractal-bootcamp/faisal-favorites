import { useState } from "react"

interface SearchBarProps {
    searchContent: string
}


const SearchBar: React.FC<SearchBarProps> = ({ searchContent }) => {
    const [search, setSearch] = useState<string>(searchContent)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearch(e.target.value)
    }

    return (
        <div className="flex items-center px-1 py-1 mx-4 my-4 rounded-lg shadow-md border border-gray-300">
            <div className="relative w-full rounded-lg">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
                    🔍
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full pl-10 px-2 py-1 text-gray-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                />
            </div>
        </div >
    )
}

export default SearchBar