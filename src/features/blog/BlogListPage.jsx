import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../lib/blog';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { useTheme } from '../../contexts/ThemeContext';

const BlogListPage = () => {
    const { isDarkMode } = useTheme();
    const articles = useMemo(() => getAllPosts(), []);

    useDocumentMeta({
        title: '博客 - 独立开发 & AI 深度指南',
        description: '分享关于独立开发、AI认证考试以及最新出海工具的深度洞察与实战指南。',
    });

    const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const subColor = isDarkMode ? 'text-geek-dim' : 'text-gray-500';
    const cardBg = isDarkMode ? 'glass-card border-geek-border' : 'bg-white border-gray-200 shadow-sm';
    const dateColor = isDarkMode ? 'text-geek-secondary' : 'text-purple-600';
    const descColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const accentColor = isDarkMode ? 'text-geek-primary' : 'text-blue-600';
    const hoverBorder = isDarkMode ? 'hover:border-geek-primary' : 'hover:border-blue-500';

    return (
        <div>
            <div className="mb-12">
                <h1 className={`text-4xl font-bold ${headingColor} mb-4`}>
                    <span className={`${accentColor} font-mono`}>&gt;</span> 深度指南 &amp; 博客
                </h1>
                <p className={`${subColor} max-w-2xl font-mono text-sm`}>
                    在这里，我们分享关于独立开发、AI认证考试以及最新出海工具的深度洞察。
                </p>
            </div>

            <div className="space-y-8">
                {articles.map((article) => (
                    <article
                        key={article.id}
                        className={`${cardBg} border p-8 rounded-xl ${hoverBorder} transition-all group`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-xs font-mono ${dateColor} uppercase tracking-widest`}>
                                {article.date} | By {article.author}
                            </span>
                        </div>
                        <h2 className={`text-2xl font-bold ${headingColor} mb-4 group-hover:${accentColor} transition-colors`}>
                            <Link to={`/blog/${article.id}`}>{article.title}</Link>
                        </h2>
                        <p className={`${descColor} text-sm leading-relaxed mb-6 line-clamp-3`}>
                            {article.summary}
                        </p>
                        <Link
                            to={`/blog/${article.id}`}
                            className={`inline-flex items-center gap-2 ${accentColor} text-sm font-bold hover:underline`}
                        >
                            阅读全文 <span>&rarr;</span>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogListPage;
