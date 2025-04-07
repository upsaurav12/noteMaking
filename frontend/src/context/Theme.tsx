import { createContext, useState } from "react";
import React from "react";
export const ThemeContext = createContext(false)

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState<boolean>(false);
    return <ThemeContext.Provider value={{ theme, setTheme }}>
        {props.children}
    </ThemeContext.Provider>
}