import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
    const { isDarkMode } = useTheme();

    return (
        <footer className={`w-full border-t py-8 text-center text-sm font-mono transition-colors duration-300 ${
            isDarkMode
                ? 'border-geek-border/50 text-geek-dim'
                : 'border-gray-200 text-gray-500'
        }`}>
            <p className="mb-2">
                All about indie dev.{' '}
                <span className={isDarkMode ? 'text-geek-primary' : 'text-blue-600'}>Ship Fast.</span>
            </p>
            <div className="flex justify-center gap-4 text-xs">
                <Link to="/about" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>关于我们</Link>
                <span className={isDarkMode ? 'text-geek-border' : 'text-gray-300'}>|</span>
                <Link to="/privacy" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>隐私政策</Link>
                <span className={isDarkMode ? 'text-geek-border' : 'text-gray-300'}>|</span>
                <a href="mailto:sunstar1227@126.com" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>联系我们</a>
            </div>
        </footer>
    );
};

export default Footer;
