import { useEffect, useState } from "react";

interface WindowScrollState {
    x: number;
    y: number;
}

export const useWindowScroll = (): WindowScrollState => {
    const [scrollPosition, setScrollPosition] = useState<WindowScrollState>({
        x: typeof window !== "undefined" ? window.scrollX : 0,
        y: typeof window !== "undefined" ? window.scrollY : 0,
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition({
                x: typeof window !== "undefined" ? window.scrollX : 0,
                y: typeof window !== "undefined" ? window.scrollY : 0,
            });
        };

        if (typeof window !== "undefined") {
            // Attach the scroll event listener when the component mounts
            window.addEventListener("scroll", handleScroll);

            // Remove the scroll event listener when the component unmounts
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    return scrollPosition;
};