# PlayOnHub 运营 SOP（标准操作流程）

> 文档版本：v1.0 | 最后更新：2026-07-07
> 网站地址：https://playonhub.com
> 技术栈：Next.js 16 + TypeScript + Tailwind CSS + Vercel

---

## 1. 项目概览

### 1.1 网站信息
- 域名：playonhub.com（Spaceship 注册，$2.88/年）
- 托管：Vercel 免费版
- 仓库：https://github.com/whyont/playonhub
- 内容类型：免费在线浏览器游戏门户
- 当前规模：21 个游戏 + 12 篇博客

### 1.2 核心工具账号
| 工具 | 用途 | 状态 |
|------|------|------|
| Spaceship | 域名管理 + DNS | ✅ 已配置 |
| GitHub | 代码仓库 | ✅ 已配置 |
| Vercel | 部署托管 | ✅ 已配置 |
| Google Search Console | SEO 收录监控 | ✅ 已验证 |
| Google Analytics 4 | 流量分析 (G-VFTLSFE4FE) | ✅ 已接入 |
| Google AdSense | 广告变现 | ⬜ 待申请 |

### 1.3 转阶段条件（Phase 1 → Phase 2）
需满足 3/4 条件：
1. 月收入 $300+ — ⬜ 未开始
2. 日均 UV 150+ — ⬜ 未开始
3. SOP 文档化 — ✅ 本文档
4. AdSense 稳定 2 月+ — ⬜ 未申请

---

## 2. 内容更新 SOP

### 2.1 添加新游戏

**前置条件：**
- 游戏必须在 CrazyGames 上可用
- Embed URL 格式：`https://www.crazygames.com/embed/{slug}`
- 用 curl 验证：返回 200 或 401 = 可用，404 = 不可用

**操作步骤：**

1. **验证游戏可用性**
   ```bash
   curl -sI "https://www.crazygames.com/embed/{slug}" | head -1
   ```

2. **生成缩略图**
   - 使用 AI 图片生成工具
   - 尺寸：landscape_4_3
   - 保存到：`public/thumbnails/{slug}.jpg`
   - 提示词模板：`Game thumbnail for "{Game Name}" - {简短描述}. {色彩方案}. {风格}. 16:9 ratio, game cover art. No text.`

3. **更新游戏数据**
   - 编辑 `src/data/games.json`
   - 在数组末尾添加新游戏对象
   - 必填字段：slug, title, category, description, embedUrl, thumbnail, tags, featured, howToPlay, tips[], faq[]

4. **构建测试**
   ```bash
   cd playonhub
   npm run build
   ```

5. **推送部署**
   ```bash
   git add -A
   git commit -m "Add game: {game name}"
   git push origin main
   ```

6. **验证线上效果**
   - 等 Vercel 部署完成（1-2 分钟）
   - 访问 `https://playonhub.com/games/{slug}` 确认游戏可玩

### 2.2 添加博客文章

**操作步骤：**

1. **关键词研究**
   - 目标关键词搜索量 ≥ MEDIUM 级别
   - 优先选择有"unblocked"、"guide"、"tips"等高商业意图后缀的词

