# 关联档案 · FIELD NOTES

刘丹钰的跨媒介个人作品集。Vite + React，构建为纯静态文件，可直接部署到 Vercel。

## 已实现

- 桌面端（≥1200px）保留原始 1440×1024 空间作品地图：自由拖动、按钮或键盘加减缩放、复位视图。
- 平板端（768–1199px）与手机端（≤767px）切换为纵向流式排版，避免画布整体缩放导致文字过小。
- 点击形态、色彩、秩序查看相关作品；漫游与目录两种浏览方式，主题筛选同步。
- 手机与平板使用可展开、可收起的导航菜单（点遮罩、按 Esc、选择条目三种方式都能关闭）。
- 五个作品档案：查看图片、作品说明、创作思路和关联作品。
- 手机端作品网格为单列；图片按需懒加载；尊重系统「减少动态效果」设置。

## 响应式断点

| 设备 | 宽度 | 布局 |
| --- | --- | --- |
| 手机 | ≤767px（375 / 390 / 430） | 单列作品网格、顶部汉堡菜单、底部固定浏览切换 |
| 平板 | 768–1199px（768） | 双列作品网格、放大字号与间距、汉堡菜单 |
| 桌面 | ≥1200px（1440） | 原始 1440×1024 空间画布 |

作品图片一律使用 `object-fit: contain`，只等比缩放，不裁切、不变形。

## 替换个人内容

所有作品信息集中在 `src/portfolio.js`：`profile` 是个人资料与联系方式，`works` 包含标题、分类、图片、主题和详情。把真实作品图片放进 `public/assets/works/`，并更新对应路径（`asset(group, index, label)` 生成 `/assets/works/<group>-<index>.webp`）。

关于面板的文字位于 `src/App.jsx`。没有填写邮箱时，会显示「联系方式即将补充」，不提供虚假的联系地址。

## 本地运行

```sh
npm install
npm run dev            # 默认 http://localhost:5173
npm run dev:host       # 同时监听 0.0.0.0，手机可直接访问局域网 IP
```

## 预览生产构建

```sh
npm run build
npm run preview        # http://127.0.0.1:4173
```

`vite.config.mjs` 已把 preview 固定为 `host: true` + `port: 4173` + `strictPort: true`，所以手机可以通过电脑的局域网 IP 加 `:4173` 打开同一份构建产物。

## 部署到 Vercel

仓库根目录已包含 `vercel.json`。把项目推到 GitHub 后在 Vercel 导入，使用以下设置：

| 设置 | 值 |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `.`（仓库根目录就是本项目时；若仓库还有上层目录，则填该子目录，例如 `outputs/field-notes`） |
| Build Command | `npm run build:vercel` |
| Output Directory | `dist/client` |
| Install Command | `npm install` |
| Node.js Version | 20.x 或 22.x |

`npm run build`（额外生成给 Sites 用的 `dist/server/index.js`）也能跑通，但 Vercel 只需要 `npm run build:vercel` 的纯静态产物。

`vercel.json` 的 `rewrites` 会把未命中的路径回退到 `/index.html`，因此直接刷新任意地址都会显示作品集本身，而不是 Vercel 的 404 页面。

本项目不需要任何环境变量；`vite.config.mjs` 里的 `ALLOWED_HOSTS` 仅用于本地开发/预览时放行额外域名，未设置时默认 `terminal.local`。

## 视觉来源

基于用户选择的第三张概念图「关联档案」。五张示例素材由内置 ImageGen 生成。图像提示词摘要：粗粝陶土与蓝色釉面器物；红蓝几何海报；城市湿润街道与逆光行人；透明玻璃与黑色石块；黑底白色点阵波浪。

字体采用 [Anton](https://fonts.google.com/specimen/Anton)，图标采用 [Phosphor](https://github.com/phosphor-icons/react)。资源随网站本地加载。
