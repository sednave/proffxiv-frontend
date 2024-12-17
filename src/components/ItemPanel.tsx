import { useEffect, useState } from "react";
import GetItemProfit, { ItemProfitInterface } from "../GetItemProfit";
import ItemDataUtility from "../ItemDataUtility"
import GilIcon from "../assets/images/ffxiv-gil-icon.webp"
import DownArrow from "../assets/images/down-arrow.png"
import UpArrow from "../assets/images/up-arrow.png"
import SearchFilter from "./SearchFilter";
import ItemImage from "./ItemImage"



const defaultItemProfitInterface: ItemProfitInterface = {
    finalItemId: 0,
    finalItemPrice: 0,
    profit: 0,
    recipeItems: {}
} as ItemProfitInterface


interface ItemPricePanelProps {
    itemName: string,
    itemId: number,
    averagePrice: number,
    count: number
}
const ItemPricePanel = ({itemName, itemId, averagePrice, count}: ItemPricePanelProps) => {
    return <div className="flex flex-row h-16 gap-4">
        <ItemImage itemId={itemId} />
        <div className="flex items-center"> 
            <p>{itemName}</p>
        </div>
        <div className="flex flex-row items-center gap-4">
            <div className="flex flex-col justify-center items-center">
                <img src={GilIcon} className="h-8" />
                <p>{Math.floor(averagePrice).toLocaleString()}</p>
            </div>
            <p>x {count} = </p>
            <div className="flex flex-col justify-center items-center">
                <img src={GilIcon} className="h-8" />
                <p>{(Math.floor(averagePrice) * count).toLocaleString()}</p>
            </div>
        </div>
    </div>
}


interface RecipePanelProps {
    itemId: number
    itemProfitData: ItemProfitInterface, 
}
const RecipePanel = ({itemProfitData}: RecipePanelProps) => {
    const recipeItemIds = Object.keys(itemProfitData.recipeItems)
    const mappedItemPricePanels = recipeItemIds.map(id => {
        const materialData = itemProfitData.recipeItems[Number(id)];
        return <ItemPricePanel key={id} 
            itemName={ItemDataUtility.GetNameFromId(Number(id))} 
            itemId={Number(id)} 
            averagePrice={materialData.averagePrice} 
            count={materialData.count} />
    })

    return <div className="flex flex-col gap-2 pl-16">
        {mappedItemPricePanels}
    </div>
}


interface ItemPanelProps {
    propItemId: number
}
const ItemPanel = ({propItemId=-1}: ItemPanelProps) => {
    var propItemName = ""
    if (propItemId !== -1) {
        propItemName = ItemDataUtility.GetNameFromId(propItemId)
    }
    const [itemName, setItemName] = useState(propItemName)
    const [itemProfitData, setItemProfitInterface] = useState(defaultItemProfitInterface);
    const [showRecipePanel, setShowRecipePanel] = useState(false)

    useEffect(() => {
        const itemId = ItemDataUtility.GetIdFromName(itemName)
        GetItemProfit(itemId)
        .then(data => {
            setItemProfitInterface(data)
        })
    }, [itemName])

    const ItemSelectedCallback = (itemName: string) => {
        setItemName(itemName)
    }

    if (itemName === "") {
        return <div className="flex flex-row gap-8 items-top h-fit bg-gray-800 border-4 rounded-2xl border-black/20 p-8">
            <div className="h-32 w-32">
                <ItemImage itemId={0} />
            </div>
            <SearchFilter itemIds={ItemDataUtility.GetAllItemIds()} setSelectedItemName={ItemSelectedCallback}/>
        </div>
    }

    const itemId = ItemDataUtility.GetIdFromName(itemName)
    const itemProfitDataInitialized = itemProfitData !== defaultItemProfitInterface
    const hasRecipe = Object.keys(itemProfitData.recipeItems).length > 0
    const Clicked = () => {
        if (!showRecipePanel && itemProfitDataInitialized && hasRecipe) {
            setShowRecipePanel(true)
        }
        else {
            setShowRecipePanel(false)
        }
    }

    let totalMaterialsPrice = 0
    Object.values(itemProfitData.recipeItems).forEach((recipeItem) => {
        totalMaterialsPrice += recipeItem.averagePrice * Number(recipeItem.count)
    })

    return <>
        <div className="flex flex-col gap-5 border-4 rounded-2xl border-black/20 p-8 bg-gray-800 hover:bg-gray-700" onClick={Clicked}>
            <div className="h-32 flex flex-row gap-8 items-center">
                <ItemImage itemId={itemId} />
                <div className="flex flex-col">
                    <p className="text-4xl">{itemName}</p>
                    <div className="pl-16 h-28">
                        {itemProfitDataInitialized && <div className="flex flex-row gap-4 items-center">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xl">Price</p>
                                <img src={GilIcon} />
                                <p>{Math.floor(itemProfitData.finalItemPrice).toLocaleString()}</p>
                            </div>
                            <p>-</p>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xl">Materials</p>
                                <img src={GilIcon} />
                                <p>{Math.floor(totalMaterialsPrice).toLocaleString()}</p>
                            </div>
                            <p>=</p>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xl">Profit</p>
                                <img src={GilIcon} />
                                <p>{Math.floor(itemProfitData.profit).toLocaleString()}</p>
                            </div>
                            <p>{Math.floor(itemProfitData.finalItemPrice / totalMaterialsPrice * 100).toLocaleString()}% return</p>
                        </div>}
                    </div>
                </div>
                <div className="flex-grow"></div>
                {!showRecipePanel && hasRecipe && <img src={DownArrow} />}
                {showRecipePanel && <img src={UpArrow} />}
            </div>
            {showRecipePanel && <RecipePanel itemId={itemId} itemProfitData={itemProfitData} />}
        </div>
    </>
}

export default ItemPanel