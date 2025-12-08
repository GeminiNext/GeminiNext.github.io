import React, { useState, useEffect } from 'react';
import { operateKnowledgeData } from '../data/operate_knowledge';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import './ExamOperatePage.css';

const ExamOperatePage = () => {
    // Initialize dark mode from localStorage, default to true for page styling
    // We strictly listen to localStorage here to sync with the Toggle component
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('examPageDarkMode');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem('examPageDarkMode');
            if (saved !== null) {
                setIsDarkMode(JSON.parse(saved));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('theme-change', handleStorageChange); // Listen to custom event from Toggle

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('theme-change', handleStorageChange);
        };
    }, []);

    // Theme Variables
    const containerClasses = isDarkMode
        ? "bg-geek-bg text-gray-300 selection:bg-geek-primary selection:text-black"
        : "bg-gray-50 text-gray-900 selection:bg-blue-200 selection:text-blue-900";

    const titleGradient = isDarkMode
        ? "from-geek-primary to-geek-secondary"
        : "from-blue-600 to-purple-600";

    const subtitleColor = isDarkMode ? "text-geek-dim" : "text-gray-500";

    const categoryTitleClasses = isDarkMode
        ? "text-white border-geek-primary"
        : "text-gray-900 border-blue-500 light";

    const hashColor = isDarkMode ? "text-geek-primary" : "text-blue-600";

    const cardTitleColor = isDarkMode
        ? "text-white group-hover:text-geek-primary"
        : "text-gray-900 group-hover:text-blue-600";

    const tagClasses = isDarkMode
        ? "bg-geek-bg border-geek-border text-geek-dim"
        : "bg-gray-100 border-gray-200 text-gray-600";

    const descColor = isDarkMode
        ? "text-gray-400 border-geek-border"
        : "text-gray-600 border-gray-200";

    const bgPattern = isDarkMode
        ? "bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px)]"
        : "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px)]";

    const headerBorderClass = isDarkMode
        ? "border-[#27272a]/50 bg-[#050505]/80 backdrop-blur-md"
        : "border-gray-200 bg-white/80 backdrop-blur-md";

    const accentColor = isDarkMode ? "text-[#00ff9d]" : "text-blue-600";

    const buttonClasses = isDarkMode
        ? "bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#27272a] hover:border-[#00ff9d] transition-all duration-300"
        : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-blue-500 shadow-sm transition-all duration-300";

    return (
        <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 ${containerClasses} ${bgPattern}`}>

            {/* Header */}
            <header className={`fixed top-0 w-full px-3 md:px-6 py-3 md:py-4 border-b z-50 ${headerBorderClass}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <span className={`font-mono text-lg md:text-xl font-bold ${accentColor} hidden sm:inline`}>&gt;</span>
                        <h1 className="text-base md:text-xl lg:text-2xl font-bold tracking-tight font-mono truncate">
                            <span className="hidden sm:inline">AI Trainer</span>
                            <span className="sm:hidden">AI</span>
                            {' '}
                            <span className={`text-xs md:text-sm px-1.5 md:px-2 py-0.5 rounded border ${isDarkMode ? "border-[#bd93f9]/30 text-[#bd93f9]" : "border-purple-200 text-purple-600"}`}>实操库</span>
                        </h1>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <a
                            href="/exam"
                            className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-mono flex items-center gap-1 md:gap-2 ${buttonClasses}`}
                            title="返回考试"
                        >
                            <span>📝</span>
                            <span className="hidden leading-none lg:inline">考试</span>
                        </a>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-grow w-full max-w-7xl mx-auto px-6 pt-24 md:pt-28 pb-12">
                <div className="text-center mb-16">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${titleGradient}`}>
                        人工智能训练师实操知识库
                    </h1>
                    <p className={`${subtitleColor} text-lg`}>
                        基于知识卡片 1.1.1-2.2.5 整理 • 实战速查手册
                    </p>
                </div>

                <div className="space-y-16">
                    {operateKnowledgeData.map((category, index) => (
                        <div key={index} className="category-section">
                            <h2 className={`flex items-center text-2xl font-bold mb-8 border-l-4 pl-4 ${categoryTitleClasses}`}>
                                <span className={`${hashColor} mr-2`}>#</span>
                                {category.category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, i) => (
                                    <div className={`operate-card group ${isDarkMode ? '' : 'light'}`} key={i}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className={`text-xl font-semibold transition-colors ${cardTitleColor}`}>
                                                {item.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 justify-end">
                                                {item.tags.map((tag, tIndex) => (
                                                    <span key={tIndex} className={`text-xs px-2 py-1 rounded-full border ${tagClasses}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <p className={`text-sm mb-4 leading-relaxed border-b pb-4 ${descColor}`}>
                                            {item.desc}
                                        </p>

                                        <div className="relative">
                                            <div className={`code-block-container ${isDarkMode ? '' : 'light'}`}>
                                                {Array.isArray(item.code) ? (
                                                    item.code.map((line, lineIndex) => (
                                                        <div key={lineIndex} className={`code-line ${isDarkMode ? '' : 'light'}`}>
                                                            <span className="line-number">{lineIndex + 1}</span>
                                                            <code className="line-content">{line}</code>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className={`code-line ${isDarkMode ? '' : 'light'}`}>
                                                        <span className="line-number">1</span>
                                                        <code className="line-content">{item.code}</code>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ExamOperatePage;
