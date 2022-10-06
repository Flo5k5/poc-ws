import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { HeaderContext } from "src/ui/Layout";

export default function useHeaderTitle(title: string) {
    const [, setHeaderTitle] = useOutletContext<HeaderContext>();

    useEffect(() => {
        setHeaderTitle(title);

        return () => {
            setHeaderTitle('')
        }
    })
}