/**
 * @file domain/formatter/GZHThemeIndex.ts
 * @description 6 套微信公众号经典预设主题索引与样式定义（权威单一数据源）
 */

import { GZHTheme, ThemeId } from './types';

// 注册的主题清单
export const GZH_THEMES: Record<ThemeId, GZHTheme> = {
  'moyu-green': {
    id: 'moyu-green',
    name: '摸鱼绿',
    primaryColor: '#059669',
    accentColor: '#A7F3D0',
    bgColor: '#F0FDF4',
    textColor: '#1F2937',
    titleColor: '#065F46',
    description: '教程、测评、清单、工具盘点（卡片丰富、信息密度高，默认推荐）',
    underlineCss: 'border-bottom:2px solid #A7F3D0;font-weight:600;',
  },
  'red-white': {
    id: 'red-white',
    name: '红白色系',
    primaryColor: '#DC2626',
    accentColor: '#FECACA',
    bgColor: '#FEF2F2',
    textColor: '#1F2937',
    titleColor: '#991B1B',
    description: '深度分析、观点、力量感话题（经典编辑风，红色克制点睛）',
    underlineCss: 'border-bottom:2px solid #FECACA;font-weight:600;',
  },
  'graphite-minimal': {
    id: 'graphite-minimal',
    name: '石墨极简风',
    primaryColor: '#52525B',
    accentColor: '#E4E4E7',
    bgColor: '#F4F4F5',
    textColor: '#27272A',
    titleColor: '#18181B',
    description: '设计、科技评论、专业观点、高端品牌（极简克制、留白理性）',
    underlineCss: 'border-bottom:2px solid #52525B;font-weight:600;',
  },
  'zen-whitespace': {
    id: 'zen-whitespace',
    name: '留白禅意风',
    primaryColor: '#4A5D52',
    accentColor: '#B5C8BC',
    bgColor: '#F5F7F6',
    textColor: '#2D3732',
    titleColor: '#36453D',
    description: '禅意冥想、极简生活、深度随笔、艺术留白（呼吸感最强）',
    underlineCss: 'border-bottom:1.5px solid #B5C8BC;font-weight:500;',
  },
  'moyu-ticket': {
    id: 'moyu-ticket',
    name: '摸鱼票据风',
    primaryColor: '#059669',
    accentColor: '#10B981',
    bgColor: '#ECFDF5',
    textColor: '#064E3B',
    titleColor: '#047857',
    description: '测评、工具对比、创意评测（票据/门票视觉隐喻，硬阴影卡片）',
    underlineCss: 'border-bottom:2px solid #A7F3D0;font-weight:600;',
  },
  'olive-journal': {
    id: 'olive-journal',
    name: '橄榄手记',
    primaryColor: '#1E1F23',
    accentColor: '#ED7B2F',
    bgColor: '#F8F9FA',
    textColor: '#2B2C30',
    titleColor: '#111215',
    description: '内刊手记、深度评测、案例复盘、系统性说明文档（编辑部质感）',
    underlineCss: 'border-bottom:2px solid #ED7B2F;font-weight:600;',
  },
};

// 获取主题规则
export function getTheme(id: ThemeId): GZHTheme {
  return GZH_THEMES[id] || GZH_THEMES['moyu-green'];
}
