import React from 'react';

const ToolCard = ({ icon, title, tools }) => {
    return (
        <div className="glass-card border border-geek-border rounded-xl p-6 glow-hover transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{icon}</span>
                <h3 className="font-mono font-bold text-white">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                    <a
                        key={index}
                        href={tool.url}
                        className="tool-tag px-3 py-1 bg-white/5 border border-white/10 rounded text-sm hover:bg-geek-secondary/20 hover:border-geek-secondary block"
                    >
                        {tool.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ToolCard;
