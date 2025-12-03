import React from 'react';

const Header = () => {
    return (
        <header className="w-full max-w-6xl mx-auto px-6 py-12 border-b border-geek-border/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                        <span className="text-geek-primary font-mono">&gt;</span> Indie Dev <span className="text-geek-dim">Global Toolkit</span>
                    </h1>
                    <p className="text-geek-dim font-mono text-sm md:text-base mt-2">
                        独立开发出海工具合集 & 黄金时间分配法则
                        <a href="/exam.html" className="ml-4 text-geek-primary hover:underline text-xs border border-geek-primary/30 px-2 py-1 rounded">
                            Take Exam &gt;
                        </a>
                    </p>
                </div>

                <div className="w-full md:w-1/3 flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-mono text-geek-dim uppercase">
                        <span>Discovery</span>
                        <span>Building</span>
                        <span>Growth</span>
                    </div>
                    <div className="w-full h-4 bg-geek-border rounded-full flex overflow-hidden border border-geek-border">
                        <div className="h-full bg-geek-secondary w-[40%] flex items-center justify-center text-[10px] text-black font-bold" title="40% Discovery">40%</div>
                        <div className="h-full bg-geek-dim w-[20%] flex items-center justify-center text-[10px] text-black font-bold" title="20% Building">20%</div>
                        <div className="h-full bg-geek-primary w-[40%] flex items-center justify-center text-[10px] text-black font-bold" title="40% Growth">40%</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
