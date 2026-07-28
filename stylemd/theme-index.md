# 主题索引与选择决策表

本表是主题信息的**单一来源**。工作流第 1 步据此向用户展示选项，第 2 步据"组件库文件"列读取对应库，下划线标记时据"正文下划线 CSS"列取值。

每个主题的**英文标识**（用于产物命名 `{中文名}({标识}).html`、Agent 引用）= "组件库文件"列去掉 `theme-` 前缀与 `.md` 后缀。展示给用户仍用中文名。

## 已注册主题 (共 6 套精美排版主题)

| 主题 | 主色 | 适用场景 | 组件库文件 | 正文下划线 CSS |
|------|------|---------|-----------|---------------|
| 摸鱼绿 | `#059669` emerald | 教程、测评、清单、工具盘点（卡片丰富、信息密度高，默认推荐） | `stylemd/theme-moyu-green.md` | `border-bottom:2px solid #A7F3D0;font-weight:600;` |
| 红白色系 | `#DC2626` 正红 | 深度分析、观点、力量感话题（经典编辑风，编号章节+引言卡+签名区，红色克制点睛） | `stylemd/theme-red-white.md` | `border-bottom:2px solid #FECACA;font-weight:600;` |
| 石墨极简风 | `#52525B` 石墨灰 | 设计、科技评论、专业观点、高端品牌（极简克制、留白理性、全灰阶） | `stylemd/theme-graphite-minimal.md` | `border-bottom:2px solid #52525B;font-weight:600;` |
| 留白禅意风 | `#4A5D52` 墨绿 | 禅意冥想、极简生活、深度随笔、艺术留白（呼吸感最强） | `stylemd/theme-zen-whitespace.md` | `border-bottom:1.5px solid #B5C8BC;font-weight:500;` |
| 摸鱼票据风 | `#059669` emerald | 测评、工具对比、创意评测（票据/门票视觉隐喻，星级评分+编号+硬阴影卡片） | `stylemd/theme-moyu-ticket.md` | `border-bottom:2px solid #A7F3D0;font-weight:600;` |
| 橄榄手记 | `#1E1F23` 墨黑 (配橙 `#ED7B2F`) | 内刊手记、深度评测、案例复盘、系统性说明文档（编辑部内刊质感） | `stylemd/theme-olive-journal.md` | `border-bottom:2px solid #ED7B2F;font-weight:600;` |

> 💡 **首屏 SVG 矢量开场动画 (通用模块)**：规则定义见 `stylemd/theme-svg-cover-animation.md`。包含墨韵开篇 (`ink-wash`)、打字机流 (`typewriter`)、画卷展开 (`scroll-painting`)、聚焦聚光灯 (`spotlight`)、极简白描 (`minimal-sketch`) 5 种封面形态，全套 6 个主题通用，由 LLM 大模型根据文章语气智能判断并嵌入。

## 选择建议

- **用户选择制**：用户没指定主题时，把本表全部主题列给用户选（中文名 + 适用场景），不替用户定；最贴合题材的主题可标"（推荐）"放第一位。
- 同一篇文章只用一套主题，不混搭。
