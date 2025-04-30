import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import './App.css';
import { Note } from './component-note/Note';
import { ThemeContext } from './context/Theme';
function App() {
    const themeState = useContext(ThemeContext);
    const { theme } = themeState;
    return (_jsx("div", { className: `min-h-screen  ${theme ? 'bg-gray-900' : 'bg-gray-100'} transition-all duration-300`, children: _jsx(Note, {}) }));
}
export default App;
