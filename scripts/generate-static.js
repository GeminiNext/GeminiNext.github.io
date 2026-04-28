import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../docs');
const TEMPLATE_PATH = path.resolve(DOCS_DIR, 'index.html');
const BLOG_DIR = path.resolve(__dirname, '../src/content/blog');
const SITE_NAME = 'GeminiNext';
const SITE_DESC = '独立开发出海工具 & AI训练师题库 & 技术博客';
const BASE_URL = 'https://gemini4.cn';

async function generate() {
    console.log('🚀 开始执行全站 SEO 深度优化...');

    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error('❌ 找不到 docs/index.html，请先运行 vite build');
        return;
    }

    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    const urls = [BASE_URL, `${BASE_URL}/about`, `${BASE_URL}/blog`, `${BASE_URL}/exam`, `${BASE_URL}/tools` ];
    const blogList = [];

    // 1. 先收集博文信息
    if (fs.existsSync(BLOG_DIR)) {
        const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
        for (const file of files) {
            const slug = file.replace('.md', '');
            const filePath = path.join(BLOG_DIR, file);
            const rawContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(rawContent);
            
            blogList.push({
                title: data.title,
                slug: slug,
                description: data.description,
                date: data.date,
                content: content
            });
        }
    }

    // 按日期排序博文
    blogList.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 2. 深度优化首页 (docs/index.html)
    const latestPostsHtml = blogList.slice(0, 8).map(post => `
        <li style="margin-bottom: 1rem;">
            <a href="/blog/${post.slug}" style="font-weight: 600; color: #60a5fa; text-decoration: none;">${post.title}</a>
            <p style="font-size: 0.875rem; color: #9ca3af; margin: 0.25rem 0;">${post.description || ''}</p>
        </li>
    `).join('');

    const homeContentHtml = `
        <div style="max-width: 800px; margin: 0 auto; padding: 4rem 1rem; font-family: sans-serif;">
            <header style="text-align: center; margin-bottom: 4rem;">
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${SITE_NAME}</h1>
                <p style="font-size: 1.25rem; color: #9ca3af;">${SITE_DESC}</p>
            </header>
            <section>
                <h2 style="font-size: 1.5rem; border-bottom: 1px solid #374151; padding-bottom: 0.5rem; margin-bottom: 2rem;">最新文章 / Latest Posts</h2>
                <ul style="list-style: none; padding: 0;">
                    ${latestPostsHtml}
                </ul>
                <div style="margin-top: 2rem;">
                    <a href="/blog" style="color: #3b82f6;">查看更多文章...</a>
                </div>
            </section>
        </div>
    `;

    const homeHtml = template
        .replace('<title>GeminiNext</title>', `<title>${SITE_NAME} | ${SITE_DESC}</title>`)
        .replace('</head>', `
            <meta name="description" content="${SITE_DESC}">
            <link rel="canonical" href="${BASE_URL}/">
            <meta property="og:title" content="${SITE_NAME}">
            <meta property="og:description" content="${SITE_DESC}">
            <meta property="og:type" content="website">
            <meta property="og:url" content="${BASE_URL}/">
            </head>`)
        .replace('<div id="root"></div>', `<div id="root">${homeContentHtml}</div>`);
    
    fs.writeFileSync(TEMPLATE_PATH, homeHtml);
    console.log('✅ 首页 SEO 静态化完成');

    // 3. 循环生成博文详情页
    for (const post of blogList) {
        const bodyHtml = await marked.parse(post.content);
        const pageUrl = `${BASE_URL}/blog/${post.slug}`;
        urls.push(pageUrl);

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description || SITE_DESC,
            "author": { "@type": "Person", "name": "SunXin" },
            "datePublished": post.date || new Date().toISOString(),
            "url": pageUrl
        };

        let pageHtml = template // 注意：这里用原始 template 确保占位符存在
            .replace('<title>GeminiNext</title>', `<title>${post.title} | ${SITE_NAME}</title>`)
            .replace('</head>', `
                <meta name="description" content="${post.description || ''}">
                <link rel="canonical" href="${pageUrl}">
                <meta property="og:title" content="${post.title}">
                <meta property="og:description" content="${post.description || ''}">
                <meta property="og:type" content="article">
                <meta property="og:url" content="${pageUrl}">
                <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
                </head>`)
            .replace('<div id="root"></div>', `<div id="root"><article class="prose prose-invert lg:prose-xl mx-auto">${bodyHtml}</article></div>`);

        const targetDir = path.join(DOCS_DIR, 'blog', post.slug);
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml);
        console.log(`✅ 已生成: /blog/${post.slug}`);
    }

    // 4. 生成 Sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
    <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${url === BASE_URL ? '1.0' : '0.8'}</priority>
    </url>`).join('')}
</urlset>`;
    fs.writeFileSync(path.join(DOCS_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ 已生成: sitemap.xml');

    // 5. 生成 Robots.txt
    const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml`;
    fs.writeFileSync(path.join(DOCS_DIR, 'robots.txt'), robots);
    console.log('✅ 已生成: robots.txt');

    // 6. 404 页面
    fs.copyFileSync(TEMPLATE_PATH, path.join(DOCS_DIR, '404.html'));

    console.log('✨ 全站 SEO 增强生成完毕！');
}

generate().catch(console.error);
