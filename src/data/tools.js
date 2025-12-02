export const phases = [
    {
        id: 1,
        title: "需求挖掘",
        subtitle: "Phase 1: Discovery",
        number: "01.",
        color: "secondary", // geek-secondary
        categories: [
            {
                icon: "🕵️",
                title: "灵感与挖掘",
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
                tools: [
                    { name: "Google Trends", url: "https://trends.google.com/trends/" },
                    { name: "Keyword Planner", url: "https://ads.google.com/" },
                    { name: "Keyword Tool", url: "https://keywordtool.io/" }
                ]
            },
            {
                icon: "🆚",
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
        number: "02.",
        color: "white", // default white
        categories: [
            {
                icon: "🎨",
                title: "设计与原型",
                tools: [
                    { name: "Figma", url: "https://www.figma.com/" },
                    { name: "Lovable", url: "https://lovable.dev/" }
                ]
            },
            {
                icon: "💻",
                title: "全栈开发",
                tools: [
                    { name: "GitHub", url: "https://github.com/" },
                    { name: "Railway", url: "https://railway.app/" },
                    { name: "Bolt.new", url: "https://bolt.new/" }
                ]
            },
            {
                icon: "🤖",
                title: "API与模型",
                tools: [
                    { name: "Vercel", url: "https://vercel.com/" },
                    { name: "OpenRouter", url: "https://openrouter.ai/" },
                    { name: "Replicate", url: "https://replicate.com/" },
                    { name: "Aigocode", url: "https://aigocode.com/" }
                ]
            },
            {
                icon: "🛡️",
                title: "基础与安全",
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
        number: "03.",
        color: "primary", // geek-primary
        categories: [
            {
                icon: "💰",
                title: "支付与订阅",
                tools: [
                    { name: "Stripe", url: "https://stripe.com/" },
                    { name: "LemonSqueezy", url: "https://lemonsqueezy.com/" },
                    { name: "Paddle", url: "https://paddle.com/" },
                ]
            },
            {
                icon: "📊",
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
