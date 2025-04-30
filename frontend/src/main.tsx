import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App'
import { ThemeProvider } from './context/Theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </StrictMode>,
)
