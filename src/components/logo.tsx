// Dark mode / Light Mode Sensitive logo

import logo_dark from "../assets/logo-dark.svg"
import logo_light from "../assets/logo-light.svg"

import { useEffect, useState } from "react";

export default function Logo(){
    const [logo, setLogo] = useState<string>(logo_light)

    // Update logo depending on if its dark mode.
    useEffect(() => {
        const checkTheme = (e: MediaQueryListEvent|MediaQueryList) => {

            if (e.matches){
                setLogo(logo_dark)
            }
            else{
                setLogo(logo_light)
            }

        };
    
        const mediaQuery: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        checkTheme(mediaQuery);
        mediaQuery.addEventListener('change', checkTheme);    
        return () => {
            mediaQuery.removeEventListener('change', checkTheme);
        };
    }, []);

    return <img src={logo} className="logo" alt="Ragposium logo"/>
}