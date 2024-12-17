import { useEffect, useState } from "react"
import { GetMostProfitableCrafts } from "../ServerInterface"
import ItemPanel from "../components/ItemPanel"

const MostProfitableCraftsPage = () => {
    const [numItemPanels, _setNumItemPanels] = useState(5)
    const [mostProfitableCrafts, setMostProfitableCrafts] = useState([])

    useEffect(() => {
        const asyncFunc = async() => {
            const res = await GetMostProfitableCrafts()
            setMostProfitableCrafts(res)
        }
        asyncFunc()
    }, [])

    return <div className="w-dvw h-auto min-h-dvh flex flex-col items-center z-10">
        <div className="flex flex-col justify-start items-center w-3/4 h-3/4 my-16 gap-8">
            <div className="w-full">
                <h1 className="text-4xl text-black">Top 5 Current Most Profitable Crafts</h1>
            </div>
            {/* <button className="flex flex-col justify-center items-center w-3/4 h-16 bg-gray-600" onClick={Clicked}>Refresh</button> */}
            <div className="flex flex-col gap-10 content-center w-full s-3/4 bg-gradient-to-t from-gray-800 to-gray-600/25 p-8 border-4 rounded-3xl border-gray-900">
                {Array.from({length: numItemPanels }).map((_value, i) => i < mostProfitableCrafts.length && <ItemPanel propItemId={Number(mostProfitableCrafts[i][0])}/>)}
            </div>
        </div>
    </div>
}

export default MostProfitableCraftsPage