import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export default function Button({ children, ...props }: Props) {
    return <button className="px-4 py-2 font-semibold text-sm bg-slate-800 text-white rounded-full shadow-sm" {...props}>{children}</button>
}