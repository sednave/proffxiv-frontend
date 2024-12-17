import ItemPanelContainer from "./ItemPanelContainer"

const ProfitCalculatorPage = () => {
    return <div className="w-dvw h-auto min-h-dvh flex flex-col items-center z-10">
        <div className="flex flex-col justify-start items-center w-3/4 h-3/4 my-16 gap-8">
            <div className="w-full">
                <h1 className="text-4xl text-black">Profit Calculator</h1>
            </div>
            <ItemPanelContainer />
        </div>
    </div>
}

export default ProfitCalculatorPage