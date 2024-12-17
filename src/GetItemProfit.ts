import ItemDataUtility from "./ItemDataUtility";

interface UniversalisListingInfo {
    minListing: { world: [Object], dc: [Object], region: [Object] },
    recentPurchase: { world: [Object], dc: [Object], region: [Object] },
    averageSalePrice: { dc: { price: number }, region: { price: number }, world: { price: number } },
    dailySaleVelocity: { dc: [Object], region: [Object] }
}

interface UniversalisItemData {
    itemId: number,
    nq: UniversalisListingInfo,
    hq: UniversalisListingInfo,
    worldUploadTimes: [{worldId: number, timestamp: number}]
}

interface CraftingRecipePrice {
    itemId: number,
    count: number,
    averagePrice: number
}

export interface ItemProfitInterface {
    finalItemId: number,
    finalItemPrice: number,
    profit: number,
    recipeItems: Record<number, CraftingRecipePrice>
}


function GetItemPrice(itemData: UniversalisItemData, quality: string){
    if (itemData === undefined) {
        return -1
    }

    var listingInfo: UniversalisListingInfo = itemData.nq
    switch (quality) {
        case "hq":
            listingInfo = itemData.hq
            if (listingInfo === undefined) {
                listingInfo = itemData.nq
            }
            break;
        case "nq":
            listingInfo = itemData.nq
            break;
    }
    
    if (listingInfo.averageSalePrice === undefined) {
        return -1
    }

    const averageSalePriceData = listingInfo.averageSalePrice
    if (averageSalePriceData.world !== undefined) {
        return averageSalePriceData.world.price
    }    
    else if (averageSalePriceData.dc !== undefined) {
        return averageSalePriceData.dc.price
    }    
    else if (averageSalePriceData.region !== undefined) {
        return averageSalePriceData.region.price
    }

    return -1
}

function GetHqPrice(itemData: UniversalisItemData) {
    return GetItemPrice(itemData, "hq")
}

function GetNqPrice(itemData: UniversalisItemData) {
    return GetItemPrice(itemData, "nq")
}

async function GetItemProfit(finalItemId: number): Promise<ItemProfitInterface> {
    const worldId = 53; // Exodus
    const domain = `https://universalis.app/`;

    const recipe = ItemDataUtility.GetRecipe(finalItemId)
    var queryItems = [finalItemId];
    if (recipe !== null) {
        const recipeIds = recipe.map(item => Number(item.id))
        queryItems = queryItems.concat(recipeIds);
    }
    const endpoint = `${domain}/api/v2/aggregated/${worldId}/${queryItems.toString()}`;

    return fetch(endpoint, {
        method: "GET",
        headers: {},
    })
    .then((res) => res.json())
    .then((data) => {
        const itemData = data.results as Array<UniversalisItemData>;
        const finalItemData = itemData[0];
        const finalItemPrice = GetHqPrice(finalItemData) != -1 ? GetHqPrice(finalItemData) : GetNqPrice(finalItemData)

        const recipePrices = {} as Record<number, number>
        for (let i = 1; i < itemData.length; i++) {
            const itemId = queryItems[i]
            const itemRecord = itemData[i]
            recipePrices[itemId] =  GetHqPrice(itemRecord) != -1 ? GetHqPrice(itemRecord) : GetNqPrice(itemRecord)
        }

        let totalMaterialsPrice = 0;

        const recipeItems = {} as Record<number, CraftingRecipePrice>
        if (recipe !== null) {
            recipe.forEach((recipeItem) => {
                totalMaterialsPrice += recipePrices[Number(recipeItem.id)] * Number(recipeItem.count)
            })

            recipe.forEach((recipeItem) => {
                const itemId = Number(recipeItem.id)
                recipeItems[itemId] = {
                    itemId: itemId,
                    count: Number(recipeItem.count),
                    averagePrice: recipePrices[itemId]
                }
            })
        }
        

        const retValue: ItemProfitInterface = {
            finalItemId: finalItemId,
            finalItemPrice: finalItemPrice,
            profit: finalItemPrice - totalMaterialsPrice,
            recipeItems: recipeItems
        } as ItemProfitInterface

        return retValue
    });
}

export default GetItemProfit