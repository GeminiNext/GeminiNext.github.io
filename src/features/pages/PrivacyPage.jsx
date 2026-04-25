import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import useDocumentMeta from '../../hooks/useDocumentMeta';
import { SITE_CONFIG } from '../../config/site';

const PrivacyPage = () => {
    const { isDarkMode } = useTheme();

    useDocumentMeta({
        title: '隐私政策',
        description: `${SITE_CONFIG.name} 网站隐私政策，说明我们如何收集、使用和保护您的信息。`,
    });

    const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
    const sectionBg = isDarkMode ? 'bg-white/5' : 'bg-gray-50';
    const borderColor = isDarkMode ? 'border-white/10' : 'border-gray-200';

    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className={`text-3xl md:text-4xl font-bold ${headingColor} mb-8`}>隐私政策</h1>
            <p className={`${textColor} mb-8 font-mono text-sm`}>最近更新日期：2025年5月10日</p>

            <div className="space-y-12">
                <section>
                    <h2 className={`text-xl font-bold ${headingColor} mb-4 flex items-center gap-2`}>
                        <span className="w-1.5 h-6 bg-geek-primary rounded-full"></span>
                        1. 信息收集
                    </h2>
                    <div className={`${sectionBg} border ${borderColor} p-6 rounded-xl space-y-4`}>
                        <p className={textColor}>
                            {SITE_CONFIG.name} 非常重视您的隐私。作为一个工具类站点，我们尽可能减少对用户个人信息的收集：
                        </p>
                        <ul className={`list-disc list-inside ${textColor} space-y-2 ml-2`}>
                            <li><strong>自动记录的信息</strong>：我们会通过 Google Analytics 等工具记录基本的访问统计，包括 IP 地址、浏览器类型、停留时间等，用于优化网站体验。</li>
                            <li><strong>Cookie</strong>：我们使用 Cookie 来存储您的主题偏好（深色/浅色模式）以及考试练习的进度。</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className={`text-xl font-bold ${headingColor} mb-4 flex items-center gap-2`}>
                        <span className="w-1.5 h-6 bg-geek-secondary rounded-full"></span>
                        2. 信息使用
                    </h2>
                    <div className={`${sectionBg} border ${borderColor} p-6 rounded-xl`}>
                        <p className={textColor}>
                            我们收集的信息仅用于：
                        </p>
                        <ul className={`list-disc list-inside ${textColor} mt-4 space-y-2 ml-2`}>
                            <li>改进网站功能和内容展示。</li>
                            <li>分析流量趋势，优化工具导航推荐。</li>
                            <li>保持您的个性化设置（如考试系统的暗黑模式切换）。</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className={`text-xl font-bold ${headingColor} mb-4 flex items-center gap-2`}>
                        <span className="w-1.5 h-6 bg-geek-accent rounded-full"></span>
                        3. 第三方链接
                    </h2>
                    <div className={`${sectionBg} border ${borderColor} p-6 rounded-xl`}>
                        <p className={textColor}>
                            本站包含许多指向第三方网站的链接（如出海工具站）。我们对这些外部站点的隐私实践不承担责任，建议您在离开本站时阅读其各自的隐私政策。
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className={`text-xl font-bold ${headingColor} mb-4 flex items-center gap-2`}>
                        <span className="w-1.5 h-6 bg-gray-500 rounded-full"></span>
                        4. 联系我们
                    </h2>
                    <div className={`${sectionBg} border ${borderColor} p-6 rounded-xl`}>
                        <p className={textColor}>
                            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
                        </p>
                        <p className={`mt-4 font-mono ${isDarkMode ? 'text-geek-primary' : 'text-blue-600'}`}>
                            Email: {SITE_CONFIG.email}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPage;
