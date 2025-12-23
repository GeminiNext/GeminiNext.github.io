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
                                有好的工具推荐？通过考试发现了新题型？或者只是想打个招呼？
                            </p>
                        </div>
                        <a
                            href="mailto:sunstar1227@126.com"
                            className="px-6 py-3 rounded-lg bg-geek-primary text-black font-bold hover:bg-geek-primary/90 transition-all whitespace-nowrap"
                        >
                            发邮件给我们
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
