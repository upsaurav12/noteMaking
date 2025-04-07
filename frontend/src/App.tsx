import { useContext } from 'react';
import './App.css';
import { Note } from './component-note/Note';
import { ThemeContext } from './context/Theme';
import React from 'react';

function App() {
    const themeState = useContext(ThemeContext);
    const { theme } = themeState;

    return (
<div className={`min-h-screen  ${theme ? 'bg-gray-900' : 'bg-gray-100'} transition-all duration-300`}>
    <Note />
</div>
    );
}

export default App;