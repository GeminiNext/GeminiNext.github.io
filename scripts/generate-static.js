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
const BASE_URL = 'https://gemini4.cn'; // 请确认你的最终域名

async function generate() {
    console.log('🚀 开始执行专业级 SEO 增强...');

    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error('❌ 找不到 docs/index.html，请先运行 vite build');
        return;
    }

    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    const urls = [BASE_URL, `${BASE_URL}/about`, `${BASE_URL}/blog`, `${BASE_URL}/exam`, `${BASE_URL}/tools` ];

    // 0. 优化首页
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
        .replace('<div id="root"></div>', `<div id="root"><div class="p-20 text-center"><h1>${SITE_NAME}</h1><p>${SITE_DESC}</p></div></div>`);
    fs.writeFileSync(TEMPLATE_PATH, homeHtml);
    console.log('✅ 已优化首页 (Index & Meta)');

    // 1. 处理博文页面
    if (fs.existsSync(BLOG_DIR)) {
        const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
        
        for (const file of files) {
            const slug = file.replace('.md', '');
            const filePath = path.join(BLOG_DIR, file);
            const rawContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(rawContent);
            const bodyHtml = await marked.parse(content);
            const pageUrl = `${BASE_URL}/blog/${slug}`;
            urls.push(pageUrl);

            // 构造 JSON-LD 结构化数据
            const jsonLd = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": data.title,
                "description": data.description || SITE_DESC,
                "author": { "@type": "Person", "name": "SunXin" },
                "datePublished": data.date || new Date().toISOString(),
                "url": pageUrl
            };

            // 注入
            let pageHtml = template
                .replace('<title>GeminiNext</title>', `<title>${data.title} | ${SITE_NAME}</title>`)
                .replace('</head>', `
                    <meta name="description" content="${data.description || ''}">
                    <link rel="canonical" href="${pageUrl}">
                    <meta property="og:title" content="${data.title}">
                    <meta property="og:description" content="${data.description || ''}">
                    <meta property="og:type" content="article">
                    <meta property="og:url" content="${pageUrl}">
                    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
                    </head>`)
                .replace('<div id="root"></div>', `<div id="root"><article class="prose prose-invert lg:prose-xl mx-auto">${bodyHtml}</article></div>`);

            const targetDir = path.join(DOCS_DIR, 'blog', slug);
            fs.mkdirSync(targetDir, { recursive: true });
            fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml);
            console.log(`✅ 已生成: /blog/${slug} (含结构化数据)`);
        }
    }

    // 2. 生成 Sitemap.xml
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

    // 3. 生成 Robots.txt
    const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml`;
    fs.writeFileSync(path.join(DOCS_DIR, 'robots.txt'), robots);
    console.log('✅ 已生成: robots.txt');

    // 4. 404 页面
    fs.copyFileSync(TEMPLATE_PATH, path.join(DOCS_DIR, '404.html'));

    console.log('✨ 专业级 SEO 优化全部完成！');
}

generate().catch(console.error);
