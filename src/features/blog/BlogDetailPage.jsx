import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../../data/articles';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { useTheme } from '../../contexts/ThemeContext';

const BlogDetailPage = () => {
    const { id } = useParams();
    const article = useMemo(() => articles.find(a => a.id === id), [id]);
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
    const codeBg = isDarkMode ? 'bg-geek-border/50' : 'bg-gray-100';
    const preBg = isDarkMode ? 'bg-geek-bg/50' : 'bg-gray-50';

    // 解析行内样式
    const parseInlineStyles = (text) => {
        let parts = text.split(/(`[^`]+`)/g).map((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={i} className={`${codeBg} ${isDarkMode ? 'text-geek-secondary' : 'text-purple-600'} px-1.5 py-0.5 rounded font-mono text-sm mx-1`}>{part.slice(1, -1)}</code>;
            }
            const subParts = part.split(/(\*\*[^*]+\*\*)/g).map((subPart, j) => {
                if (subPart.startsWith('**') && subPart.endsWith('**')) {
                    return <strong key={`${i}-${j}`} className={`${headingColor} font-bold`}>{subPart.slice(2, -2)}</strong>;
                }
                return subPart;
            });
            return subParts;
        });
        return parts;
    };

    const renderContent = (content) => {
        const lines = content.split('\n');
        const elements = [];
        let inCodeBlock = false;
        let codeBlockContent = [];
        let codeBlockLang = '';
        let inTable = false;
        let tableRows = [];

        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeBlockLang = trimmedLine.slice(3).trim();
                    codeBlockContent = [];
                } else {
                    inCodeBlock = false;
                    elements.push(
                        <div key={index} className={`my-6 rounded-lg overflow-hidden border ${borderColor}`}>
                            {codeBlockLang && (
                                <div className={`${isDarkMode ? 'bg-geek-border/30 text-geek-dim' : 'bg-gray-100 text-gray-500'} px-4 py-2 text-xs font-mono uppercase`}>
                                    {codeBlockLang}
                                </div>
                            )}
                            <pre className={`${preBg} p-4 overflow-x-auto`}>
                                <code className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {codeBlockContent.join('\n')}
                                </code>
                            </pre>
                        </div>
                    );
                    codeBlockContent = [];
                }
                continue;
            }

            if (inCodeBlock) {
                codeBlockContent.push(line);
                continue;
            }

            if (trimmedLine.startsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    tableRows = [];
                }
                tableRows.push(line);
                continue;
            } else if (inTable) {
                inTable = false;
                const rows = tableRows.filter(r => !r.includes('|---'));
                if (rows.length > 0) {
                    const headerCells = rows[0].split('|').filter(c => c.trim()).map(c => c.trim());
                    const bodyRows = rows.slice(1);
                    elements.push(
                        <div key={index} className="my-6 overflow-x-auto">
                            <table className={`w-full border-collapse border ${borderColor} rounded-lg overflow-hidden`}>
                                <thead className={isDarkMode ? 'bg-geek-border/30' : 'bg-gray-50'}>
                                    <tr>
                                        {headerCells.map((cell, i) => (
                                            <th key={i} className={`border ${borderColor} px-4 py-2 text-left text-sm font-bold ${headingColor}`}>
                                                {cell}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bodyRows.map((row, rowIndex) => {
                                        const cells = row.split('|').filter(c => c.trim()).map(c => c.trim());
                                        return (
                                            <tr key={rowIndex} className={isDarkMode ? 'hover:bg-geek-border/10' : 'hover:bg-gray-50'}>
                                                {cells.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className={`border ${borderColor} px-4 py-2 text-sm ${textColor}`}>
                                                        {parseInlineStyles(cell)}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    );
                }
                tableRows = [];
            }

            if (trimmedLine.startsWith('### ')) {
                elements.push(<h3 key={index} className={`text-xl font-bold ${headingColor} mt-6 mb-3`}>{trimmedLine.replace('### ', '')}</h3>);
                continue;
            }
            if (trimmedLine.startsWith('## ')) {
                elements.push(<h2 key={index} className={`text-2xl font-bold ${headingColor} mt-8 mb-4 border-l-4 ${isDarkMode ? 'border-geek-primary' : 'border-blue-500'} pl-4`}>{trimmedLine.replace('## ', '')}</h2>);
                continue;
            }
            if (trimmedLine.startsWith('# ')) {
                elements.push(<h1 key={index} className={`text-3xl md:text-4xl font-bold ${headingColor} mt-12 mb-6`}>{trimmedLine.replace('# ', '')}</h1>);
                continue;
            }
            if (trimmedLine.startsWith('- ')) {
                elements.push(<li key={index} className={`ml-6 mb-2 ${textColor} list-disc`}>{parseInlineStyles(trimmedLine.replace('- ', ''))}</li>);
                continue;
            }
            if (/^\d+\.\s/.test(trimmedLine)) {
                const content = trimmedLine.replace(/^\d+\.\s/, '');
                elements.push(<li key={index} className={`ml-6 mb-2 ${textColor} list-decimal`}>{parseInlineStyles(content)}</li>);
                continue;
            }
            if (trimmedLine === '') {
                elements.push(<div key={index} className="h-4" />);
                continue;
            }
            elements.push(<p key={index} className={`${textColor} leading-loose mb-6 text-lg`}>{parseInlineStyles(line)}</p>);
        }
        return elements;
    };

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
            </header>

            <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                {renderContent(article.content)}
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
