import { useState } from "react"
import ItemPanel from "../components/ItemPanel"

const ItemPanelContainer = () => {
    const [numItemPanels, setNumItemPanels] = useState(1)

    const addItemPanel = () => {
        setNumItemPanels(prev => prev + 1)
    }

    return <div className="flex flex-col gap-10 content-center w-full s-3/4 bg-gradient-to-t from-gray-800 to-gray-600/25 p-8 border-4 rounded-3xl border-gray-900">
        {Array.from({length: numItemPanels }).map((_value, _i) => <ItemPanel propItemId={-1}/>)}
        <button className="bg-gray-900/80 hover:bg-gray-800/80 h-32 text-4xl"onClick={addItemPanel}>+</button>
    </div>
}

export default ItemPanelContainer