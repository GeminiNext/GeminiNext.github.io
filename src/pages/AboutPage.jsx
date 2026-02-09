import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-geek-bg text-gray-300 font-sans">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link to="/" className="text-geek-primary hover:underline mb-8 inline-block">
                    ← 返回首页
                </Link>

                <h1 className="text-4xl font-bold text-white mb-8">
                    <span className="text-geek-primary font-mono">&gt;</span> 关于我们
                </h1>

                <div className="space-y-8">
                    {/* Mission Section */}
                    <section className="glass-card border border-geek-border rounded-xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <span className="text-4xl">🚀</span>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">我们的使命</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    Empower Indie Hackers & AI Learners.
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            GeminiNext 是一个专为独立开发者和人工智能学习者打造的一站式工具站。我们的目标是简化资源获取流程，帮助开发者快速发现优质出海工具，同时为 AI 从业者提供专业的职业技能认证辅助。
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            在一个信息爆炸的时代，筛选有价值的工具和知识变得越来越困难。我们通过精心策划的工具集和专业的题库资源，为您节省宝贵的时间，让您能专注于创造和学习。
                        </p>
                    </section>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="glass-card border border-geek-border rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-geek-primary">🛠️</span> 开发者工具栈
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                从需求挖掘、产品开发到推广营销，我们就“独立开发出海”这一主题，精选了全流程的优质工具。不论是寻找灵感、快速原型设计，还是获取首批用户，这里都有你需要的弹药。
                            </p>
                        </section>

                        <section className="glass-card border border-geek-border rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-geek-accent">🤖</span> AI 职业认证
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                提供“人工智能训练师”等级认定考试的专业复习资源。包含模拟考试、刷题模式和实操知识库，助您轻松通过认证，提升职业竞争力。
                            </p>
                        </section>
                    </div>

                    {/* Vision & Values Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-card border border-geek-border p-6 rounded-xl text-center">
                            <div className="text-3xl mb-4">🛡️</div>
                            <h3 className="font-bold text-white mb-2">纯净无骚扰</h3>
                            <p className="text-xs text-gray-500">我们坚持极简设计，拒绝任何形式的弹窗干扰，只为提供最纯净的阅读和刷题体验。</p>
                        </div>
                        <div className="glass-card border border-geek-border p-6 rounded-xl text-center">
                            <div className="text-3xl mb-4">💎</div>
                            <h3 className="font-bold text-white mb-2">高质量筛选</h3>
                            <p className="text-xs text-gray-500">所有的工具链接和 Prompt 都经过人工实测，只有真正能提高生产力的工具才会被列入名单。</p>
                        </div>
                        <div className="glass-card border border-geek-border p-6 rounded-xl text-center">
                            <div className="text-3xl mb-4">🤝</div>
                            <h3 className="font-bold text-white mb-2">社区驱动</h3>
                            <p className="text-xs text-gray-500">GeminiNext 由开发者为开发者构建。您的每一条反馈都在直接塑造这个平台的未来。</p>
                        </div>
                    </div>

                    {/* Milestone Section */}
                    <section className="glass-card border border-geek-border rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-geek-secondary">📈</span> 发展愿景 (Vision)
                        </h2>
                        <div className="relative pl-8 border-l-2 border-geek-border space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-geek-secondary shadow-[0_0_10px_rgba(0,163,255,0.5)]"></div>
                                <h4 className="font-bold text-white mb-1">Stage 1: 资源基石</h4>
                                <p className="text-sm text-gray-400">构建最全的独立开发出海工具栈和人工智能训练师等级考试复习指南，日活跃用户稳定增长。</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-geek-border"></div>
                                <h4 className="font-bold text-white mb-1">Stage 2: 知识枢纽 (Currently)</h4>
                                <p className="text-sm text-gray-400">引入深度博客、指南和实战复盘，通过高质量内容沉淀流量，解决用户信息孤岛问题。</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-geek-border"></div>
                                <h4 className="font-bold text-white mb-1">Stage 3: 互动生态</h4>
                                <p className="text-sm text-gray-400">上线用户互动评论系统和共建计划，让 GeminiNext 成为独立开发者交流心得和资源的避风港。</p>
                            </div>
                        </div>
                    </section>

                    {/* Story Section */}
                    <section className="glass-card border border-geek-border rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">背后的故事</h2>
                        <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
                            <p>
                                这个项目始于一个简单的需求：作为一个独立开发者，我发现自己花费了太多时间在寻找合适的工具上，而不是在构建产品本身。我想，如果有一个地方能汇集所有好用的出海工具，那该多好。
                            </p>
                            <p>
                                随着 AI 浪潮的兴起，我又意识到许多人渴望进入这个领域，但缺乏系统的学习和认证路径。于是，我将 AI 训练师的考试资源整合进来，希望为同样在这个领域探索的朋友们提供一些帮助。
                            </p>
                            <p>
                                <strong>GeminiNext</strong> 不仅仅是一个工具站，它也是一个不断成长的社区。我们欢迎每一位开发者和学习者的反馈，共同构建更好的资源库。
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="glass-card border border-geek-border rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">联系与反馈</h2>
                            <p className="text-gray-400">
                                发现题库中有错误？有更好的出海工具推荐？
                            </p>
                            <p className="text-xs text-geek-dim mt-2 font-mono">
                                官方联系：sunstar1227@126.com
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                to="/blog"
                                className="px-6 py-3 rounded-lg border border-geek-primary text-geek-primary font-bold hover:bg-geek-primary/10 transition-all"
                            >
                                浏览深度指南
                            </Link>
                            <a
                                href="mailto:sunstar1227@126.com"
                                className="px-6 py-3 rounded-lg bg-geek-primary text-black font-bold hover:bg-geek-primary/90 transition-all whitespace-nowrap"
                            >
                                发送邮件
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
