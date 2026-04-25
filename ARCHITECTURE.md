# gemini4.cn 项目架构文档 (Architecture Guide)

本文档旨在说明项目的核心架构设计、目录结构以及开发规范，帮助开发人员快速理解并扩展本项目。

## 1. 技术栈概览
- **核心框架**: React 19 + Vite
- **路由管理**: React Router 7 (BrowserRouter)
- **样式方案**: Tailwind CSS
- **部署平台**: GitHub Pages (部署至 `docs/` 目录)
- **核心特性**: 
  - 响应式设计 (Responsive Design)
  - 全局暗黑/亮色模式切换 (Global Theme Context)
  - SEO 动态管理 (Dynamic Meta Tags)
  - 路由级代码分割 (Lazy Loading)

---

## 2. 目录结构

```text
gemini4.cn/
├── docs/                   # 生产环境编译产物 (GitHub Pages 部署目录)
├── public/                 # 静态资源
│   ├── prompt_images/      # Prompt 库图片资源
│   └── 404.html            # SPA 路由重定向脚本 (关键)
├── src/
│   ├── components/         # 通用共享组件 (Navbar, Footer, ToolCard 等)
│   ├── contexts/           # 全局状态 (ThemeContext)
│   ├── data/               # 静态数据源 (JSON/JS)
│   ├── features/           # 业务功能模块 (按领域划分)
│   │   ├── blog/           # 博客模块 (列表 + 详情)
│   │   ├── exam/           # 考试系统模块 (题库 + 实操)
│   │   ├── home/           # 首页模块
│   │   ├── tools/          # 工具集与 Prompt 库
│   │   └── pages/          # 基础页面 (About, Privacy)
│   ├── hooks/              # 自定义 Hooks (useDocumentMeta, useTheme)
│   ├── layouts/            # 布局组件 (MainLayout)
│   ├── App.jsx             # 核心路由配置与模块入口
│   ├── main.jsx            # React 挂载入口
│   └── index.css           # 全局样式与设计变量
├── ARCHITECTURE.md         # 架构说明文档 (本文件)
├── index.html              # SPA 首页入口
└── vite.config.js          # Vite 构建配置
```

---

## 3. 核心机制说明

### 3.1 GitHub Pages 路由适配 (SPA Redirect)
由于 GitHub Pages 不支持服务端路由，直接刷新 `/blog` 会报 404。我们采用了以下方案解决：
1. **`public/404.html`**: 当 404 发生时，脚本捕获当前路径并重定向至 `index.html`，同时将路径作为参数携带。
2. **`index.html`**: 顶部的脚本会解析参数，通过 `history.replaceState` 恢复真实路径。
3. **BrowserRouter**: React 接收到恢复后的路径，正常渲染对应组件。

### 3.2 模块化开发 (Feature-based)
项目采用 **Feature-based** 结构，每个功能模块（如 `exam`）包含其特有的页面和逻辑。
- **添加新功能**: 在 `src/features/` 下创建新文件夹。
- **共享逻辑**: 如果是多个模块共用的组件，放在 `src/components/`。

### 3.3 主题系统 (Theme System)
通过 `ThemeContext` 实现全局控制。
- **状态同步**: 自动同步至 `localStorage` (key: `gemini4DarkMode`)。
- **CSS 钩子**: 切换时会在 `<html>` 标签上添加/移除 `.dark` 类，利用 Tailwind 的 dark mode 功能或全局变量控制样式。

### 3.4 SEO 优化
每个功能页面必须使用 `useDocumentMeta` Hook：
```javascript
useDocumentMeta({
    title: '页面标题',
    description: '页面描述内容'
});
```

---

## 4. 开发规范建议

1. **路由添加**: 在 `src/App.jsx` 中使用 `lazy()` 导入新页面，并定义对应的 `Route`。
2. **数据更新**: 题库或工具列表更新，请直接修改 `src/data/` 下对应的 JSON/JS 文件。
3. **代码风格**: 保持组件文件名为 `Page.jsx` 后缀以区分功能页面与小型组件。
4. **资源引用**: `public/` 目录下的图片请使用绝对路径 `/path/to/img` 引用。

## 5. 构建与部署
执行以下命令生成生产环境代码：
```bash
npm run build
```
产物将输出至 `docs/` 目录，提交代码到 GitHub 后会自动通过 GitHub Actions 部署。
