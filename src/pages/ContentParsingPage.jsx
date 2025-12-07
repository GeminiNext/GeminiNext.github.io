import React, { useState, useEffect } from 'react';
import questionBank from '../data/question_bank_clean.json';

const ContentParsingPage = () => {
    const [stats, setStats] = useState({
        total: 0,
        byType: {}
    });
    const [parsedData, setParsedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate parsing delay for effect
        const timer = setTimeout(() => {
            if (questionBank && questionBank.sections) {
                let total = 0;
                const typeCount = {};
                const allQuestions = [];

                questionBank.sections.forEach(section => {
                    section.questions.forEach(q => {
                        total++;
                        typeCount[section.type] = (typeCount[section.type] || 0) + 1;
                        allQuestions.push({
                            ...q,
                            type: section.type,
                            typeName: section.name
                        });
                    });
                });

                setStats({ total, byType: typeCount });
                setParsedData(allQuestions);
                setIsLoading(false);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const getTypeLabel = (type) => {
        switch (type) {
            case 'judgment': return '判断题';
            case 'single_choice': return '单选题';
            case 'multiple_choice': return '多选题';
            default: return type;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'judgment': return 'text-geek-primary border-geek-primary/30 bg-geek-primary/10';
            case 'single_choice': return 'text-geek-secondary border-geek-secondary/30 bg-geek-secondary/10';
            case 'multiple_choice': return 'text-geek-accent border-geek-accent/30 bg-geek-accent/10';
            default: return 'text-gray-400 border-gray-400/30';
        }
    };

    return (
        <div className="min-h-screen bg-geek-bg text-gray-300 font-sans selection:bg-geek-primary selection:text-black p-4 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <a href="/" className="text-geek-dim hover:text-white transition-colors">
                        &larr; Back
                    </a>
                    <h1 className="text-2xl md:text-3xl font-bold text-white flex flex-col md:flex-row md:items-center">
                        <div>
                            <span className="text-geek-primary font-mono">&gt;</span> 内容解析
                        </div>
                        <span className="text-geek-dim text-sm md:text-lg md:ml-2 mt-1 md:mt-0">Content Parsing</span>
                    </h1>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 glass-card rounded-xl border border-geek-border">
                        <div className="w-12 h-12 border-4 border-geek-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-mono text-geek-dim animate-pulse">正在解析题库数据...</p>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            <div className="p-6 rounded-xl bg-geek-card border border-geek-border glow-hover transition-all">
                                <div className="text-geek-dim text-xs font-mono mb-2 uppercase">Total Questions</div>
                                <div className="text-4xl font-bold text-white font-mono">{stats.total}</div>
                            </div>
                            {Object.entries(stats.byType).map(([type, count]) => (
                                <div key={type} className="p-6 rounded-xl bg-geek-card border border-geek-border glow-hover transition-all">
                                    <div className="text-geek-dim text-xs font-mono mb-2 uppercase">{getTypeLabel(type)}</div>
                                    <div className={`text-4xl font-bold font-mono ${type === 'multiple_choice' ? 'text-geek-accent' : type === 'single_choice' ? 'text-geek-secondary' : 'text-geek-primary'}`}>
                                        {count}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Content List (Mobile: Cards, Desktop: Table) */}
                        <div className="rounded-xl border border-geek-border overflow-hidden bg-geek-card/50 backdrop-blur-sm">
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-geek-border bg-geek-bg/80">
                                            <th className="p-4 font-mono text-xs text-geek-dim uppercase w-20">ID</th>
                                            <th className="p-4 font-mono text-xs text-geek-dim uppercase w-32">Type</th>
                                            <th className="p-4 font-mono text-xs text-geek-dim uppercase">Question</th>
                                            <th className="p-4 font-mono text-xs text-geek-dim uppercase w-48">Answer</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-geek-border/50">
                                        {parsedData.map((q) => (
                                            <tr key={q.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4 font-mono text-sm text-geek-dim group-hover:text-white transition-colors">
                                                    #{q.id}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-mono border ${getTypeColor(q.type)}`}>
                                                        {getTypeLabel(q.type)}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm leading-relaxed max-w-2xl">
                                                    {q.question}
                                                    {q.options && (
                                                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            {q.options.map(opt => (
                                                                <div key={opt.key} className="text-xs text-geek-dim flex gap-2">
                                                                    <span className="font-mono font-bold text-white/50">{opt.key}.</span>
                                                                    <span>{opt.value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-4 font-mono text-sm">
                                                    {typeof q.answer === 'boolean' ? (
                                                        <span className={q.answer ? 'text-geek-primary' : 'text-geek-accent'}>
                                                            {q.answer ? '✓ Correct' : '✕ Incorrect'}
                                                        </span>
                                                    ) : (
                                                        <span className="text-geek-secondary font-bold">
                                                            {Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-geek-border/50">
                                {parsedData.map((q) => (
                                    <div key={q.id} className="p-4 flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <span className="font-mono text-xs text-geek-dim">#{q.id}</span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getTypeColor(q.type)}`}>
                                                {getTypeLabel(q.type)}
                                            </span>
                                        </div>

                                        <div className="text-sm leading-relaxed text-gray-200">
                                            {q.question}
                                        </div>

                                        {q.options && (
                                            <div className="grid grid-cols-1 gap-1.5 pl-2 border-l-2 border-geek-border/50">
                                                {q.options.map(opt => (
                                                    <div key={opt.key} className="text-xs text-geek-dim flex gap-2">
                                                        <span className="font-mono font-bold text-white/50">{opt.key}.</span>
                                                        <span>{opt.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-1 pt-2 border-t border-geek-border/30 flex justify-between items-center">
                                            <span className="text-xs text-geek-dim uppercase font-mono">Answer</span>
                                            <span className="font-mono text-sm">
                                                {typeof q.answer === 'boolean' ? (
                                                    <span className={q.answer ? 'text-geek-primary' : 'text-geek-accent'}>
                                                        {q.answer ? '✓ Correct' : '✕ Incorrect'}
                                                    </span>
                                                ) : (
                                                    <span className="text-geek-secondary font-bold">
                                                        {Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentParsingPage;
