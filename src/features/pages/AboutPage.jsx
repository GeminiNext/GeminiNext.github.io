import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { SITE_CONFIG } from '../../config/site';

const AboutPage = () => {
    const { isDarkMode } = useTheme();

    useDocumentMeta({
        title: '关于我们',
        description: `${SITE_CONFIG.name} 是专为独立开发者和人工智能学习者打造的一站式工具站，汇集出海工具导航和AI训练师职业认证资源。`,
    });

    const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const subColor = isDarkMode ? 'text-geek-dim' : 'text-gray-500';
    const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
    const textColorMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const cardBg = isDarkMode ? 'glass-card border-geek-border' : 'bg-white border-gray-200 shadow-sm';
    const roadmapLine = isDarkMode ? 'bg-geek-border' : 'bg-gray-200';
    const storyBg = isDarkMode ? 'glass-card border-geek-border' : 'bg-white border-gray-200 shadow-lg';

    return (
        <div className="max-w-4xl mx-auto py-12">
            <section className="mb-20">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-6 ${
                            isDarkMode 
                                ? 'bg-geek-primary/10 border border-geek-primary/20 text-geek-primary' 
                                : 'bg-blue-50 border border-blue-100 text-blue-600'
                        }`}>
                            OUR MISSION
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-bold ${headingColor} mb-8 leading-tight`}>
                            Empowering <span className={isDarkMode ? "text-geek-primary" : "text-blue-600"}>Indie Developers</span> & AI Learners.
                        </h1>
                        <p className={`${textColor} leading-relaxed mb-4 text-lg`}>
                            {SITE_CONFIG.name} 是一个专为独立开发者和人工智能学习者打造的一站式工具站。我们的目标是简化资源获取流程，帮助开发者快速发现优质出海工具，同时为 AI 从业者提供专业的职业技能认证辅助。
                        </p>
                        <p className={`${textColorMuted} leading-relaxed`}>
                            在一个信息爆炸的时代，筛选有价值的工具和知识变得越来越困难。我们通过精心策划的工具集和专业的题库资源，为您节省宝贵的时间，让您能专注于创造和学习。
                        </p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                        {[
                            { icon: '🚀', value: '100+', label: 'Tools Curated', color: isDarkMode ? 'text-geek-primary' : 'text-blue-600' },
                            { icon: '🧠', value: '190+', label: 'Exam Questions', color: isDarkMode ? 'text-geek-secondary' : 'text-purple-600' },
                            { icon: '📝', value: 'Weekly', label: 'Deep Guides', color: isDarkMode ? 'text-geek-accent' : 'text-pink-600' },
                            { icon: '🤝', value: 'Open', label: 'Community', color: isDarkMode ? 'text-gray-400' : 'text-gray-500' }
                        ].map((stat, i) => (
                            <div key={i} className={`${cardBg} border p-6 rounded-xl text-center transition-all duration-300`}>
                                <div className="text-3xl mb-4">{stat.icon}</div>
                                <h3 className={`font-bold ${headingColor} mb-2`}>{stat.value}</h3>
                                <p className={`text-[10px] uppercase font-mono ${stat.color}`}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mb-20">
                <h2 className={`text-3xl font-bold ${headingColor} mb-12 text-center`}>Our Roadmap</h2>
                <div className="relative pl-8 md:pl-0">
                    <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-px ${roadmapLine} -translate-x-1/2`}></div>
                    
                    {/* Roadmap Items */}
                    <div className="space-y-12">
                        <div className="relative md:flex md:items-center">
                            <div className="hidden md:block w-1/2 pr-12 text-right">
                                <h4 className={`font-bold ${headingColor} mb-1`}>Stage 1: 工具与题库基建</h4>
                                <p className={`text-sm ${textColorMuted}`}>完成核心出海工具集的筛选和人工智能训练师三级题库的数字化转换。</p>
                            </div>
                            <div className={`absolute left-[-41px] md:left-1/2 top-1 w-4 h-4 rounded-full -translate-x-1/2 z-10 ${
                                isDarkMode ? 'bg-geek-primary shadow-[0_0_10px_rgba(0,255,157,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                            }`}></div>
                            <div className="md:w-1/2 md:pl-12">
                                <span className={`${isDarkMode ? 'text-geek-primary' : 'text-blue-600'} text-xs font-mono font-bold`}>COMPLETED</span>
                                <div className="md:hidden mt-2">
                                    <h4 className={`font-bold ${headingColor} mb-1`}>Stage 1: 工具与题库基建</h4>
                                    <p className={`text-sm ${textColorMuted}`}>完成核心出海工具集的筛选和人工智能训练师三级题库的数字化转换。</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative md:flex md:items-center">
                            <div className="md:w-1/2 md:pr-12 md:text-right">
                                <span className={`${isDarkMode ? 'text-geek-secondary' : 'text-purple-600'} text-xs font-mono font-bold`}>IN PROGRESS</span>
                                <div className="md:hidden mt-2">
                                    <h4 className={`font-bold ${headingColor} mb-1`}>Stage 2: 内容深度化</h4>
                                    <p className={`text-sm ${textColorMuted}`}>通过深度博客文章，分享独立开发实战经验和 AI 技术应用技巧。</p>
                                </div>
                            </div>
                            <div className={`absolute left-[-41px] md:left-1/2 top-1 w-4 h-4 rounded-full -translate-x-1/2 z-10 ${
                                isDarkMode ? 'bg-geek-secondary shadow-[0_0_10px_rgba(157,0,255,0.5)]' : 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                            }`}></div>
                            <div className="hidden md:block w-1/2 pl-12">
                                <h4 className={`font-bold ${headingColor} mb-1`}>Stage 2: 内容深度化</h4>
                                <p className={`text-sm ${textColorMuted}`}>通过深度博客文章，分享独立开发实战经验和 AI 技术应用技巧。</p>
                            </div>
                        </div>

                        <div className="relative md:flex md:items-center">
                            <div className="hidden md:block w-1/2 pr-12 text-right">
                                <h4 className={`font-bold ${headingColor} mb-1`}>Stage 3: 互动生态</h4>
                                <p className={`text-sm ${textColorMuted}`}>上线用户互动评论系统和共建计划，让 {SITE_CONFIG.name} 成为独立开发者交流心得和资源的避风港。</p>
                            </div>
                            <div className={`absolute left-[-41px] md:left-1/2 top-1 w-4 h-4 rounded-full ${roadmapLine} -translate-x-1/2 z-10`}></div>
                            <div className="md:w-1/2 md:pl-12">
                                <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs font-mono`}>PLANNED</span>
                                <div className="md:hidden mt-2">
                                    <h4 className={`font-bold ${headingColor} mb-1`}>Stage 3: 互动生态</h4>
                                    <p className={`text-sm ${textColorMuted}`}>上线用户互动评论系统和共建计划，让 {SITE_CONFIG.name} 成为独立开发者交流心得和资源的避风港。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${storyBg} border p-12 rounded-2xl text-center relative overflow-hidden transition-all duration-300`}>
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 ${
                    isDarkMode ? 'bg-geek-primary/10' : 'bg-blue-500/5'
                }`}></div>
                <div className="relative z-10">
                    <h2 className={`text-3xl font-bold ${headingColor} mb-6`}>Our Story</h2>
                    <div className={`max-w-2xl mx-auto space-y-4 ${textColor} leading-relaxed text-sm`}>
                        <p>
                            这个项目的初衷非常简单：作为一名独立开发者，我发现自己每天花费大量时间在寻找合适的 API、部署平台和营销工具上。我希望有一个地方能把这些"生存利器"集中起来。
                        </p>
                        <p>
                            随着 AI 浪潮的兴起，我又意识到许多人渴望进入这个领域，但缺乏系统的学习和认证路径。于是，我将 AI 训练师的考试资源整合进来，希望为同样在这个领域探索的朋友们提供一些帮助。
                        </p>
                        <p>
                            <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>{SITE_CONFIG.name}</strong> 不仅仅是一个工具站，它也是一个不断成长的社区。我们欢迎每一位开发者和学习者的反馈，共同构建更好的资源库。
                        </p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200/10">
                        <p className={`text-xs uppercase font-mono tracking-widest mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Build with Love</p>
                        <p className={`text-xs italic ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>By Indie Developers, For Indie Developers</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
