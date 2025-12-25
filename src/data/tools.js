export const phases = [
    {
        id: 1,
        title: "需求挖掘",
        subtitle: "Phase 1: Discovery",
        intro: "伟大的产品始于对痛点的深刻洞察。在写下第一行代码之前，我们需要验证想法的可行性。这个阶段，我们利用全球最大的产品社区和趋势分析工具，捕捉稍纵即逝的市场机会。",
        number: "01.",
        color: "secondary", // geek-secondary
        categories: [
            {
                icon: "🕵️",
                title: "灵感与挖掘",
                description: "不要闭门造车。观察其他 Maker 都在构建什么，市场对什么感兴趣。Product Hunt 是新品发布的晴雨表，而 Reddit 则是真实用户吐槽痛点的宝库。",
                tools: [
                    { name: "Product Hunt", url: "https://www.producthunt.com/" },
                    { name: "Toolify", url: "https://www.toolify.ai/" },
                    { name: "X", url: "https://x.com/" },
                    { name: "Reddit", url: "https://www.reddit.com/" },
                    { name: "GitHub Trending", url: "https://github.com/trending" }
                ]
            },
            {
                icon: "📈",
                title: "趋势与热度",
                description: "数据不会说谎。通过关键词搜索量和趋势变化，量化你的“直觉”。如果一个问题的搜索量在持续增长，那么它背后的市场也在增长。",
                tools: [
                    { name: "Google Trends", url: "https://trends.google.com/trends/" },
                    { name: "Keyword Planner", url: "https://ads.google.com/" },
                    { name: "Keyword Tool", url: "https://keywordtool.io/" }
                ]
            },
            {
                icon: "🆚",
                title: "竞品分析",
                description: "知己知彼。分析竞争对手的流量来源、关键词策略和反向链接，能让你少走弯路，甚至发现他们忽略的细分市场。",
                title: "竞品分析",
                tools: [
                    { name: "Ahrefs", url: "https://ahrefs.com/" },
                    { name: "SimilarWeb", url: "https://www.similarweb.com/" },
                    { name: "SEMrush", url: "https://www.semrush.com/" },
                    { name: "Google Alert", url: "https://www.google.com/alerts" }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "产品开发",
        subtitle: "Phase 2: Building",
        intro: "这是将想法变为现实的时刻。现代开发工具栈（Modern Stack）极大地降低了构建产品的门槛。借助 AI 辅助编程和 Serverless 架构，一个人就是一支队伍。",
        number: "02.",
        color: "white", // default white
        categories: [
            {
                icon: "🎨",
                title: "设计与原型",
                description: "颜值即正义。一个优秀的设计不仅能提升用户体验，更是产品专业度的体现。Figma 是协作设计的标准，而 Lovable 等 AI 工具正在重塑设计流程。",
                tools: [
                    { name: "Figma", url: "https://www.figma.com/" },
                    { name: "Lovable", url: "https://lovable.dev/" }
                ]
            },
            {
                icon: "💻",
                title: "全栈开发",
                description: "快速迭代是独立开发的核心。选择生态成熟、部署便捷的技术栈至关重要。Bolt 和 Railway 让部署变得像推特发帖一样简单。",
                tools: [
                    { name: "GitHub", url: "https://github.com/" },
                    { name: "Railway", url: "https://railway.app/" },
                    { name: "Bolt.new", url: "https://bolt.new/" }
                ]
            },
            {
                icon: "🤖",
                title: "API与模型",
                description: "AI 能力是现代应用的新标配。通过 OpenRouter 等聚合平台，你可以轻松接入全球最强的大模型，为应用赋予智能。",
                title: "API与模型",
                tools: [
                    { name: "Vercel", url: "https://vercel.com/" },
                    { name: "OpenRouter", url: "https://openrouter.ai/" },
                    { name: "Replicate", url: "https://replicate.com/" },
                    { name: "Aigocode", url: "https://aigocode.com/" }
                ]
            },
            {
                icon: "🎓",
                title: "AI Training",
                description: "系统的学习和认证是掌握 AI 技能的最佳路径。这里提供专业的人工智能训练师等级认定考试复习资源。",
                tools: [
                    { name: "AI训练师3级考试", url: "/exam", internal: true }
                ]
            },
            {
                icon: "🛡️",
                title: "基础与安全",
                description: "稳健的基础设施是产品长期运行的保障。Cloudflare 不仅提供 CDN 加速，更是免费的安全护盾。Supabase 则是 Firebase 的最佳开源替代。",
                tools: [
                    { name: "Cloudflare", url: "https://www.cloudflare.com/" },
                    { name: "Namecheap", url: "https://www.namecheap.com/" },
                    { name: "v0.dev", url: "https://v0.app/" },
                    { name: "Supabase", url: "https://supabase.com/" },
                    { name: "Together AI", url: "https://together.ai/" }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "推广营销",
        subtitle: "Phase 3: Growth",
        intro: "酒香也怕巷子深。产品上线只是开始，推广与增长才是永恒的主题。建立支付通道，分析用户行为，让产品即使在你睡觉时也能产生被动收入。",
        number: "03.",
        color: "primary", // geek-primary
        categories: [
            {
                icon: "💰",
                title: "支付与订阅",
                description: "全球化收款是出海的最后一公里。Stripe 是行业标准，而 LemonSqueezy 则作为 Merchant of Record 解决了税务合规的痛点。",
                tools: [
                    { name: "Stripe", url: "https://stripe.com/" },
                    { name: "LemonSqueezy", url: "https://lemonsqueezy.com/" },
                    { name: "Paddle", url: "https://paddle.com/" },
                ]
            },
            {
                icon: "📊",
                title: "数据分析",
                description: "无法衡量就无法增长。通过埋点分析，了解用户从哪里来、在页面停留了多久、在哪里流失，从而针对性地优化产品。",
                title: "数据分析",
                tools: [
                    { name: "Google Analytics 4", url: "https://analytics.google.com/" },
                    { name: "Search Console", url: "https://search.google.com/" },
                    { name: "Plausible", url: "https://clarity.microsoft.com/" },
                ]
            }
        ]
    }
];
