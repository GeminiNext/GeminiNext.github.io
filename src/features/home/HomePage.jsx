import React from 'react';
import { Link } from 'react-router-dom';
import ToolCard from '../../components/ToolCard';
import { phases } from '../../data/tools';
import { articles } from '../../data/articles';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { useTheme } from '../../contexts/ThemeContext';
import { SITE_CONFIG } from '../../config/site';

const HomePage = () => {
    const { isDarkMode } = useTheme();

    useDocumentMeta({
        title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
        description: SITE_CONFIG.description,
    });

    const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const subColor = isDarkMode ? 'text-geek-dim' : 'text-gray-500';
    const cardBg = isDarkMode ? 'glass-card border-geek-border/40' : 'bg-white border-gray-200 shadow-sm';
    const cardHover = isDarkMode ? 'hover:bg-white/5' : 'hover:shadow-md';
    const dateColor = isDarkMode ? 'text-geek-secondary' : 'text-purple-600';
    const summaryColor = isDarkMode ? 'text-gray-500' : 'text-gray-600';
    const accentColor = isDarkMode ? 'text-geek-primary' : 'text-blue-600';
    const borderColor = isDarkMode ? 'border-geek-border/30' : 'border-gray-200';
    const textColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const statColor = isDarkMode ? 'text-geek-primary' : 'text-blue-600';
    const statSecondary = isDarkMode ? 'text-geek-secondary' : 'text-purple-600';

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="text-center py-8 md:py-16">
                <h1 className={`text-4xl md:text-5xl font-bold ${headingColor} tracking-tight mb-4`}>
                    <span className={`${accentColor} font-mono`}>&gt;</span> Indie Dev{' '}
                    <span className={subColor}>Global Toolkit</span>
                </h1>
                <p className={`${subColor} font-mono text-sm md:text-base max-w-2xl mx-auto mb-8`}>
                    {SITE_CONFIG.title}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/tools"
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            isDarkMode
                                ? 'bg-geek-primary/10 text-geek-primary border border-geek-primary/30 hover:bg-geek-primary/20'
                                : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
                        }`}
                    >
                        🚀 出海工具
                    </Link>
                    <Link
                        to="/exam"
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            isDarkMode
                                ? 'bg-geek-secondary/10 text-geek-secondary border border-geek-secondary/30 hover:bg-geek-secondary/20'
                                : 'bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100'
                        }`}
                    >
                        🧠 AI考试题库
                    </Link>
                    <Link
                        to="/blog"
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            isDarkMode
                                ? 'bg-geek-accent/10 text-geek-accent border border-geek-accent/30 hover:bg-geek-accent/20'
                                : 'bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100'
                        }`}
                    >
                        📝 技术博客
                    </Link>
                </div>
            </section>

            {/* 博客预览 */}
            <section>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className={`text-3xl font-bold ${headingColor} mb-2 underline decoration-4 underline-offset-8 ${isDarkMode ? 'decoration-geek-secondary' : 'decoration-purple-500'}`}>
                            最新深度指南
                        </h2>
                        <p className={`${subColor} font-mono text-sm`}>Deep Insights &amp; Strategy</p>
                    </div>
                    <Link to="/blog" className={`${accentColor} hover:underline font-bold`}>&rsaquo;&rsaquo; 查看全部</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.slice(0, 3).map((article) => (
                        <div key={article.id} className={`${cardBg} border p-6 rounded-xl ${cardHover} transition-all`}>
                            <span className={`text-[10px] font-mono ${dateColor} mb-2 block uppercase`}>{article.date}</span>
                            <h3 className={`text-lg font-bold ${headingColor} mb-3 line-clamp-2 hover:${accentColor} transition-colors`}>
                                <Link to={`/blog/${article.id}`}>{article.title}</Link>
                            </h3>
                            <p className={`text-xs ${summaryColor} line-clamp-2 leading-relaxed`}>
                                {article.summary}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI考试预览 */}
            <section>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className={`text-3xl font-bold ${headingColor} mb-2 underline decoration-4 underline-offset-8 ${isDarkMode ? 'decoration-geek-primary' : 'decoration-blue-500'}`}>
                            人工智能训练师
                        </h2>
                        <p className={`${subColor} font-mono text-sm`}>AI Trainer Certification · Level 3</p>
                    </div>
                    <Link to="/exam" className={`${accentColor} hover:underline font-bold`}>&rsaquo;&rsaquo; 开始练习</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`${cardBg} border p-6 rounded-xl text-center`}>
                        <div className={`text-4xl font-bold ${statColor} font-mono mb-2`}>190</div>
                        <div className={`${subColor} text-sm`}>模拟考试题量</div>
                        <div className={`text-xs ${summaryColor} mt-1`}>40判断 + 140单选 + 10多选</div>
                    </div>
                    <div className={`${cardBg} border p-6 rounded-xl text-center`}>
                        <div className={`text-4xl font-bold ${statSecondary} font-mono mb-2`}>2</div>
                        <div className={`${subColor} text-sm`}>练习模式</div>
                        <div className={`text-xs ${summaryColor} mt-1`}>限时考试 & 自由刷题</div>
                    </div>
                    <Link to="/exam/knowledge" className={`${cardBg} border p-6 rounded-xl text-center ${cardHover} transition-all group`}>
                        <div className="text-4xl mb-2">💻</div>
                        <div className={`${subColor} text-sm group-hover:${headingColor} transition-colors`}>实操知识库</div>
                        <div className={`text-xs ${summaryColor} mt-1`}>速查手册 →</div>
                    </Link>
                </div>
            </section>

            {/* 工具精选预览 */}
            <section>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className={`text-3xl font-bold ${headingColor} mb-2 underline decoration-4 underline-offset-8 ${isDarkMode ? 'decoration-geek-accent' : 'decoration-pink-500'}`}>
                            出海工具精选
                        </h2>
                        <p className={`${subColor} font-mono text-sm`}>Curated Indie Hacker Toolkit</p>
                    </div>
                    <Link to="/tools" className={`${accentColor} hover:underline font-bold`}>&rsaquo;&rsaquo; 查看全部</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {phases[0].categories.slice(0, 3).map((category, index) => (
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

            {/* SEO 文字块 */}
            <section className={`mt-24 pt-12 border-t ${borderColor}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h3 className={`text-xl font-bold ${headingColor} uppercase tracking-widest font-mono`}>
                            Why {SITE_CONFIG.name}?
                        </h3>
                        <p className={`${textColor} text-sm leading-relaxed`}>
                            在独立开发的漫长旅程中，开发者往往会陷入"选择焦虑"。{SITE_CONFIG.name} 的诞生就是为了解决这一痛点。我们不仅仅汇集了从 <strong>Product Hunt</strong> 到 <strong>Stripe</strong> 的出海必备工具，更通过深度的 <strong>人工智能训练师</strong> 认证题库，帮助开发者在技术与职业技能之间架起桥梁。
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h3 className={`text-xl font-bold ${headingColor} uppercase tracking-widest font-mono`}>
                            The Value Proposition
                        </h3>
                        <p className={`${textColor} text-sm leading-relaxed`}>
                            对于 AI 爱好者，我们提供的 <strong>Prompt 提示词库</strong> 和 <strong>实操知识库</strong> 是从海量信息中过滤出的精华。不论你是为了备考人工智能训练师三级证书，还是为了优化你的 LLM 提示词工作流，{SITE_CONFIG.name} 都能提供系统性的支持。
                        </p>
                        <ul className={`text-xs ${subColor} space-y-2 font-mono list-disc list-inside`}>
                            <li>精选 100+ 全球化独立开发工具</li>
                            <li>人工智能训练师等级认定全真题库</li>
                            <li>深度技术博客与产品出海实战指南</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
