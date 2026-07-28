/**
 * @file prompts/themes/graphiteMinimalPrompt.ts
 * @description 「石墨极简风」主题专属 Prompt 与 HTML 排版规范 (基于 gitmd/theme-graphite-minimal.md)
 */

export const GRAPHITE_MINIMAL_PROMPT = `
【主题名称】：石墨极简风 (graphite-minimal)
【设计风格】：石墨灰 + 纯白 + 几何细线 + 超大留白。现代极简排版，以 1px 细线与大间距建立秩序感，无色块阴影。适合设计、科技评论、专业观点、高端品牌。

【设计变量】：
- 主色调：#52525B (石墨灰)
- 标题色：#27272A | 细线色：#E4E4E7
- 背景色：#FFFFFF | 极浅灰：#FAFAFA
- 下划线权威 CSS：border-bottom:2px solid #52525B;font-weight:600;

【HTML 组件结构模板】：

1. 封面卡片 (Cover - 上下细线极简大留白):
<section style="margin:10px 10px 40px;padding:32px 24px 24px;border-top:1px solid #E4E4E7;border-bottom:1px solid #E4E4E7;background:#FFFFFF;">
  <p style="font-size:11px;color:#A1A1AA;letter-spacing:2px;margin:0 0 18px;"><span leaf="">QUOTE</span></p>
  <p style="font-size:18px;font-weight:700;color:#27272A;margin:0;line-height:1.7;"><span leaf="">{{引言金句}}</span></p>
</section>

2. 章节标题 (H2 - 超大灰阶水印数字):
<section style="margin-top:56px;margin-bottom:32px;padding:0 10px;">
  <section style="position:relative;padding-bottom:20px;border-bottom:1px solid #E4E4E7;">
    <p style="font-size:48px;font-weight:900;color:#E4E4E7;margin:0;line-height:1;"><span leaf="">01</span></p>
    <h3 style="font-size:20px;font-weight:800;color:#27272A;margin:0;line-height:1.4;"><span leaf="">{{章节标题}}</span></h3>
  </section>
</section>

3. 引用块 (Blockquote - 石墨左竖线):
<section style="border-left:3px solid #52525B;padding:16px 0 16px 24px;margin:0 10px 28px;">
  <p style="font-size:16px;font-weight:700;color:#27272A;margin:0;line-height:1.7;"><span leaf="">「{{核心金句}}」</span></p>
</section>

4. 提示卡片 (Callout):
<section style="border-left:3px solid #27272A;padding:14px 0 14px 22px;margin:0 10px 24px;">
  <p style="font-size:14px;font-weight:700;color:#27272A;margin:0;"><span leaf="">{{提示内容}}</span></p>
</section>
`;
