import React from 'react';
import ToolCard from '../components/ToolCard';
import { phases } from '../data/tools';
import { articles } from '../data/articles';

const HomePage = () => {
    return (
        <div className="space-y-16">
            {/* 博客预览板块 - 增加内容厚度 */}
            <section>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2 underline decoration-geek-secondary decoration-4 underline-offset-8">
                            最新深度指南
                        </h2>
                        <p className="text-geek-dim font-mono text-sm">Deep Insights & Strategy</p>
                    </div>
                    <a href="/blog" className="text-geek-primary hover:underline font-bold">查看全部 &rsaquo;</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.slice(0, 3).map((article) => (
                        <div key={article.id} className="glass-card border border-geek-border/40 p-6 rounded-xl hover:bg-white/5 transition-all">
                            <span className="text-[10px] font-mono text-geek-secondary mb-2 block uppercase">{article.date}</span>
                            <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 hover:text-geek-primary transition-colors">
                                <a href={`/blog/${article.id}`}>{article.title}</a>
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                {article.summary}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 原有的工具板块 */}
            {phases.map((phase) => (
                <section key={phase.id}>
                    <div className="flex flex-col mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <span className={`font-mono text-xl font-bold ${phase.color === 'secondary' ? 'text-geek-secondary' : phase.color === 'primary' ? 'text-geek-primary' : 'text-white/50'}`}>
                                {phase.number}
                            </span>
                            <h2 className="text-2xl font-bold text-white">
                                {phase.title}
                                <span className={`font-mono text-sm ml-2 border px-2 py-0.5 rounded align-middle ${phase.color === 'secondary' ? 'text-geek-secondary border-geek-secondary/30' :
                                    phase.color === 'primary' ? 'text-geek-primary border-geek-primary/30' :
                                        'text-white/50 border-white/20'
                                    }`}>
                                    {phase.subtitle}
                                </span>
                            </h2>
                        </div>
                        {phase.intro && (
                            <p className="text-gray-400 max-w-3xl text-sm leading-relaxed border-l-2 border-geek-border pl-4">
                                {phase.intro}
                            </p>
                        )}
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 ${phase.id === 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                        {phase.categories.map((category, index) => (
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
            ))}

            {/* 底部 SEO 文字块 - 极端重要的文字量补全 */}
            <section className="mt-24 pt-12 border-t border-geek-border/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest font-mono">
                            Why GeminiNext?
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            在独立开发的漫长旅程中，开发者往往会陷入“选择焦虑”。GeminiNext 的诞生就是为了解决这一痛点。我们不仅仅汇集了从 <strong>Product Hunt</strong> 到 <strong>Stripe</strong> 的出海必备工具，更通过深度的 <strong>人工智能训练师</strong> 认证题库，帮助开发者在技术与职业技能之间架起桥梁。
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            我们的“黄金分配法则”建议：将 40% 的精力花在需求挖掘（Discovery），20% 花在产品构建（Building），而剩下的 40% 必须投入到持续的增长与分发（Growth）中。这就是我们网站布局的核心逻辑。
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest font-mono">
                            The Value Proposition
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            对于 AI 爱好者，我们提供的 <strong>Prompt 提示词库</strong> 和 <strong>实操知识库</strong> 是从海量信息中过滤出的精华。不论你是为了备考人工智能训练师三级证书，还是为了优化你的 LLM 提示词工作流，GeminiNext 都能提供系统性的支持。
                        </p>
                        <ul className="text-xs text-geek-dim space-y-2 font-mono list-disc list-inside">
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
