import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../data/articles';

const BlogDetailPage = () => {
    const { id } = useParams();
    const article = useMemo(() => articles.find(a => a.id === id), [id]);

    if (!article) return <Navigate to="/blog" />;

    // 解析行内样式（加粗、代码等）
    const parseInlineStyles = (text) => {
        // 先处理代码块
        let parts = text.split(/(`[^`]+`)/g).map((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={i} className="bg-geek-border/50 text-geek-secondary px-1.5 py-0.5 rounded font-mono text-sm mx-1">{part.slice(1, -1)}</code>;
            }
            // 接下来处理加粗
            const subParts = part.split(/(\*\*[^*]+\*\*)/g).map((subPart, j) => {
                if (subPart.startsWith('**') && subPart.endsWith('**')) {
                    return <strong key={`${i}-${j}`} className="text-white font-bold">{subPart.slice(2, -2)}</strong>;
                }
                return subPart;
            });
            return subParts;
        });
        return parts;
    };

    // 简单的 Markdown 模拟渲染逻辑
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('# ')) {
                return <h1 key={index} className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">{trimmedLine.replace('# ', '')}</h1>;
            }
            if (trimmedLine.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-geek-primary pl-4">{trimmedLine.replace('## ', '')}</h2>;
            }
            if (trimmedLine.startsWith('- ')) {
                return <li key={index} className="ml-6 mb-2 text-gray-300 list-disc">{parseInlineStyles(trimmedLine.replace('- ', ''))}</li>;
            }
            if (trimmedLine === '') return <div key={index} className="h-4" />;
            return <p key={index} className="text-gray-300 leading-loose mb-6 text-lg">{parseInlineStyles(line)}</p>;
        });
    };

    return (
        <div className="min-h-screen bg-geek-bg text-gray-300 font-sans p-6">
            <div className="max-w-3xl mx-auto py-12">
                <nav className="flex items-center gap-4 mb-12">
                    <Link to="/blog" className="text-geek-dim hover:text-white transition-colors flex items-center gap-2">
                        <span>&larr;</span> 博客列表
                    </Link>
                    <span className="text-geek-border">/</span>
                    <span className="text-geek-primary text-sm font-mono truncate">{article.title}</span>
                </nav>

                <header className="mb-12">
                    <div className="text-xs font-mono text-geek-dim mb-4 flex items-center gap-4">
                        <span className="bg-geek-secondary/10 text-geek-secondary px-2 py-1 rounded">GUIDE</span>
                        <span>{article.date}</span>
                        <span>{article.author}</span>
                    </div>
                </header>

                <div className="prose prose-invert max-w-none">
                    {renderContent(article.content)}
                </div>

                <footer className="mt-20 pt-8 border-t border-geek-border/50 text-center">
                    <p className="text-geek-dim text-sm mb-6 font-mono">
                        对本文感兴趣？欢迎联系我们讨论更多细节。
                    </p>
                    <a
                        href="mailto:sunstar1227@126.com"
                        className="px-8 py-3 rounded-full bg-geek-bg border border-geek-primary text-geek-primary font-bold hover:bg-geek-primary hover:text-black transition-all"
                    >
                        发送邮件反馈
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default BlogDetailPage;
