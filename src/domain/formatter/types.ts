/**
 * @file domain/formatter/types.ts
 * @description 微信公众号排版引擎核心类型定义
 */

// 主题标识定义 (6 套经典预设主题)
export type ThemeId =
  | 'moyu-green'
  | 'red-white'
  | 'graphite-minimal'
  | 'zen-whitespace'
  | 'moyu-ticket'
  | 'olive-journal';

// 主题数据结构
export interface GZHTheme {
  id: ThemeId;
  name: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  titleColor: string;
  description: string;
  underlineCss: string;
}

// 文章类型枚举（用于推荐匹配）
export type ArticleType =
  | 'tutorial'    // 教程 / 操作指南
  | 'inventory'   // 盘点 / 工具清单
  | 'opinion'     // 观点 / 深度分析
  | 'interview'   // 访谈 / 人物特稿
  | 'data'        // 数据复盘 / 报告
  | 'essay';      // 随笔 / 生活

// Markdown 语法元素解析结果
export interface ParsedElement {
  type: 'h1' | 'h2' | 'h3' | 'paragraph' | 'blockquote' | 'codeblock' | 'image' | 'hr';
  content: string;
  raw: string;
  language?: string;
  alt?: string;
}
