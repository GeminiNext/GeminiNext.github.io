import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

const BlogListPage = () => {
    return (
        <div className="min-h-screen bg-geek-bg text-gray-300 font-sans p-6">
            <div className="max-w-4xl mx-auto py-12">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="text-geek-dim hover:text-white transition-colors">
                        &larr; 返回首页
                    </Link>
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">
                    <span className="text-geek-primary font-mono">&gt;</span> 深度指南 & 博客
                </h1>
                <p className="text-geek-dim mb-12 max-w-2xl font-mono text-sm">
                    在这里，我们分享关于独立开发、AI认证考试以及最新出海工具的深度洞察。
                </p>

                <div className="space-y-8">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="glass-card border border-geek-border p-8 rounded-xl hover:border-geek-primary transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-mono text-geek-secondary uppercase tracking-widest">
                                    {article.date} | By {article.author}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-geek-primary transition-colors">
                                <Link to={`/blog/${article.id}`}>{article.title}</Link>
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                {article.summary}
                            </p>
                            <Link
                                to={`/blog/${article.id}`}
                                className="inline-flex items-center gap-2 text-geek-primary text-sm font-bold hover:underline"
                            >
                                阅读全文 <span>&rarr;</span>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogListPage;
