import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from 'react';
export const ThemeContext = createContext({
    theme: false,
    setTheme: () => { },
});
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);
    return (_jsx(ThemeContext.Provider, { value: { theme, setTheme }, children: children }));
};
