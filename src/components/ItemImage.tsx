import ItemDataUtility from "../ItemDataUtility"

interface ItemImageProps {
    itemId: number
}
const ItemImage = ({itemId}: ItemImageProps) => {
    const imageUrl = ItemDataUtility.GetIconUrl(itemId)
    // const itemName = ItemDataUtility.GetNameFromId(itemId)
    return <img src={imageUrl} alt={`The icon of '${itemId}'`}></img>
}

export default ItemImage