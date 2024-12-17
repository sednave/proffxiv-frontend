import { ReactNode } from 'react'
import { Link } from 'react-router-dom'


interface ButtonLinkProps {
    to: string,
    children: ReactNode
}
const ButtonLink = ({to, children}: ButtonLinkProps) => {
    return <Link to={to} className="h-full w-64 p-4">
        <button className="hover:border-none">
            {children}
        </button>
    </Link>
}
export default ButtonLink