/**
 * @file components/features/Editor.tsx
 * @description 左侧文章编辑器与 6 套预设主题选择器组件
 */

'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Wand2, Type, Bold, Quote, Code, Heading1, Heading2, Loader2 } from 'lucide-react';
import { ThemeId } from '@/domain/formatter/types';
import { GZH_THEMES } from '@/domain/formatter/GZHThemeIndex';

export interface EditorProps {
  content: string;
  onChange: (val: string) => void;
  selectedThemeId: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  onFormat: () => void;
  isFormatting: boolean;
}

export const Editor: React.FC<EditorProps> = ({
  content,
  onChange,
  selectedThemeId,
  onSelectTheme,
  onFormat,
  isFormatting,
}) => {
  const [isThrottled, setIsThrottled] = React.useState<boolean>(false);

  // 节流与锁定处理触发 AI 排版
  const handleFormatClick = () => {
    if (isFormatting || isThrottled || !content.trim()) return;
    setIsThrottled(true);
    onFormat();
    setTimeout(() => setIsThrottled(false), 800);
  };

  // 插入快捷 Markdown/文本 语法标签
  const insertText = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || '示范文字';

    const replacement = `${prefix}${selected}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  const wordCount = content.trim().length;

  return (
    <GlassCard className="flex flex-col h-full p-5 gap-4 shadow-apple-md">
      {/* 顶部工具栏与主题选择 */}
      <div className="flex flex-col gap-3 pb-3 border-b border-gray-200/60 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Type className="w-4 h-4 text-apple-blue" />
            文章编辑区
          </h2>
          <span className="text-xs text-gray-400 font-mono">{wordCount} 字</span>
        </div>

        {/* 6 套主题 Choice Chips */}
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1.5">
            选择公众号排版主题：
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.values(GZH_THEMES).map((theme) => {
              const isSelected = theme.id === selectedThemeId;
              return (
                <button
                  key={theme.id}
                  disabled={isFormatting}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left flex items-center justify-between border ${
                    isSelected
                      ? 'bg-wechat-green text-white border-wechat-green shadow-sm scale-[1.02]'
                      : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-gray-200/70 dark:border-zinc-700 hover:border-wechat-green/50'
                  } ${isFormatting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="truncate">{theme.name}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ml-1.5 ${
                      isSelected ? 'bg-white' : ''
                    }`}
                    style={{ backgroundColor: isSelected ? '#FFFFFF' : theme.primaryColor }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 快捷插入 Formatting Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pt-1">
          <Button variant="ghost" size="sm" onClick={() => insertText('# ')} disabled={isFormatting}>
            <Heading1 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertText('## ')} disabled={isFormatting}>
            <Heading2 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertText('**', '**')} disabled={isFormatting}>
            <Bold className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertText('> ')} disabled={isFormatting}>
            <Quote className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertText('```javascript\n', '\n```')} disabled={isFormatting}>
            <Code className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 文本 TextArea 输入区 */}
      <textarea
        id="markdown-textarea"
        value={content}
        disabled={isFormatting}
        onChange={(e) => onChange(e.target.value)}
        placeholder="在此粘贴或直接书写文章内容..."
        className={`flex-1 w-full bg-transparent resize-none focus:outline-none font-mono text-sm text-zinc-800 dark:text-zinc-200 placeholder-gray-400/80 leading-relaxed min-h-[360px] ${
          isFormatting ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      />

      {/* 底部“AI 自动排版”触发表单（排版处理中锁定防止重复点击） */}
      <div className="pt-3 border-t border-gray-200/60 dark:border-zinc-800">
        <Button
          variant="wechat"
          size="lg"
          className={`w-full font-semibold shadow-apple-md transition-all ${
            isFormatting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          onClick={handleFormatClick}
          disabled={isFormatting || isThrottled || !content.trim()}
        >
          {isFormatting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI 智能排版处理中...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>一键 AI 排版</span>
            </>
          )}
        </Button>
      </div>
    </GlassCard>
  );
};
