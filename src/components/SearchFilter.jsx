import { useRef, useState, useEffect } from "react"
import ItemImage from "./ItemImage"
import ItemDataUtility from "../ItemDataUtility"

const ProcessFilter = (itemIds, idsToNames, query) => {
    if (query === "") {
        return []
    }
    return itemIds.filter(id => {
        return idsToNames[id].toLowerCase().includes(query.toLowerCase())
    })
}


const SearchFilter = ({itemIds, setSelectedItemName}) => {
    const [query, setQuery] = useState("")
    const inputRef = useRef()
    const [filteredItems, setFilteredItems] = useState([])

    const processFilterMemo = useEffect(() => {
        const filterData = async() => {
            const processedItems = ProcessFilter(itemIds, ItemDataUtility.GetIdsToNames(), query)
            if (!active) {
                return
            }
            setFilteredItems(processedItems.slice(0, 10))
        }

        let active = true
        filterData().catch(console.error)
        return () => { active = false }
    }, [query])

    const ItemSelectedCallback = (itemName) => {
        if (!ItemDataUtility.ValidName(itemName)) {
            return;
        }
        setQuery(itemName)
        setSelectedItemName(itemName)
    }

    return (
        <div className="flex flex-col gap-2">
            <input 
                value={query}
                ref={inputRef}
                onChange={e => setQuery(e.target.value)} 
                type="search"
                placeholder="Enter Item Name"
                className="text-4xl" />
            <br />
            <br />
            {filteredItems.slice(0, 10).map(id => 
                <div className="flex flex-row h-16 gap-4 hover:bg-white/10 p-2" onClick={() => {
                    ItemSelectedCallback(ItemDataUtility.GetNameFromId(id))
                }}>
                    <ItemImage itemId={id} />
                    <h4 key={"searchFilter" + id}>{ItemDataUtility.GetNameFromId(id)}</h4>
                </div>
            )}
        </div>
    )
}

export default SearchFilter