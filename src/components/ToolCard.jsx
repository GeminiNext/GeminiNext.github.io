import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard = ({ icon, title, description, tools }) => {
    return (
        <div className="glass-card border border-geek-border rounded-xl p-6 glow-hover transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{icon}</span>
                <h3 className="font-mono font-bold text-white">{title}</h3>
            </div>
            {description && (
                <p className="text-gray-500 text-xs mb-4 leading-relaxed min-h-[2.5em]">
                    {description}
                </p>
            )}
            <div className="flex flex-wrap gap-2 mt-auto">
                {tools.map((tool, index) => (
                    tool.internal ? (
                        <Link
                            key={index}
                            to={tool.url}
                            className="tool-tag px-3 py-1 bg-white/5 border border-white/10 rounded text-sm hover:bg-geek-secondary/20 hover:border-geek-secondary block"
                        >
                            {tool.name}
                        </Link>
                    ) : (
                        <a
                            key={index}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tool-tag px-3 py-1 bg-white/5 border border-white/10 rounded text-sm hover:bg-geek-secondary/20 hover:border-geek-secondary block"
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
