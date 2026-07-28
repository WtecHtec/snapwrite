/**
 * @file prompts/themes/index.ts
 * @description 动态读取 stylemd/ 文件夹中 6 套精选排版主题 MD 文件与 SVG 开场动画指南（内存单例缓存机制，零 CPU/IO 浪费）
 */

import fs from 'fs';
import path from 'path';
import { ThemeId } from '@/domain/formatter/types';
import { MOYU_GREEN_PROMPT } from './moyuGreenPrompt';
import { RED_WHITE_PROMPT } from './redWhitePrompt';
import { GRAPHITE_MINIMAL_PROMPT } from './graphiteMinimalPrompt';
import { ZEN_WHITESPACE_PROMPT } from './zenWhitespacePrompt';
import { MOYU_TICKET_PROMPT } from './moyuTicketPrompt';
import { OLIVE_JOURNAL_PROMPT } from './oliveJournalPrompt';

export const THEME_PROMPTS_MAP: Record<ThemeId, string> = {
  'moyu-green': MOYU_GREEN_PROMPT,
  'red-white': RED_WHITE_PROMPT,
  'graphite-minimal': GRAPHITE_MINIMAL_PROMPT,
  'zen-whitespace': ZEN_WHITESPACE_PROMPT,
  'moyu-ticket': MOYU_TICKET_PROMPT,
  'olive-journal': OLIVE_JOURNAL_PROMPT,
};

const THEME_FILE_MAP: Record<ThemeId, string> = {
  'moyu-green': 'theme-moyu-green.md',
  'red-white': 'theme-red-white.md',
  'graphite-minimal': 'theme-graphite-minimal.md',
  'zen-whitespace': 'theme-zen-whitespace.md',
  'moyu-ticket': 'theme-moyu-ticket.md',
  'olive-journal': 'theme-olive-journal.md',
};

// 模块级单例内存缓存（避免反复磁盘同步 IO 读取与 CPU 开销）
const themePromptCache = new Map<string, string>();
let svgGuideCache: string | null = null;

/**
 * 100% 完整读取 stylemd/ 目录下对应的 MD 排版主题文件全量文本（内存优先缓存）
 */
export function getThemePrompt(themeId: ThemeId): string {
  const targetThemeId = THEME_FILE_MAP[themeId] ? themeId : 'moyu-green';

  // 1. 优先从内存缓存中读取（0ms 响应，零 CPU/磁盘开销）
  if (themePromptCache.has(targetThemeId)) {
    return themePromptCache.get(targetThemeId)!;
  }

  // 2. 首次访问从磁盘文件读取，存入内存缓存
  const filename = THEME_FILE_MAP[targetThemeId];
  try {
    const filePath = path.join(process.cwd(), 'stylemd', filename);
    if (fs.existsSync(filePath)) {
      const fullMdContent = fs.readFileSync(filePath, 'utf-8');
      if (fullMdContent && fullMdContent.trim()) {
        themePromptCache.set(targetThemeId, fullMdContent);
        return fullMdContent;
      }
    }
  } catch (err) {
    console.warn(`[Prompt Engine] 动态读取 stylemd/${filename} 告警，使用兜底 Prompt:`, err);
  }

  const fallback = THEME_PROMPTS_MAP[targetThemeId] || THEME_PROMPTS_MAP['moyu-green'];
  themePromptCache.set(targetThemeId, fallback);
  return fallback;
}

/**
 * 动态读取 stylemd/theme-svg-cover-animation.md (首屏 SVG SMIL 动效指南，内存单例缓存)
 */
export function getSvgCoverAnimationGuide(): string {
  // 1. 优先读取内存缓存
  if (svgGuideCache) {
    return svgGuideCache;
  }

  // 2. 首次读取从磁盘提取，存入缓存
  try {
    const filePath = path.join(process.cwd(), 'stylemd', 'theme-svg-cover-animation.md');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content && content.trim()) {
        svgGuideCache = content;
        return content;
      }
    }
  } catch (err) {
    console.warn(`[Prompt Engine] 动态读取 stylemd/theme-svg-cover-animation.md 告警`, err);
  }

  const fallback = `
【首屏 SVG 开场动画指南】：
提供 ink-wash(墨韵开篇)、typewriter(打字机)、scroll-painting(画卷展开)、spotlight(聚焦聚光灯)、minimal-sketch(极简白描) 5 种首屏 SVG 动画。
使用 viewBox="0 0 640 400" 并在内部包含 <rect fill="当前主题背景色"/> 铺满。
必须使用 <tspan leaf=""> 包裹文字，并使用 <rect> + attributeName="width" 替代 <line> 进行线条绘制。
`;

  svgGuideCache = fallback;
  return fallback;
}
