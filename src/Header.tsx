import ButtonLink from "./components/ButtonLink"

const Header = () => {
    return <header className="flex flex-row bg-gradient-to-t from-gray-900/80 to-gray-600/70 items-end fixed h-16 w-dvw z-20 gap-16 px-8">
        <h1 className="text-4xl">ProFFXIVit</h1>
        <ButtonLink to={`/MostProfitableCrafts`}>Most Profitable Trades</ButtonLink>
        <ButtonLink to={`/ProfitLookup`}>Profit Lookup</ButtonLink>
        <div className="flex-grow"></div>
        <p>Up to date as of FFXIV Dawntrail - Patch 7.1</p>
    </header>
}

export default Header