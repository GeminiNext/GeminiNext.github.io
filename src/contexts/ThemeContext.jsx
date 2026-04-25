import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem(SITE_CONFIG.storageKeys.theme);
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem(SITE_CONFIG.storageKeys.theme, JSON.stringify(isDarkMode));
        // Also sync to old key for exam page compatibility
        localStorage.setItem('examPageDarkMode', JSON.stringify(isDarkMode));
        // Apply class to document root for global CSS hooks
        document.documentElement.classList.toggle('dark', isDarkMode);
        document.documentElement.classList.toggle('light', !isDarkMode);
        // Dispatch event for any legacy listeners
        window.dispatchEvent(new Event('theme-change'));
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext;
