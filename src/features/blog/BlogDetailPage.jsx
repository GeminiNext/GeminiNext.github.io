import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostById } from '../../lib/blog';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { useTheme } from '../../contexts/ThemeContext';

const BlogDetailPage = () => {
    const { id } = useParams();
    const article = useMemo(() => getPostById(id), [id]);
    const { isDarkMode } = useTheme();

    useDocumentMeta({
        title: article ? article.title : '文章未找到',
        description: article ? article.summary : '',
    });

    if (!article) return <Navigate to="/blog" />;

    const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const subColor = isDarkMode ? 'text-geek-dim' : 'text-gray-500';
    const accentColor = isDarkMode ? 'text-geek-primary' : 'text-blue-600';
    const borderColor = isDarkMode ? 'border-geek-border' : 'border-gray-200';
    const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';

    return (
        <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-4 mb-12">
                <Link to="/blog" className={`${subColor} hover:${headingColor} transition-colors flex items-center gap-2`}>
                    <span>&larr;</span> 博客列表
                </Link>
                <span className={isDarkMode ? 'text-geek-border' : 'text-gray-300'}>/</span>
                <span className={`${accentColor} text-sm font-mono truncate`}>{article.title}</span>
            </nav>

            <header className="mb-12">
                <div className={`text-xs font-mono ${subColor} mb-4 flex items-center gap-4`}>
                    <span className={`${isDarkMode ? 'bg-geek-secondary/10 text-geek-secondary' : 'bg-purple-50 text-purple-600'} px-2 py-1 rounded`}>GUIDE</span>
                    <span>{article.date}</span>
                    <span>{article.author}</span>
                </div>
                <h1 className={`text-3xl md:text-5xl font-bold ${headingColor} leading-tight mb-8`}>
                    {article.title}
                </h1>
            </header>

            <div className={`markdown-content ${isDarkMode ? 'dark' : ''}`}>
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <h1 className={`text-3xl font-bold ${headingColor} mt-12 mb-6`} {...props} />,
                        h2: ({ node, ...props }) => <h2 className={`text-2xl font-bold ${headingColor} mt-10 mb-4 border-l-4 ${isDarkMode ? 'border-geek-primary' : 'border-blue-500'} pl-4`} {...props} />,
                        h3: ({ node, ...props }) => <h3 className={`text-xl font-bold ${headingColor} mt-8 mb-3`} {...props} />,
                        p: ({ node, ...props }) => <p className={`${textColor} leading-loose mb-6 text-lg`} {...props} />,
                        ul: ({ node, ...props }) => <ul className="ml-6 mb-6 space-y-2 list-disc" {...props} />,
                        ol: ({ node, ...props }) => <ol className="ml-6 mb-6 space-y-2 list-decimal" {...props} />,
                        li: ({ node, ...props }) => <li className={`${textColor}`} {...props} />,
                        code: ({ node, inline, className, children, ...props }) => {
                            return inline ? (
                                <code className={`${isDarkMode ? 'bg-geek-border/50 text-geek-secondary' : 'bg-gray-100 text-purple-600'} px-1.5 py-0.5 rounded font-mono text-sm`} {...props}>
                                    {children}
                                </code>
                            ) : (
                                <div className={`my-6 rounded-lg overflow-hidden border ${borderColor}`}>
                                    <pre className={`${isDarkMode ? 'bg-geek-bg/50' : 'bg-gray-50'} p-4 overflow-x-auto`}>
                                        <code className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                </div>
                            );
                        },
                        table: ({ node, ...props }) => (
                            <div className="my-8 overflow-x-auto">
                                <table className={`w-full border-collapse border ${borderColor} rounded-lg overflow-hidden`} {...props} />
                            </div>
                        ),
                        th: ({ node, ...props }) => <th className={`border ${borderColor} px-4 py-2 text-left text-sm font-bold ${headingColor} ${isDarkMode ? 'bg-geek-border/30' : 'bg-gray-50'}`} {...props} />,
                        td: ({ node, ...props }) => <td className={`border ${borderColor} px-4 py-2 text-sm ${textColor}`} {...props} />,
                        strong: ({ node, ...props }) => <strong className={`${headingColor} font-bold`} {...props} />,
                        a: ({ node, ...props }) => <a className={`${accentColor} hover:underline font-bold`} {...props} />
                    }}
                >
                    {article.content}
                </ReactMarkdown>
            </div>

            <footer className={`mt-20 pt-8 border-t ${borderColor} text-center`}>
                <p className={`${subColor} text-sm mb-6 font-mono`}>
                    对本文感兴趣？欢迎联系我们讨论更多细节。
                </p>
                <a
                    href="mailto:sunstar1227@126.com"
                    className={`px-8 py-3 rounded-full border transition-all font-bold ${
                        isDarkMode
                            ? 'bg-geek-bg border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-black'
                            : 'bg-white border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
                    }`}
                >
                    发送邮件反馈
                </a>
            </footer>
        </div>
    );
};

export default BlogDetailPage;
