/**
 * @file components/features/Preview.tsx
 * @description 桌面端双栏预览区（使用 html-react-parser 高效解析并渲染微信公众号富文本）
 */

'use client';

import React from 'react';
import parse from 'html-react-parser';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Copy, QrCode, Eye, Sparkles } from 'lucide-react';
import { GZH_THEMES } from '@/domain/formatter/GZHThemeIndex';
import { ThemeId } from '@/domain/formatter/types';

export interface PreviewProps {
  formattedHtml: string;
  selectedThemeId?: ThemeId;
  onCopy: () => void;
  onOpenQRCode: () => void;
  isFormatting?: boolean;
}

export const Preview: React.FC<PreviewProps> = ({
  formattedHtml,
  selectedThemeId = 'moyu-green',
  onCopy,
  onOpenQRCode,
  isFormatting = false,
}) => {
  const currentThemeName = GZH_THEMES[selectedThemeId]?.name || '摸鱼绿';

  return (
    <GlassCard className="flex flex-col h-full p-3.5 gap-3 shadow-apple-md overflow-hidden">
      {/* 预览顶栏与核心动作按钮 */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-200/60 dark:border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-wechat-green" />
            预览
          </h2>

          {/* 当前渲染主题标识 Badge */}
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-wechat-green font-medium">
            当前主题：{currentThemeName}
          </span>
        </div>

        {/* 核心动作按钮 */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onCopy} disabled={isFormatting} title="复制格式化富文本至剪贴板">
            <Copy className="w-3.5 h-3.5" />
            <span>一键复制</span>
          </Button>

          <Button variant="secondary" size="sm" onClick={onOpenQRCode} disabled={isFormatting} title="手机微信扫码即时预览">
            <QrCode className="w-3.5 h-3.5 text-wechat-green" />
            <span>扫码预览</span>
          </Button>
        </div>
      </div>

      {/* 高保真 iPhone 微信模拟框架 (使用 html-react-parser 进行高效解析渲染) */}
      <div className="flex-1 flex justify-center items-center py-1 bg-gray-100/50 dark:bg-zinc-950/50 rounded-xl p-2 min-h-0 overflow-hidden">
        <div className="w-full max-w-[375px] h-full max-h-[100%] bg-white dark:bg-zinc-900 rounded-[30px] shadow-apple-lg border-[6px] border-zinc-800 dark:border-zinc-700 flex flex-col overflow-hidden relative">
          {/* AI 排版进行中：半透明悬浮 Status Badge 动效（完全不遮挡下方实时打字过程） */}
          {isFormatting && (
            <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md shadow-lg border border-wechat-green/60 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 select-none">
              <Sparkles className="w-3.5 h-3.5 text-wechat-green animate-spin" />
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 whitespace-nowrap">
                AI 流式排版生成中...
              </span>
            </div>
          )}

          {/* 微信手机顶部刘海状态栏模拟 */}
          <div className="bg-zinc-900 text-white px-5 py-1 flex justify-between items-center text-[10px] font-mono select-none flex-shrink-0">
            <span>09:41</span>
            <div className="w-14 h-2.5 bg-black rounded-full" />
            <span>5G 100%</span>
          </div>

          {/* 微信公众号文章顶部 Chrome 导航模拟 */}
          <div className="px-3.5 py-2 bg-gray-50 dark:bg-zinc-800/90 border-b border-gray-200/50 dark:border-zinc-700 flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-200 font-medium flex-shrink-0 select-none">
            <span className="truncate max-w-[200px]">公众号预览文章</span>
            <div className="flex items-center gap-1 opacity-70">
              <span>•••</span>
            </div>
          </div>

          {/* 使用 html-react-parser 渲染富文本内容 */}
          <div
            id="gzh-preview-container"
            className="flex-1 p-4 overflow-y-auto bg-white text-zinc-900 min-h-0"
          >
            {formattedHtml ? parse(formattedHtml) : null}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
