import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ContentParsingPage from './pages/ContentParsingPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ContentParsingPage />
        </BrowserRouter>
    </React.StrictMode>,
)
