import React, { useState } from 'react';

const ExamPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Toggle theme handler
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Theme-based styles
    const containerClasses = isDarkMode
        ? "bg-[#050505] text-gray-300 selection:bg-[#00ff9d] selection:text-black"
        : "bg-gray-50 text-gray-900 selection:bg-blue-500 selection:text-white";

    const bgPattern = isDarkMode
        ? "bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px]"
        : "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px]";

    const headerBorderClass = isDarkMode
        ? "border-[#27272a]/50 bg-[#050505]/80 backdrop-blur-md"
        : "border-gray-200 bg-white/80 backdrop-blur-md";

    const cardClasses = isDarkMode
        ? "bg-[#0f0f0f]/70 border-[#27272a] text-white shadow-[0_0_15px_rgba(0,255,157,0.05)]"
        : "bg-white/70 border-gray-200 text-gray-900 shadow-lg";

    const accentColor = isDarkMode ? "text-[#00ff9d]" : "text-blue-600";
    const secondaryColor = isDarkMode ? "text-[#bd93f9]" : "text-purple-600";

    const buttonClasses = isDarkMode
        ? "bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#27272a] hover:border-[#00ff9d] transition-all duration-300"
        : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-blue-500 shadow-sm transition-all duration-300";

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${containerClasses} ${bgPattern}`}>
            {/* Custom Header */}
            <header className={`fixed top-0 w-full px-6 py-4 border-b z-50 ${headerBorderClass}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className={`font-mono text-xl font-bold ${accentColor}`}>&gt;</span>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight font-mono">
                            AI Trainer <span className={`text-sm px-2 py-0.5 rounded border ${isDarkMode ? "border-[#bd93f9]/30 text-[#bd93f9]" : "border-purple-200 text-purple-600"}`}>Lvl.3</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`hidden md:block font-mono text-xs ${isDarkMode ? "text-[#71717a]" : "text-gray-500"}`}>
                            System Status: <span className="text-[#00ff9d]">ONLINE</span>
                        </span>
                        <button
                            onClick={toggleTheme}
                            className={`px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-2 ${buttonClasses}`}
                        >
                            {isDarkMode ? (
                                <><span>☀</span> Light</>
                            ) : (
                                <><span>🌙</span> Dark</>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-5xl mx-auto px-6 pt-32 pb-12 flex flex-col items-center justify-center">

                <div className={`w-full p-1 rounded-2xl bg-gradient-to-r from-[#00ff9d] via-[#bd93f9] to-[#ff79c6] opacity-80 mb-1`}></div>
                <div className={`w-full p-8 md:p-12 rounded-xl border backdrop-blur-xl transition-all duration-300 ${cardClasses}`}>

                    <div className="text-center mb-12">
                        <div className={`inline-block p-4 rounded-full mb-6 ${isDarkMode ? "bg-[#00ff9d]/10" : "bg-blue-50"}`}>
                            <span className="text-4xl">🧠</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">人工智能训练师 <span className={accentColor}>3级在线测试</span></h2>
                        <p className={`font-mono text-lg max-w-2xl mx-auto ${isDarkMode ? "text-[#71717a]" : "text-gray-500"}`}>
                            Verify your knowledge in LLM tuning, prompt engineering, and data annotation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { label: "Duration", value: "90 Min", icon: "⏱️" },
                            { label: "Questions", value: "100", icon: "📝" },
                            { label: "Passing Score", value: "80%", icon: "🎯" }
                        ].map((item, index) => (
                            <div key={index} className={`p-4 rounded-lg border text-center ${isDarkMode ? "bg-[#050505]/50 border-[#27272a]" : "bg-gray-50 border-gray-100"}`}>
                                <div className="text-2xl mb-2">{item.icon}</div>
                                <div className={`font-mono text-sm mb-1 ${isDarkMode ? "text-[#71717a]" : "text-gray-500"}`}>{item.label}</div>
                                <div className={`font-bold text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button className={`group relative px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${isDarkMode
                                ? "bg-[#00ff9d] text-black hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]"
                                : "bg-blue-600 text-white hover:shadow-lg hover:bg-blue-700"
                            }`}>
                            <span className="relative z-10 flex items-center gap-2">
                                Start Examination
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </button>
                        <p className={`mt-4 text-sm font-mono ${isDarkMode ? "text-[#71717a]" : "text-gray-400"}`}>
                            Press <kbd className={`px-2 py-1 rounded border ${isDarkMode ? "bg-[#1f1f1f] border-[#27272a]" : "bg-gray-100 border-gray-200"}`}>Enter</kbd> to start
                        </p>
                    </div>

                </div>

                {/* Decorative Elements */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full opacity-50">
                    {['Machine Learning', 'Deep Learning', 'NLP', 'Reinforcement Learning'].map((tag, i) => (
                        <div key={i} className={`text-center text-xs font-mono py-2 border-t ${isDarkMode ? "border-[#27272a] text-[#71717a]" : "border-gray-200 text-gray-400"}`}>
                            {tag}
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
};

export default ExamPage;
