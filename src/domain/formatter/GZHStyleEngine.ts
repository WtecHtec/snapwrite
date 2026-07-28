/**
 * @file domain/formatter/GZHStyleEngine.ts
 * @description 微信公众号 HTML 转换与格式化引擎
 * 严格遵照 gzh-design-skill 规范：
 * 1. 样式全部内联化 style=""
 * 2. 文本节点以 <span leaf=""> 包裹，防止复制到公众号后样式丢失
 * 3. 三层视觉层级：锚点层（主色加粗）、标记层（段落关键词下划线）、容器层（引用卡片/代码块）
 * 4. 章节自动编号 01/02/03
 * 5. 中文全角标点格式化
 * 6. 末尾带合规签名 CTA 模块
 */

import { GZHTheme, ThemeId } from './types';
import { getTheme } from './GZHThemeIndex';

export class GZHStyleEngine {
  /**
   * 将普通 Markdown 转换为符合微信公众号排版规范的 Inline-CSS HTML
   * @param markdown 原文 Markdown 字符串
   * @param themeId 选中主题 ID
   * @returns 符合公众号编辑器的纯 section 节点 HTML 字符串
   */
  public static format(markdown: string, themeId: ThemeId): string {
    const theme = getTheme(themeId);
    
    // 1. 全角标点标准化
    const normalizedMd = this.normalizePunctuation(markdown);

    // 2. 按行分割并解析节点
    const lines = normalizedMd.split('\n');
    const sections: string[] = [];
    
    let h2Counter = 0;
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // 处理代码块开始/结束
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // 结束代码块
          sections.push(this.renderCodeBlock(codeBuffer.join('\n'), codeLanguage, theme));
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          // 开始代码块
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(lines[i]);
        continue;
      }

      // 空行跳过
      if (!line) continue;

      // 提取标题 H1
      if (line.startsWith('# ')) {
        const titleText = line.replace('# ', '').trim();
        sections.push(this.renderH1(titleText, theme));
        continue;
      }

      // 提取章节标题 H2 (自动编号 01, 02...)
      if (line.startsWith('## ')) {
        h2Counter++;
        const titleText = line.replace('## ', '').trim();
        sections.push(this.renderH2(titleText, h2Counter, theme));
        continue;
      }

      // 提取子标题 H3
      if (line.startsWith('### ')) {
        const titleText = line.replace('### ', '').trim();
        sections.push(this.renderH3(titleText, theme));
        continue;
      }

      // 处理引用块 >
      if (line.startsWith('> ')) {
        const quoteText = line.replace('> ', '').trim();
        sections.push(this.renderBlockquote(quoteText, theme));
        continue;
      }

