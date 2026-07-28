/**
 * @file prompts/themes/zenWhitespacePrompt.ts
 * @description 「留白禅意风」主题专属 Prompt 与 HTML 排版规范 (基于 gitmd/theme-zen-whitespace.md)
 */

export const ZEN_WHITESPACE_PROMPT = `
【主题名称】：留白禅意风 (zen-whitespace)
【设计风格】：墨绿 + 极简自然留白。呼吸感最强，淡雅如茶，没有任何抢眼色块。适合禅意冥想、极简生活、深度随笔、艺术留白。

【设计变量】：
- 主色调：#4A5D52 (墨绿)
- 细线色：#B5C8BC | 正文色：#2D3732 | 标题色：#36453D | 背景：#F5F7F6
- 下划线权威 CSS：border-bottom:1.5px solid #B5C8BC;font-weight:500;

【HTML 组件结构模板】：

1. 封面卡片 (Cover - 上下绿线素雅大留白):
<section style="margin:20px 10px 40px;padding:32px 20px;border-top:1px solid #B5C8BC;border-bottom:1px solid #B5C8BC;">
  <p style="font-size:16px;font-weight:600;color:#36453D;margin:0;line-height:1.8;text-align:center;"><span leaf="">{{引言金句}}</span></p>
</section>

2. 章节标题 (H2 - 居中连字符):
<section style="margin-top:52px;margin-bottom:28px;text-align:center;">
  <p style="font-size:12px;color:#B5C8BC;letter-spacing:4px;margin:0 0 4px;"><span leaf="">— 01 —</span></p>
  <h3 style="font-size:18px;font-weight:700;color:#36453D;margin:0;"><span leaf="">{{章节标题}}</span></h3>
</section>

3. 引用块 (Blockquote - 浅绿细框):
<section style="padding:16px 20px;margin:0 10px 24px;border-left:2px solid #B5C8BC;background:#F5F7F6;">
  <p style="font-size:14px;color:#2D3732;margin:0;line-height:1.8;"><span leaf="">{{引用内容}}</span></p>
</section>

4. 提示卡片 (Callout):
<section style="padding:14px 18px;margin:0 10px 24px;background:#F5F7F6;border-radius:6px;">
  <p style="font-size:13px;color:#36453D;margin:0;"><span leaf="">🍃 {{提示内容}}</span></p>
</section>
`;
