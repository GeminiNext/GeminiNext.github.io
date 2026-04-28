# 标准预渲染方案 (vite-plugin-prerender)

## 1. 背景与目标
利用 Vite 插件生态实现高保真的静态页面预渲染，确保源码包含完整正文内容。

**目标：**
- **工程化**：预渲染逻辑集成于 Vite 构建流水线。
- **动态发现**：自动根据 Markdown 文件生成博文路由。
- **高兼容性**：支持复杂的暗黑模式、交互组件，不产生水合崩溃。

---

## 2. 技术选型
- **核心插件**：`@prerenderer/rollup-plugin` (或 `vite-plugin-prerender`)
- **驱动引擎**：Puppeteer / Playwright (无头浏览器)
- **动态路由**：利用 Node.js `fs` 模块动态计算静态路由列表。

---

## 3. 实施细节

### A. 配置 vite.config.js
在插件配置中引入 Prerenderer，并注入动态路由：
```javascript
// 示例代码逻辑
import Prerenderer from '@prerenderer/rollup-plugin'

export default defineConfig({
  plugins: [
    react(),
    Prerenderer({
      // 需要预渲染的路由列表
      routes: ['/', '/about', ...getBlogRoutes()],
      // 渲染完成后输出到的目录
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterElementExists: '.article-content', // 确保正文出现后再抓取
      },
      postProcess(renderedRoute) {
        // 可以在这里对生成的 HTML 进行最后的微调
        renderedRoute.html = renderedRoute.html.replace(/http:\/\/localhost:\d+/g, '');
        return renderedRoute;
      }
    })
  ]
})
```

### B. 动态路由发现
编写一个工具函数 `getBlogRoutes()`，在构建时扫描 `src/content/blog/*.md`，将文件名映射为 `/blog/slug` 路由。

### C. 目录适配
配置 `outDir: 'docs'`，确保插件生成的 `index.html` 正确分布在子文件夹中。

---

## 4. 方案优势
1. **源码完整**：生成的 HTML 文件中直接包含由 React 渲染出的所有 DOM 节点，完全满足 SEO 需求。
2. **零运行时开销**：部署后，用户访问的是纯静态 HTML，直到 JS 水合完成。
3. **维护简单**：新增博文后，只需运行一次 build，对应的静态目录会自动生成。

---

## 5. 待执行操作
1. **依赖更新**：安装 `@prerenderer/rollup-plugin` 和相关的 renderer。
2. **路由函数实现**：在 Vite 配置文件中编写扫描代码。
3. **测试验证**：本地构建后检查 `docs/blog/xxx/index.html` 的源码。