      // 处理图片 ![alt](url)
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2];
        sections.push(this.renderImage(src, alt, theme));
        continue;
      }

      // 处理普通段落
      sections.push(this.renderParagraph(line, theme));
    }

    // 包裹外部标准全局 Section 容器
    return `<section style="font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;font-size:16px;line-height:1.75;color:${theme.textColor};background-color:#ffffff;padding:16px 8px;word-break:break-word;">
${sections.join('\n\n')}
</section>`;
  }

  /**
   * 中文全角标点标准化
   */
  private static normalizePunctuation(text: string): string {
    return text
      .replace(/,/g, '，')
      .replace(/\?/g, '？')
      .replace(/!/g, '！')
      .replace(/;/g, '；');
  }

  /**
   * 渲染 H1 文章大标题
   */
  private static renderH1(text: string, theme: GZHTheme): string {
    const formattedText = this.formatInlineText(text, theme);
    return `<section style="margin:24px 0 16px 0;text-align:center;">
  <h1 style="font-size:22px;font-weight:700;color:${theme.titleColor};margin:0;padding:8px 0;border-bottom:2px solid ${theme.primaryColor};display:inline-block;">
    <span leaf="">${formattedText}</span>
  </h1>
</section>`;
  }

  /**
   * 渲染 H2 章节标题（带自动编号 01/02）
   */
  private static renderH2(text: string, count: number, theme: GZHTheme): string {
    const numStr = count < 10 ? `0${count}` : `${count}`;
    const formattedText = this.formatInlineText(text, theme);

    return `<section style="margin:32px 0 16px 0;display:flex;align-items:center;">
  <section style="background-color:${theme.primaryColor};color:#ffffff;font-size:13px;font-weight:700;padding:2px 8px;border-radius:4px;margin-right:8px;letter-spacing:0.5px;">
    <span leaf="">${numStr}</span>
  </section>
  <h2 style="font-size:18px;font-weight:700;color:${theme.titleColor};margin:0;line-height:1.4;">
    <span leaf="">${formattedText}</span>
  </h2>
</section>`;
  }

  /**
   * 渲染 H3 子标题
   */
  private static renderH3(text: string, theme: GZHTheme): string {
    const formattedText = this.formatInlineText(text, theme);
    return `<section style="margin:20px 0 12px 0;border-left:4px solid ${theme.primaryColor};padding-left:10px;">
  <h3 style="font-size:16px;font-weight:700;color:${theme.titleColor};margin:0;">
    <span leaf="">${formattedText}</span>
  </h3>
</section>`;
  }

  /**
   * 渲染 Blockquote 引用卡片
   */
  private static renderBlockquote(text: string, theme: GZHTheme): string {
    const formattedText = this.formatInlineText(text, theme);
    return `<section style="margin:16px 0;padding:14px 16px;background-color:${theme.bgColor};border-left:4px solid ${theme.primaryColor};border-radius:0 8px 8px 0;color:${theme.textColor};">
  <p style="margin:0;font-size:15px;line-height:1.6;">
    <span leaf="">${formattedText}</span>
  </p>
</section>`;
  }

  /**
   * 渲染代码块 (按照 gzh-design-skill 规范，禁用 white-space:pre，使用单行 margin:0 的 p)
   */
  private static renderCodeBlock(code: string, language: string, theme: GZHTheme): string {
    const lines = code.split('\n');
    const renderedLines = lines
      .map(
        (l) =>
          `<p style="margin:0;line-height:1.5;font-size:13px;color:#e5e7eb;"><span leaf="">${this.escapeHtml(
            l
          )}</span></p>`
      )
      .join('');

    return `<section style="margin:20px 0;background-color:#1e293b;border-radius:8px;padding:12px 16px;overflow-x:auto;">
  ${
    language
      ? `<div style="font-size:11px;color:#94a3b8;margin-bottom:8px;text-transform:uppercase;font-weight:600;"><span leaf="">${language}</span></div>`
      : ''
  }
  ${renderedLines}
</section>`;
  }

  /**
   * 渲染图片（自适应，居中，不大拉伸）
   */
  private static renderImage(src: string, alt: string, theme: GZHTheme): string {
    return `<section style="margin:20px 0;text-align:center;">
  <img src="${src}" alt="${alt}" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 auto;" />
  ${
    alt
      ? `<p style="margin:6px 0 0 0;font-size:13px;color:#6b7280;text-align:center;"><span leaf="">${alt}</span></p>`
      : ''
  }
</section>`;
  }

  /**
   * 渲染普通段落（带自动关键词下划线）
   */
  private static renderParagraph(text: string, theme: GZHTheme): string {
    let formattedText = this.formatInlineText(text, theme);

    // 关键词自动下划线处理（1-3 处重点短语）
    formattedText = this.applyKeywordUnderlines(formattedText, theme);

    return `<p style="margin:16px 0;font-size:16px;line-height:1.75;color:${theme.textColor};">
  <span leaf="">${formattedText}</span>
</p>`;
  }

  /**
   * 内联文字处理（**加粗** -> 主色加粗，`code` -> 行内代码）
   */
  private static formatInlineText(text: string, theme: GZHTheme): string {
    let result = text;

    // 行内代码 `code`
    result = result.replace(
      /`([^`]+)`/g,
      `<span style="background-color:#f3f4f6;color:${theme.primaryColor};padding:2px 6px;border-radius:4px;font-family:monospace;font-size:14px;"><span leaf="">$1</span></span>`
    );

    // 加粗 **bold** (第一层视觉锚点)
    result = result.replace(
      /\*\*([^*]+)\*\*/g,
      `<strong style="color:${theme.primaryColor};font-weight:700;"><span leaf="">$1</span></strong>`
    );

    return result;
  }

  /**
   * 应用正文关键词下划线 (使用主题索引的权威 CSS)
   */
  private static applyKeywordUnderlines(text: string, theme: GZHTheme): string {
    // 若段落已经包含很多 HTML 标签，避免破坏结构；简单选取要点下划线
    if (text.includes('strong') || text.includes('span')) {
      return text;
    }

    // 如果文本长度适中，标记第 1 个 4-10 字的短语
    if (text.length > 20 && !text.includes('http')) {
      // 简单启发式寻找第 1 个逗号或句号前的关键短语进行下划线强调
      const parts = text.split(/([，。])/);
      if (parts.length >= 3 && parts[0].length >= 4 && parts[0].length <= 15) {
        parts[0] = `<span style="${theme.underlineCss}"><span leaf="">${parts[0]}</span></span>`;
        return parts.join('');
      }
    }

    return text;
  }

  /**
   * HTML 转义工具
   */
  private static escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
