
import rawItemIdsToNames from "./itemIdsToNames.json";
import BlankIcon from "./assets/images/emperors-new-ring.png"
const idsToNames: Record<number, string> = rawItemIdsToNames
import rawRecipes from "./recipes.json"
const recipes: Record<string, RecipeItem[]> = rawRecipes

interface RecipeItem {
    id: number,
    count: number
}

class ItemNameData {
    static namesToIds: Record<string, number> = {}
    static lowerCaseNamesToIds: Record<string, number> = {}
    static initialized = false

    static Initialize() {
        Object.keys(idsToNames).forEach(id => {
            const name = idsToNames[Number(id)]
            ItemNameData.namesToIds[name] = Number(id)
            ItemNameData.lowerCaseNamesToIds[name.toLowerCase()] = Number(id)
        })
    }

    static ValidId(id: number) {
        return id in idsToNames
    }

    static ValidName(name: string) {
        return name in this.namesToIds
    }

    static GetNameFromId(id: number) {
        if (!this.initialized) {
            this.Initialize()
        }
        return idsToNames[id]
    }

    static GetIdFromName(name: string) {
        if (!this.initialized) {
            this.Initialize()
        }
        if (name in this.namesToIds) {
            return this.namesToIds[name]
        }

        name.toLowerCase()
        if (name in this.lowerCaseNamesToIds) {
            return this.lowerCaseNamesToIds[name]
        }
        return -1
    }

    static GetIconUrl(id: number) {
        if (!this.ValidId(id)) {
            return BlankIcon
        }
        return `https://universalis-ffxiv.github.io/universalis-assets/icon2x/${id}.png`
    }

    static GetAllItemIds() {
        if (!this.initialized) {
            this.Initialize()
        }
        return Object.keys(idsToNames)
    }

    static GetAllItemNames() {
        if (!this.initialized) {
            this.Initialize()
        }
        return Object.keys(this.namesToIds)
    }

    static GetIdsToNames() {
        return idsToNames
    }

    static GetRecipe(id: number) {
        if (id in recipes) {
            return recipes[id]
        }
        return null
    }

    static GetAllRecipeIds() {
        return Object.keys(recipes)
    }
}

export default ItemNameData