/**
 * @file prompts/themes/svgCoverAnimationPrompt.ts
 * @description 「SVG 动效风」主题专属 Prompt (基于 gitmd/theme-svg-cover-animation.md)
 */

export const SVG_COVER_ANIMATION_PROMPT = `
【主题名称】：SVG 动效风 (svg-cover-animation)
【设计风格】：首屏 SMIL 动态开场 SVG 动画（墨韵晕染 + 标签浮现 + 标题上浮 + 划线展开 + 循环向下引导箭头）+ 7 层节奏视效。正文吸收摸鱼绿与橄榄手记的大数字标题与精致卡片表达。暖纸感 #F5F4ED、暖陶行动色 #B85235、墨蓝结构色 #1B365D。

【设计变量】：
- 暖陶主色：#B85235 (行动/点睛)
- 墨蓝结构：#1B365D (标签/标题)
- 信任蓝背景：#EEF2F7 (引用)
- 纸感背景：#F5F4ED | 文本近黑：#141413 | 图注石灰：#6B6A64
- 下划线 CSS：border-bottom:2px solid #B85235;font-weight:600;color:#B85235;

【HTML 组件结构模板】：

1. 封面卡片 (Cover - 首屏动态 SVG SMIL 墨韵开篇):
<section style="margin:0 0 32px;padding:0;line-height:0;max-width:640px;margin-left:auto;margin-right:auto;">
  <svg viewBox="0 0 640 400" width="100%" height="auto" style="display:block;background:#F5F4ED;border-radius:12px;overflow:hidden;">
    <rect width="640" height="400" fill="#F5F4ED"/>
    <!-- 0.2s 墨点晕染 -->
    <circle cx="320" cy="200" r="0" fill="#B85235" opacity="0.12">
      <animate attributeName="r" values="0;280" dur="1.2s" begin="0.2s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.22 1 0.36 1"/>
      <animate attributeName="opacity" values="0.12;0.04" dur="1.2s" begin="0.2s" fill="freeze"/>
    </circle>
    <!-- 0.8s 品牌标签 -->
    <text x="320" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="#B85235" letter-spacing="3" opacity="0">
      <tspan leaf="">SPECIAL EDITORIAL</tspan>
      <animate attributeName="opacity" values="0;1" dur="0.6s" begin="0.8s" fill="freeze"/>
    </text>
    <!-- 1.2s 主标题 -->
    <g opacity="0">
      <text x="320" y="160" text-anchor="middle" font-size="28" font-weight="900" fill="#141413" letter-spacing="1">
        <tspan leaf="">{{主标题}}</tspan>
      </text>
      <animateTransform attributeName="transform" type="translate" values="0 20;0 0" dur="0.8s" begin="1.2s" fill="freeze"/>
      <animate attributeName="opacity" values="0;1" dur="0.8s" begin="1.2s" fill="freeze"/>
    </g>
    <!-- 1.9s 分隔线 (rect + width 防止微信剥离 animate) -->
    <rect x="220" y="190" width="0" height="2.5" rx="1.25" fill="#B85235" opacity="0">
      <animate attributeName="width" values="0;200" dur="0.6s" begin="1.9s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.22 1 0.36 1"/>
      <animate attributeName="opacity" values="0;1" dur="0.1s" begin="1.9s" fill="freeze"/>
    </rect>
    <!-- 2.4s 副标题 -->
    <text x="320" y="240" text-anchor="middle" font-size="15" fill="#6B6A64" letter-spacing="1" opacity="0">
      <tspan leaf="">{{副标题/精彩导读}}</tspan>
      <animate attributeName="opacity" values="0;1" dur="0.8s" begin="2.4s" fill="freeze"/>
    </text>
    <!-- 3.6s 引导下滑动无限循环箭头 -->
    <g opacity="0">
      <text x="320" y="340" text-anchor="middle" font-size="11" fill="#B85235" letter-spacing="2">
        <tspan leaf="">向下滑动阅读</tspan>
      </text>
      <polygon points="315,350 325,350 320,358" fill="#B85235">
        <animateTransform attributeName="transform" type="translate" values="0 0;0 6;0 0" dur="1.5s" repeatCount="indefinite"/>
      </polygon>
      <animate attributeName="opacity" values="0;1" dur="0.8s" begin="3.6s" fill="freeze"/>
    </g>
  </svg>
</section>

2. 章节标题 (H2 - 摸鱼绿大数字风格):
<section style="margin-top:48px;margin-bottom:32px;padding:0 10px;">
  <section style="display:flex;align-items:center;gap:16px;margin-bottom:24px;">
    <section style="text-align:center;flex-shrink:0;">
      <p style="margin:0;font-size:28px;font-weight:900;color:#B85235;line-height:1;"><span leaf="">01</span></p>
      <p style="margin:0;font-size:8px;font-weight:700;color:#1B365D;letter-spacing:2px;"><span leaf="">PART</span></p>
    </section>
    <span style="width:1px;height:36px;background:#E5E7EB;flex-shrink:0;"><span leaf=""><br></span></span>
    <h2 style="margin:0;font-size:18px;font-weight:900;color:#141413;"><span leaf="">{{章节标题}}</span></h2>
  </section>
</section>

3. 引用块 (Blockquote - 信任蓝卡片):
<section style="background:#EEF2F7;border-left:4px solid #1B365D;padding:18px 22px;margin-bottom:24px;border-radius:0 8px 8px 0;">
  <p style="font-size:15px;color:#1B365D;margin:0;line-height:1.75;font-weight:600;"><span leaf="">「{{核心观点/金句摘录}}」</span></p>
</section>

4. 提示卡片 (Callout - 暖陶提示框):
<section style="background:#FAF9F5;border:1px solid #B85235;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
  <p style="font-size:14px;color:#B85235;margin:0;font-weight:700;"><span leaf="">📌 {{关键提示}}</span></p>
</section>
`;
