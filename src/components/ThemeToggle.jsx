import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '', showLabel = true, floating = false }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    const buttonClasses = isDarkMode
        ? "bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#27272a] hover:border-[#00ff9d] transition-all duration-300"
        : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-blue-500 shadow-sm transition-all duration-300";

    const floatingClasses = floating
        ? `fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 ${isDarkMode
            ? "bg-[#27272a]/80 text-white hover:bg-[#3f3f46] border border-[#3f3f46]"
            : "bg-white/80 text-gray-900 hover:bg-gray-100 border border-gray-200"
        }`
        : `px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-mono flex items-center gap-1 md:gap-2 ${buttonClasses} ${className}`;

    return (
        <button
            onClick={toggleTheme}
            className={floatingClasses}
            title={isDarkMode ? "切换到浅色模式" : "切换到深色模式"}
        >
            <span className={floating ? "text-xl" : ""}>{isDarkMode ? "☀" : "🌙"}</span>
            {showLabel && !floating && (
                <span className="hidden lg:inline">{isDarkMode ? "Light" : "Dark"}</span>
            )}
        </button>
    );
};

export default ThemeToggle;
