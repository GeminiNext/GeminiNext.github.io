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

async function generate() {
    console.log('🚀 开始生成静态 SEO 页面...');

    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error('❌ 找不到 docs/index.html，请先运行 vite build');
        return;
    }

    let template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    // 0. 优化首页 (docs/index.html) - 使用原始模板副本进行首页处理
    const homeHtml = template
        .replace('<title>GeminiNext</title>', `<title>${SITE_NAME} | ${SITE_DESC}</title>`)
        .replace('</head>', `<meta name="description" content="${SITE_DESC}"></head>`)
        .replace('<div id="root"></div>', `<div id="root"><div class="p-20 text-center"><h1>${SITE_NAME}</h1><p>${SITE_DESC}</p></div></div>`);
    fs.writeFileSync(TEMPLATE_PATH, homeHtml);
    console.log('✅ 已优化首页: index.html');

    // 1. 处理博文页面 - 使用原始 template 确保 <div id="root"></div> 占位符存在
    if (fs.existsSync(BLOG_DIR)) {
        const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
        
        for (const file of files) {
            const slug = file.replace('.md', '');
            const filePath = path.join(BLOG_DIR, file);
            const rawContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(rawContent);
            
            // 将 Markdown 转为 HTML
            const bodyHtml = await marked.parse(content);
            
            // 注入 Title, Meta 和 Body
            let pageHtml = template
                .replace('<title>GeminiNext</title>', `<title>${data.title} | ${SITE_NAME}</title>`)
                .replace('</head>', `<meta name="description" content="${data.description || ''}"></head>`)
                .replace('<div id="root"></div>', `<div id="root"><article class="prose prose-invert lg:prose-xl mx-auto">${bodyHtml}</article></div>`);

            // 创建目录并写入
            const targetDir = path.join(DOCS_DIR, 'blog', slug);
            fs.mkdirSync(targetDir, { recursive: true });
            fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml);
            
            console.log(`✅ 已生成: /blog/${slug}`);
        }
    }

    // 2. 生成 404 页面以支持 GitHub Pages
    fs.copyFileSync(TEMPLATE_PATH, path.join(DOCS_DIR, '404.html'));
    console.log('✅ 已生成: 404.html');

    console.log('✨ 静态 SEO 页面生成完毕！');
}

generate().catch(console.error);
