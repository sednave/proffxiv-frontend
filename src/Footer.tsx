const Footer = () => {
    const emailAddress = "wivyrn@proton.me"
    return <footer className="flex flex-row items-end justify-between w-dvw h-16 p-4 bg-gradient-to-t from-gray-900/80 to-gray-600/70 z-40">
        <p>Issues? Contact me at <a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
    </footer>
}
export default Footer