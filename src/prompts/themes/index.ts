/**
 * @file prompts/themes/index.ts
 * @description 使用 Next.js Webpack Native Asset Modules (asset/source) 静态打包 stylemd/ 排版主题全量 Markdown
 * 彻底摆脱 runtime fs 磁盘读取限制，100% 保证在 Vercel Serverless 环境下高保真内联打入 JS 内存中！
 */

import { ThemeId } from '@/domain/formatter/types';

// 静态打入 JS 内存中，构建期自动注入（0ms 响应，零 fs 依赖）
import moyuGreenMd from '../../../stylemd/theme-moyu-green.md';
import redWhiteMd from '../../../stylemd/theme-red-white.md';
import graphiteMinimalMd from '../../../stylemd/theme-graphite-minimal.md';
import zenWhitespaceMd from '../../../stylemd/theme-zen-whitespace.md';
import moyuTicketMd from '../../../stylemd/theme-moyu-ticket.md';
import oliveJournalMd from '../../../stylemd/theme-olive-journal.md';
import svgCoverAnimationMd from '../../../stylemd/theme-svg-cover-animation.md';

import { MOYU_GREEN_PROMPT } from './moyuGreenPrompt';
import { RED_WHITE_PROMPT } from './redWhitePrompt';
import { GRAPHITE_MINIMAL_PROMPT } from './graphiteMinimalPrompt';
import { ZEN_WHITESPACE_PROMPT } from './zenWhitespacePrompt';
import { MOYU_TICKET_PROMPT } from './moyuTicketPrompt';
import { OLIVE_JOURNAL_PROMPT } from './oliveJournalPrompt';

const STATIC_THEME_FILES: Record<ThemeId, string> = {
  'moyu-green': moyuGreenMd,
  'red-white': redWhiteMd,
  'graphite-minimal': graphiteMinimalMd,
  'zen-whitespace': zenWhitespaceMd,
  'moyu-ticket': moyuTicketMd,
  'olive-journal': oliveJournalMd,
};

export const THEME_PROMPTS_MAP: Record<ThemeId, string> = {
  'moyu-green': MOYU_GREEN_PROMPT,
  'red-white': RED_WHITE_PROMPT,
  'graphite-minimal': GRAPHITE_MINIMAL_PROMPT,
  'zen-whitespace': ZEN_WHITESPACE_PROMPT,
  'moyu-ticket': MOYU_TICKET_PROMPT,
  'olive-journal': OLIVE_JOURNAL_PROMPT,
};

/**
 * 获取 100% 静态打入内存中的 Style MD 排版主题 Prompt
 */
export function getThemePrompt(themeId: ThemeId): string {
  const content = STATIC_THEME_FILES[themeId] || STATIC_THEME_FILES['moyu-green'];
  if (content && typeof content === 'string' && content.trim()) {
    return content;
  }
  return THEME_PROMPTS_MAP[themeId] || THEME_PROMPTS_MAP['moyu-green'];
}

/**
 * 获取 100% 静态打入内存中的首屏 SVG SMIL 动效指南
 */
export function getSvgCoverAnimationGuide(): string {
  if (svgCoverAnimationMd && typeof svgCoverAnimationMd === 'string' && svgCoverAnimationMd.trim()) {
    return svgCoverAnimationMd;
  }

  return `
【首屏 SVG 开场动画指南】：
提供 ink-wash(墨韵开篇)、typewriter(打字机)、scroll-painting(画卷展开)、spotlight(聚焦聚光灯)、minimal-sketch(极简白描) 5 种首屏 SVG 动画。
使用 viewBox="0 0 640 400" 并在内部包含 <rect fill="当前主题背景色"/> 铺满。
必须使用 <tspan leaf=""> 包裹文字，并使用 <rect> + attributeName="width" 替代 <line> 进行线条绘制。
`;
}
