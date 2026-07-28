/**
 * @file prompts/commonPrompts.ts
 * @description 微信公众号全主题通用排版与结构化组件转换 Prompt 指南
 * (基于 stylemd 规范集纳，包含 8 种结构化表达语法转换规则及 SVG 开场动画能力)
 */

export const COMMON_PROMPTS = `
【全主题通用结构化组件排版规范】：

1. 结构化扩展语法解析与高保真转换：
   - 当遇到 [!NOTE] 提示语法：
     转换为带有该主题主色调左竖条与高亮浅底的提示卡片 <section style="...">...
   - 当遇到 [!WARNING] 警告语法：
     转换为带警告点睛色底框的提醒卡片 <section style="...">...
   - 当遇到 1. [step] 步骤清单语法：
     转换为带该主题专属数字标签（如 01 / 02）的大数字步骤项 <section style="...">...
   - 当遇到 :::flow 流程图语法：
     转换为横向 flex 步骤卡片流 (步骤 A → 步骤 B → 步骤 C)。
   - 当遇到 :::compare 多栏对比语法：
     转换为并列多栏对比卡片。
   - 当遇到 :::timeline 时间线语法：
     转换为带有纵向连接线与时间节点的竖向时间轴卡片。

2. 图文与图片容器 (Image Container):
   - 所有图片 <img> 标签必须被 <section style="margin:24px 0;text-align:center;"> 包裹。
   - 图片下方如果有说明文字，使用 <p style="font-size:12px;color:#888888;margin-top:8px;text-align:center;"><span leaf="">图：说明</span></p>。

3. 代码块与代码高亮 (Codeblock):
   - 代码块使用 <section style="background:#282C34;border-radius:8px;padding:16px;margin:20px 0;overflow-x:auto;color:#ABB2BF;font-family:Consolas,Monaco,monospace;font-size:13px;line-height:1.5;"> 包裹。
   - 代码每一行转换为 <p style="margin:0;white-space:pre;"><span leaf="">代码内容</span></p>。

4. 精致分隔线与装饰 (Horizontal Rule):
   - 单纯线段：<section style="height:1px;background:#E5E7EB;margin:32px 0;"><span leaf=""><br></span></section>
   - END 结束符：<section style="text-align:center;margin:40px 0 20px;"><span style="font-size:12px;color:#9CA3AF;letter-spacing:4px;"><span leaf="">— END —</span></span></section>
`;
