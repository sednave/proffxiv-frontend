import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined,
  children: ReactNode
}
const Button = ({onClick, children}: ButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;