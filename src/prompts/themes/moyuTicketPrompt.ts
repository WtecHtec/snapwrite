/**
 * @file prompts/themes/moyuTicketPrompt.ts
 * @description 「摸鱼票据风」主题专属 Prompt 与 HTML 排版规范 (基于 gitmd/theme-moyu-ticket.md)
 */

export const MOYU_TICKET_PROMPT = `
【主题名称】：摸鱼票据风 (moyu-ticket)
【设计风格】：票据 / 门票视觉隐喻，硬阴影卡片、锯齿边框与星级评分。适合测评、工具对比、创意评测。

【设计变量】：
- 主色调：#059669 | 暗黑：#064E3B | 浅绿底：#ECFDF5 | 黄色高亮：#FDE68A
- 硬阴影：3px 3px 0px #064E3B
- 下划线权威 CSS：border-bottom:2px solid #A7F3D0;font-weight:600;

【HTML 组件结构模板】：

1. 封面卡片 (Cover - 硬阴影票据卡):
<section style="margin:0 10px 32px;background:#ECFDF5;border:2px solid #064E3B;border-radius:12px;padding:24px;box-shadow:4px 4px 0px #064E3B;">
  <p style="font-size:11px;font-weight:800;color:#059669;letter-spacing:2px;margin:0 0 8px;"><span leaf="">TICKET /// PASS</span></p>
  <h2 style="font-size:22px;font-weight:900;color:#064E3B;margin:0;"><span leaf="">{{主标题}}</span></h2>
</section>

2. 章节标题 (H2 - 硬阴影黑底药丸):
<section style="margin-top:48px;margin-bottom:28px;padding:0 10px;">
  <section style="display:inline-block;background:#064E3B;color:#ffffff;padding:4px 12px;border-radius:6px;font-size:16px;font-weight:900;box-shadow:2px 2px 0px #059669;">
    <span leaf="">PART 01 · {{章节标题}}</span>
  </section>
</section>

3. 引用块 (Blockquote - 白底硬阴影):
<section style="background:#ffffff;border:2px solid #064E3B;border-radius:8px;padding:16px;margin-bottom:24px;box-shadow:3px 3px 0px #064E3B;">
  <p style="font-size:14px;color:#064E3B;margin:0;font-weight:700;"><span leaf="">{{票据说明}}</span></p>
</section>

4. 提示卡片 (Callout - 黄底硬阴影):
<section style="background:#FDE68A;border:2px solid #064E3B;border-radius:8px;padding:14px 16px;margin-bottom:24px;box-shadow:3px 3px 0px #064E3B;">
  <p style="font-size:13px;color:#064E3B;margin:0;font-weight:800;"><span leaf="">⚡ {{测评亮点}}</span></p>
</section>
`;
