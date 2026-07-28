/**
 * @file components/features/Header.tsx
 * @description 顶部毛玻璃导航栏组件（包含明暗黑主题切换、Landing与工作区切换、设置入口）
 */

'use client';

import React from 'react';
import { Settings, Sparkles, Cpu, Sun, Moon, Layout, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface HeaderProps {
  mode: 'official' | 'custom';
  customModelName?: string;
  onOpenSettings: () => void;
  isFormatting?: boolean;
  themeMode: 'light' | 'dark';
  onToggleTheme: () => void;
  currentView?: 'landing' | 'editor';
  onSwitchView?: (view: 'landing' | 'editor') => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  customModelName,
  onOpenSettings,
  isFormatting = false,
  themeMode,
  onToggleTheme,
  currentView = 'editor',
  onSwitchView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-zinc-950/70 backdrop-blur-apple border-b border-gray-200/60 dark:border-zinc-800/80 px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* SnapWrite Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSwitchView?.('landing')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-wechat-green to-emerald-400 flex items-center justify-center shadow-apple-sm p-1.5">
            <img src="/vite.svg" alt="SnapWrite Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-none flex items-center gap-2">
              SnapWrite
            </h1>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
              公众号 AI 排版 & 扫码预览 & 自定义 LLM
            </p>
          </div>
        </div>

        {/* 视图切换与功能指示器 */}
        <div className="flex items-center gap-2">
          {/* Landing / Editor 视图切换 */}
          {onSwitchView && (
            <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-zinc-800/80 border border-gray-200/50 dark:border-zinc-700/50 mr-1">
              <button
                onClick={() => onSwitchView('landing')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  currentView === 'landing'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm font-semibold'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>产品首页</span>
              </button>
              <button
                onClick={() => onSwitchView('editor')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  currentView === 'editor'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm font-semibold'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>排版工作区</span>
              </button>
            </div>
          )}

          {/* 当前 active 模型 Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-zinc-800/80 border border-gray-200/50 dark:border-zinc-700/50 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-wechat-green" />
            <span>
              {mode === 'official'
                ? '官方推荐模型'
                : `自定义模型: ${customModelName || '未知'}`}
            </span>
          </div>

          {/* 明亮 / 暗黑主题切换按钮 */}
          <Button variant="ghost" size="sm" onClick={onToggleTheme} title="切换明亮/暗黑主题模式">
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-600" />
            )}
          </Button>

          {/* 设置入口 */}
          <Button variant="glass" size="sm" onClick={onOpenSettings} disabled={isFormatting}>
            <Settings className={`w-4 h-4 text-zinc-600 dark:text-zinc-300 ${isFormatting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isFormatting ? '排版中...' : '自定义 LLM'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
