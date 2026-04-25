import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const ToolCard = ({ icon, title, description, tools }) => {
    const { isDarkMode } = useTheme();

    const cardBg = isDarkMode
        ? 'glass-card border-geek-border glow-hover'
        : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400';
    const titleColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const descColor = isDarkMode ? 'text-gray-500' : 'text-gray-600';
    const tagBg = isDarkMode
        ? 'bg-white/5 border-white/10 hover:bg-geek-secondary/20 hover:border-geek-secondary'
        : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-400 text-gray-700';

    return (
        <div className={`${cardBg} border rounded-xl p-6 transition-all duration-300 flex flex-col h-full`}>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{icon}</span>
                <h3 className={`font-mono font-bold ${titleColor}`}>{title}</h3>
            </div>
            {description && (
                <p className={`${descColor} text-xs mb-4 leading-relaxed min-h-[2.5em]`}>
                    {description}
                </p>
            )}
            <div className="flex flex-wrap gap-2 mt-auto">
                {tools.map((tool, index) => (
                    tool.internal ? (
                        <Link
                            key={index}
                            to={tool.url}
                            className={`tool-tag px-3 py-1 border rounded text-sm block ${tagBg}`}
                        >
                            {tool.name}
                        </Link>
                    ) : (
                        <a
                            key={index}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`tool-tag px-3 py-1 border rounded text-sm block ${tagBg}`}
                        >
                            {tool.name}
                        </a>
                    )
                ))}
            </div>
        </div>
    );
};

export default ToolCard;
