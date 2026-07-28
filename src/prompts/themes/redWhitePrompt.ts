/**
 * @file prompts/themes/redWhitePrompt.ts
 * @description 「红白色系」主题专属 Prompt 与 HTML 排版规范 (基于 gitmd/theme-red-white.md)
 */

export const RED_WHITE_PROMPT = `
【主题名称】：红白色系 (red-white)
【设计风格】：经典编辑风，红白干净 + 克制点睛。淡粉下划线为主标记、左竖条块引用、红色仅在锚点处出现。适合观点、深度分析、力量感话题。

【设计变量】：
- 主色调：#DC2626 (正红)
- 暗红/酒红：#991B1B
- 淡粉下划线：#FECACA
- 标题色：#1C1917 | 正文色：#374151
- 下划线权威 CSS：border-bottom:2px solid #FECACA;font-weight:600;

【HTML 组件结构模板】：

1. 封面卡片 (Cover - 白底红色阴影光晕引言卡):
<section style="margin:10px 10px 32px;background:#ffffff;border-radius:12px;box-shadow:0 4px 24px -4px rgba(220,38,38,0.15);padding:28px 24px 22px;overflow:hidden;">
  <p style="font-size:42px;color:#DC2626;font-weight:900;margin:0;line-height:0.6;"><span leaf="">"</span></p>
  <p style="font-size:16px;font-weight:800;color:#1C1917;margin:12px 0 8px;line-height:1.75;padding-left:4px;"><span leaf="">{{金句}}</span></p>
</section>

2. 章节标题 (H2):
<section style="margin-top:48px;margin-bottom:28px;padding:0 10px;">
  <section style="display:flex;align-items:center;margin-bottom:20px;padding-bottom:14px;border-bottom:3px solid #DC2626;">
    <span style="display:inline-block;background:#DC2626;color:#FFFFFF;font-size:18px;font-weight:900;padding:4px 14px;border-radius:6px;margin-right:14px;"><span leaf="">01</span></span>
    <h3 style="font-size:18px;font-weight:800;color:#1C1917;margin:0;"><span leaf="">{{章节标题}}</span></h3>
  </section>
</section>

3. 引用块 (Blockquote - 粉底左竖条):
<section style="background:#FEF2F2;border-radius:0 10px 10px 0;border-left:4px solid #DC2626;padding:18px 22px;margin-bottom:24px;">
  <p style="font-size:16px;font-weight:800;color:#991B1B;margin:0;line-height:1.8;"><span leaf="">「{{核心观点或关键金句}}」</span></p>
</section>

4. 提示卡片 (Callout):
<section style="background:#FEF2F2;border-left:4px solid #DC2626;border-radius:0 8px 8px 0;padding:14px 20px;margin-bottom:24px;">
  <p style="font-size:14px;font-weight:700;color:#991B1B;margin:0;"><span leaf="">💡 {{重要提示或核心结论}}</span></p>
</section>
`;
