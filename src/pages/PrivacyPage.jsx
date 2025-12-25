import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-geek-bg text-gray-300 font-sans">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link to="/" className="text-geek-primary hover:underline mb-8 inline-block">
                    ← 返回首页
                </Link>

                <h1 className="text-4xl font-bold text-white mb-8">
                    <span className="text-geek-primary font-mono">&gt;</span> 隐私政策
                </h1>

                <div className="prose prose-invert max-w-none space-y-6">
                    <section className="glass-card border border-geek-border rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">1. 信息收集</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            我们致力于保护您的隐私。本网站（gemini4.cn）在您使用过程中可能会收集以下信息：
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li><strong>自动收集的信息</strong>：通过 Google Analytics 收集的匿名访问数据，包括页面浏览量、访问时长、设备类型等，用于改进用户体验。</li>
                            <li><strong>本地存储</strong>：考试进度、主题偏好等数据仅存储在您的浏览器本地（LocalStorage），不会上传到服务器。</li>
                            <li><strong>Cookie</strong>：我们使用 Cookie 来记录您的偏好设置和分析网站流量。</li>
                        </ul>
                    </section>

                    <section className="glass-card border border-geek-border rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">2. 信息使用</h2>
                        <p className="text-gray-300 leading-relaxed">
                            我们收集的信息仅用于以下目的：
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-4">
                            <li>改进网站功能和用户体验</li>
                            <li>分析网站流量和使用模式</li>
                            <li>提供个性化的学习体验（如保存考试进度）</li>
                            <li>展示相关的广告内容（通过 Google AdSense）</li>
                        </ul>
                    </section>

                    <section className="glass-card border border-geek-border rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">3. 第三方服务</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            本网站使用以下第三方服务，它们有各自的隐私政策：
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li><strong>Google Analytics</strong>：用于网站流量分析。<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-geek-primary hover:underline">查看隐私政策</a></li>
                            <li><strong>Google AdSense</strong>：用于展示广告。<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-geek-primary hover:underline">查看广告政策</a></li>
                        </ul>
                    </section>

                    <section className="glass-card border border-geek-border rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">4. 数据安全</h2>
                        <p className="text-gray-300 leading-relaxed">
                            我们采取合理的技术措施保护您的信息安全。然而，请注意互联网传输无法保证100%安全。您的考试答题记录仅存储在本地浏览器中，我们不会收集或存储您的个人答题数据。
                        </p>
                    </section>

                    <section className="glass-card border border-geek-border rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">5. 您的权利</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            您有权：
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>清除浏览器中的本地存储数据</li>
                            <li>禁用 Cookie（可能影响部分功能）</li>
                            <li>选择退出 Google Analytics 追踪（通过浏览器插件）</li>
                            <li>联系我们了解数据使用情况</li>
                        </ul>
                    </section>

                    <section className="glass-card border border-geek-border rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">6. 儿童隐私</h2>
                        <p className="text-gray-300 leading-relaxed">
                            本网站不针对13岁以下儿童。我们不会故意收集儿童的个人信息。如果您发现我们无意中收集了儿童信息，请联系我们删除。
                        </p>
                    </section>

                    <section className="glass-card border border-geek-border rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">7. 政策更新</h2>
                        <p className="text-gray-300 leading-relaxed">
                            我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，重大变更会通过网站公告通知用户。
                        </p>
                        <p className="text-gray-400 text-sm mt-4">
                            最后更新日期：2025年12月23日
                        </p>
                    </section>

                    <section className="glass-card border border-geek-border rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">8. 联系我们</h2>
                        <p className="text-gray-300 leading-relaxed">
                            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
                        </p>
                        <p className="text-geek-primary mt-4">
                            邮箱：sunstar1227@126.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
