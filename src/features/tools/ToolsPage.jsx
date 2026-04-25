import React from 'react';
import { Link } from 'react-router-dom';
import ToolCard from '../../components/ToolCard';
import { phases } from '../../data/tools';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { useTheme } from '../../contexts/ThemeContext';

const ToolsPage = () => {
    const { isDarkMode } = useTheme();

    useDocumentMeta({
        title: '独立开发出海工具合集 - 从需求挖掘到推广营销',
        description: '精选100+全球化独立开发工具，涵盖需求挖掘、产品开发、推广营销全流程。Product Hunt、Stripe、Vercel、OpenRouter等出海必备工具导航。',
    });

    const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const subColor = isDarkMode ? 'text-geek-dim' : 'text-gray-500';
    const descColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const accentColor = isDarkMode ? 'text-geek-primary' : 'text-blue-600';
    const borderColor = isDarkMode ? 'border-geek-border' : 'border-gray-200';
    const cardBg = isDarkMode ? 'glass-card border-geek-border/40' : 'bg-white border-gray-200 shadow-sm';
    const promptBtnBg = isDarkMode
        ? 'bg-geek-accent/10 text-geek-accent border-geek-accent/30 hover:bg-geek-accent/20'
        : 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100';

    const phaseColor = (color) => {
        if (color === 'secondary') return isDarkMode ? 'text-geek-secondary' : 'text-purple-600';
        if (color === 'primary') return isDarkMode ? 'text-geek-primary' : 'text-blue-600';
        return isDarkMode ? 'text-white/50' : 'text-gray-400';
    };

    const phaseBorder = (color) => {
        if (color === 'secondary') return isDarkMode ? 'text-geek-secondary border-geek-secondary/30' : 'text-purple-600 border-purple-200';
        if (color === 'primary') return isDarkMode ? 'text-geek-primary border-geek-primary/30' : 'text-blue-600 border-blue-200';
        return isDarkMode ? 'text-white/50 border-white/20' : 'text-gray-400 border-gray-300';
    };

    return (
        <div className="space-y-16">
            {/* Page Header */}
            <div>
                <h1 className={`text-4xl font-bold ${headingColor} mb-4`}>
                    <span className={`${accentColor} font-mono`}>&gt;</span> 独立开发出海工具合集
                </h1>
                <p className={`${subColor} font-mono text-sm max-w-3xl mb-6`}>
                    精选全球化独立开发工具栈，按"黄金时间分配法则"分为三个阶段：40% 需求挖掘 · 20% 产品构建 · 40% 推广增长
                </p>
                {/* Progress Bar */}
                <div className="max-w-md">
                    <div className={`flex justify-between text-xs font-mono ${subColor} uppercase mb-2`}>
                        <span>Discovery</span>
                        <span>Building</span>
                        <span>Growth</span>
                    </div>
                    <div className={`w-full h-4 ${isDarkMode ? 'bg-geek-border' : 'bg-gray-200'} rounded-full flex overflow-hidden border ${borderColor}`}>
                        <div className={`h-full ${isDarkMode ? 'bg-geek-secondary' : 'bg-purple-500'} w-[40%] flex items-center justify-center text-[10px] ${isDarkMode ? 'text-black' : 'text-white'} font-bold`}>40%</div>
                        <div className={`h-full ${isDarkMode ? 'bg-geek-dim' : 'bg-gray-400'} w-[20%] flex items-center justify-center text-[10px] ${isDarkMode ? 'text-black' : 'text-white'} font-bold`}>20%</div>
                        <div className={`h-full ${isDarkMode ? 'bg-geek-primary' : 'bg-blue-500'} w-[40%] flex items-center justify-center text-[10px] ${isDarkMode ? 'text-black' : 'text-white'} font-bold`}>40%</div>
                    </div>
                </div>
            </div>

            {/* Prompt Library Link */}
            <div className={`${cardBg} border p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4`}>
                <div>
                    <h3 className={`text-lg font-bold ${headingColor} mb-1`}>🎯 AI Prompt 提示词库</h3>
                    <p className={`${subColor} text-sm`}>精选高质量 AI 提示词模板，提升你的 LLM 工作流效率</p>
                </div>
                <Link
                    to="/tools/prompts"
                    className={`px-6 py-2.5 rounded-lg border transition-all text-sm font-bold whitespace-nowrap ${promptBtnBg}`}
                >
                    浏览 Prompts →
                </Link>
            </div>

            {/* Tool Phases */}
            {phases.map((phase) => (
                <section key={phase.id}>
                    <div className="flex flex-col mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <span className={`font-mono text-xl font-bold ${phaseColor(phase.color)}`}>
                                {phase.number}
                            </span>
                            <h2 className={`text-2xl font-bold ${headingColor}`}>
                                {phase.title}
                                <span className={`font-mono text-sm ml-2 border px-2 py-0.5 rounded align-middle ${phaseBorder(phase.color)}`}>
                                    {phase.subtitle}
                                </span>
                            </h2>
                        </div>
                        {phase.intro && (
                            <p className={`${descColor} max-w-3xl text-sm leading-relaxed border-l-2 ${borderColor} pl-4`}>
                                {phase.intro}
                            </p>
                        )}
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 ${phase.id === 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                        {phase.categories.map((category, index) => (
                            <ToolCard
                                key={index}
                                icon={category.icon}
                                title={category.title}
                                description={category.description}
                                tools={category.tools}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ToolsPage;