2. **更新博客数据**
   - 编辑 `src/data/blog-posts.json`
   - 在数组末尾添加新文章对象
   - 必填字段：slug, title, category, gameSlug, excerpt, content, publishedAt, keywords[]
   - content 使用 Markdown 语法（## 标题, - 列表, **加粗**）
   - **注意：JSON 中不能有 ``` 代码块**，用纯文本描述代替

3. **字数要求**
   - 每篇 ≥ 500 词
   - 包含 How to Play、Tips、FAQ 等结构化内容
   - 自然嵌入 PlayOnHub 品牌提及和 CTA

4. **构建 + 推送**（同上）

### 2.3 替换失效游戏

**触发条件：**
- 用户报告游戏无法加载
- 定期检查发现 embed URL 返回 404

**操作步骤：**
1. 用 curl 验证 embed URL 状态码
2. 如果 404，搜索 CrazyGames 找替代游戏
3. 更新 games.json 中的 slug 和 embedUrl
4. 生成新缩略图
5. 构建测试 + 推送

---

## 3. 推广运营 SOP

### 3.1 每日推广任务

**时间：每天 09:00（TRAE 定时任务自动提醒）**

| 平台 | 频率 | 内容 | 素材位置 |
|------|------|------|---------|
| Twitter/X | 每天 1 条 | 游戏推荐 + 链接 | PROMOTION-MATERIALS.md |
| Pinterest | 每天 1 个 Pin | 游戏推广图 + 描述 | public/social/ |
| Reddit | 每天 1 帖 | 帖子（可自动发） | scripts/reddit_autoposter.py |

### 3.2 Reddit 自动发帖

**前置配置（一次性）：**
1. 访问 https://www.reddit.com/prefs/apps
2. 创建 Script 类型应用
3. 在 `scripts/reddit_autoposter.py` 填入 client_id、client_secret、username、password
4. 安装依赖：`pip install praw`

**手动发帖：**
```bash
cd playonhub
python scripts/reddit_autoposter.py
```

**自动发帖（加 --auto 跳过确认）：**
```bash
python scripts/reddit_autoposter.py --auto
```

**全自动定时发帖：**
- Windows 任务计划程序 → 每日 09:30 → 运行上述命令

### 3.3 Pinterest 发布规范

1. 创建看板 "Free Browser Games"
2. 每天发布 1 个 Pin（不要批量发）
3. 每个 Pin 包含：标题 + 描述（含 5-8 个标签）+ 图片 + 链接
4. 图片在 `public/social/` 目录下
5. Pin 描述中自然包含目标关键词

### 3.4 网站目录提交

| 平台 | 链接 | 状态 |
|------|------|------|
| Product Hunt | https://producthunt.com | ⬜ 待提交 |
| AlternativeTo | https://alternativeto.net | ⬜ 待提交 |
| Slant.co | https://www.slant.co | ⬜ 待提交 |
| BetaList | https://betalist.com | ⬜ 待提交 |
| Indie Hackers | https://www.indiehackers.com | ⬜ 待提交 |

---

## 4. 数据监控 SOP

### 4.1 每日检查（5 分钟）

**Google Search Console：**
- 检查"网页索引" → 已收录页面数
- 检查"搜索结果" → 是否有曝光和点击
- 如有新页面未收录 → 手动请求索引

**Google Analytics 4：**
- 检查昨日 UV、PV
- 检查流量来源（Google / 直接 / 外链）
- 检查热门页面

### 4.2 每周检查（15 分钟）

**Search Console：**
- 关键词排名变化
- 新增展示关键词
- sitemap 提交状态

**Vercel Dashboard：**
- 部署状态
- 网站性能指标

**游戏可用性：**
- 批量检查所有游戏 embed URL
- 脚本：`curl -sI "https://www.crazygames.com/embed/{slug}" | head -1`

### 4.3 每月复盘

- 统计月度 UV/PV 增长
- 统计 AdSense 收入（如有）
- 评估转阶段条件达成情况
- 调整下月内容策略

---

## 5. AdSense 申请 SOP

### 5.1 申请前置条件

| 条件 | 要求 | 当前状态 |
|------|------|---------|
| 页面数量 | ≥ 20 个游戏页 + 10 篇博客 | ✅ 21 游戏 + 12 博客 |
| Google 收录 | ≥ 20 页面被索引 | ⬜ 待确认 |
| 原创内容 | 每页 300+ 词原创文字 | ✅ |
| 必需页面 | About/Contact/Privacy/Terms | ✅ |
| 运行时间 | 网站运行 ≥ 2 周 | ⬜ 等待中 |

### 5.2 申请步骤

1. 确认 Search Console 已收录 20+ 页面
2. 访问 https://adsense.google.com
3. 提交 playonhub.com
4. 等待审核（通常 1-2 周）
5. 审核通过后：
   - 获取 Publisher ID (ca-pub-XXXXXXXXXX)
   - 编辑 `src/app/layout.tsx`，在 `<head>` 中添加 AdSense 脚本
   - 编辑 `src/components/AdSlot.tsx`，取消注释并配置广告位 ID
   - 在游戏页和博客页插入 AdSlot 组件

---

## 6. 技术维护 SOP

### 6.1 代码更新流程

```
1. 修改代码
2. npm run build（本地验证）
3. git add -A
4. git commit -m "描述变更内容"
5. git push origin main
6. Vercel 自动部署（1-2 分钟）
7. 线上验证
```

### 6.2 DNS 管理

- DNS 服务商：Spaceship
- 当前记录：
  - A 记录：@ → 216.198.79.1
  - CNAME：www → {vercel-dns-hash}.vercel-dns.com
  - TXT：google-site-verification=gJVbpkbpQ-Alqhz-WPygH875R-_4VwHJBnpyR5Ate8U
- 注意：@ 不能同时有 A 记录和 CNAME 记录（DNS 规范冲突）

### 6.3 定期维护任务

| 频率 | 任务 | 说明 |
|------|------|------|
| 每周 | 检查游戏可用性 | curl 检测 embed URL |
| 每月 | 检查依赖更新 | npm outdated |
| 每月 | 检查 Search Console | 收录情况、错误页面 |
| 每季度 | 域名续费提醒 | Spaceship 续费 |

---

## 7. 关键文件索引

| 文件 | 说明 |
|------|------|
| `src/data/games.json` | 游戏数据（21 个游戏） |
| `src/data/blog-posts.json` | 博客数据（12 篇文章） |
| `src/lib/games.ts` | 类型定义 + 工具函数 |
| `src/app/layout.tsx` | 根布局（GA4、字体、favicon） |
| `src/app/globals.css` | 全局样式（Neon Arcade 主题） |
| `src/app/page.tsx` | 首页 |
| `src/app/games/[slug]/page.tsx` | 游戏详情页 |
| `src/app/blog/[slug]/page.tsx` | 博客详情页 |
| `src/app/sitemap.ts` | 动态 sitemap |
| `src/app/robots.ts` | robots.txt |
| `PROMOTION-MATERIALS.md` | 推广素材包 |
| `scripts/reddit_autoposter.py` | Reddit 自动发帖脚本 |
| `SOP.md` | 本文档 |

---

## 8. 应急处理

### 8.1 网站无法访问

1. 检查 Vercel 部署状态 → https://vercel.com/dashboard
2. 检查 DNS 解析 → `nslookup playonhub.com 8.8.8.8`
3. 检查 Vercel Domains 状态
4. 如果 DNS 记录丢失 → 重新在 Spaceship 配置

### 8.2 游戏无法加载

1. 检查 embed URL → `curl -sI "https://www.crazygames.com/embed/{slug}"`
2. 如果 404 → 游戏已下架，按 2.3 节替换
3. 如果 200/401 → 检查 iframe 代码是否正确

### 8.3 Git 推送失败

1. 检查网络连接 → `ping github.com`
2. 如果网络问题 → 配置代理：`git config --global http.proxy http://127.0.0.1:7890`
3. 如果权限问题 → 检查 GitHub SSH/Token 配置
