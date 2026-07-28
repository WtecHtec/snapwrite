/**
 * @file prompts/themes/oliveJournalPrompt.ts
 * @description 「橄榄手记」主题专属 Prompt 与 HTML 排版规范 (基于 gitmd/theme-olive-journal.md)
 */

export const OLIVE_JOURNAL_PROMPT = `
【主题名称】：橄榄手记 (olive-journal)
【设计风格】：编辑部内刊手记质感，墨黑主色配热烈橙点睛。分节丰富，适合内刊手记、深度评测、案例复盘、系统性说明文档。

【设计变量】：
- 主色调：#1E1F23 (墨黑) | 橙色点睛：#ED7B2F
- 浅背景：#F8F9FA | 文本色：#2B2C30
- 下划线权威 CSS：border-bottom:2px solid #ED7B2F;font-weight:600;

【HTML 组件结构模板】：

1. 封面卡片 (Cover - 黑底橙标内刊卡):
<section style="margin:0 10px 32px;background:#1E1F23;color:#ffffff;border-radius:12px;padding:28px 24px;">
  <p style="font-size:11px;color:#ED7B2F;font-weight:700;letter-spacing:2px;margin:0 0 10px;"><span leaf="">JOURNAL NOTE</span></p>
  <h2 style="font-size:22px;font-weight:900;color:#ffffff;margin:0;"><span leaf="">{{主标题}}</span></h2>
</section>

2. 章节标题 (H2 - 底部黑线加橙色数字):
<section style="margin-top:48px;margin-bottom:28px;padding:0 10px;border-bottom:2px solid #1E1F23;padding-bottom:12px;">
  <section style="display:flex;align-items:center;gap:10px;">
    <span style="background:#ED7B2F;color:#ffffff;font-size:12px;font-weight:800;padding:2px 8px;border-radius:4px;"><span leaf="">01</span></span>
    <h3 style="font-size:18px;font-weight:800;color:#1E1F23;margin:0;"><span leaf="">{{章节标题}}</span></h3>
  </section>
</section>

3. 引用块 (Blockquote - 橙色左竖条):
<section style="background:#F8F9FA;border-left:4px solid #ED7B2F;padding:16px 20px;margin-bottom:24px;">
  <p style="font-size:14px;color:#2B2C30;margin:0;line-height:1.75;"><span leaf="">{{手记引用}}</span></p>
</section>

4. 提示卡片 (Callout - 顶部粗线):
<section style="background:#F8F9FA;border:1px solid #E5E7EB;border-top:3px solid #1E1F23;padding:14px 18px;margin-bottom:24px;">
  <p style="font-size:13px;color:#2B2C30;margin:0;"><span leaf="">📌 {{关键备注}}</span></p>
</section>
`;
