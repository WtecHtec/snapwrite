/**
 * @file app/page.tsx
 * @description SnapWrite 主应用页面组件
 * 集成 Landing Page、SSE 流式 AI 排版、rAF 打字机平滑渲染、一键复制打赏引导弹窗与 Clean Architecture
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/features/Header';
import { Editor } from '@/components/features/Editor';
import { Preview } from '@/components/features/Preview';
import { QRCodeModal } from '@/components/features/QRCodeModal';
import { RewardModal } from '@/components/features/RewardModal';
import { LLMConfigModal } from '@/components/features/LLMConfigModal';
import { LandingPage } from '@/components/features/LandingPage';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';

import { GZHStyleEngine } from '@/domain/formatter/GZHStyleEngine';
import { ThemeId } from '@/domain/formatter/types';
import { LLMConfig, LLMMode } from '@/domain/llm/types';
import { LLMService } from '@/services/llm/LLMService';
import { LocalStorageService } from '@/services/storage/LocalStorageService';
import { PreviewSyncService } from '@/services/sync/PreviewSyncService';
import { ClipboardUtil } from '@/utils/clipboard';

// 初始默认演示文案
const DEFAULT_MARKDOWN = `# 拥抱 AI 排版新纪元：SnapWrite 正式上线

> "当我们将视觉设计与物理流体理念对齐，排版便不再是一项繁重的劳动，而是一种悦目的创作。"

SnapWrite 是一款专为微信公众号创作者打造的高品质 AI 图文排版引擎。通过内置 6 套经典视觉主题与 Apple 流体交互设计，帮助你一键转换精彩文章。

## 01. 为什么你需要 SnapWrite？

在过去，公众号编辑常常面临三大痛点：

1. **所见非所得**：桌面端排版满意后，在手机微信中字体与缩进往往产生偏差。
2. **复制粘贴丢失样式**：富文本格式在粘贴到微信编辑器时频繁错乱。
3. **繁琐的手动操作**：排版完成后仍需打开公众号后台逐一核对。

\`\`\`typescript
// SnapWrite 纯代码整洁架构设计
interface SnapWriteEngine {
  formatMarkdown(content: string, theme: ThemeId): FormattedHTML;
  syncToMobile(syncId: string): void;
}
\`\`\`

## 02. V1.1 核心新增能力

- **手机扫码实时预览**：实时生成高保真预览二维码，用微信扫码随时验证真实阅读效果。
- **一键高保真复制**：直接复制富文本粘贴至微信公众号后台，零样式缺失。
- **自定义 LLM 模型配置**：支持用户自带 API Key，完全存储在浏览器本地 localStorage，保护隐私安全。

## 03. 三层视觉排版层级

为了让读者在阅读长文时获得最佳视觉聚焦，SnapWrite 自动构建了 **锚点层**、**标记层** 与 **容器层**：

- **锚点层**：使用主色调加粗，凸显关键金句与核心结论。
- **标记层**：自动识别正文短语下划线，提升长段落可读性。
- **容器层**：提供毛玻璃高质感卡片与精致引用。

> 提示：更多功能现已全面开放，快来体验极速 AI 排版吧！`;

export default function HomePage() {
  // 当前视图状态：'landing' | 'editor'
  const [currentView, setCurrentView] = useState<'landing' | 'editor'>('landing');

  // 基础排版状态定义
  const [content, setContent] = useState<string>(DEFAULT_MARKDOWN);
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>('moyu-green');
  const [renderedThemeId, setRenderedThemeId] = useState<ThemeId>('moyu-green');
  const [formattedHtml, setFormattedHtml] = useState<string>('');
  const [isFormatting, setIsFormatting] = useState<boolean>(false);

  // LLM 运行模式
  const [llmMode, setLlmMode] = useState<LLMMode>('official');
  const [customConfig, setCustomConfig] = useState<LLMConfig | null>(null);

  // 预览同步 ID
  const [syncId, setSyncId] = useState<string>('');

  // 弹窗状态
  const [isQRCodeOpen, setIsQRCodeOpen] = useState<boolean>(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Toast 通知队列
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // rAF 打字机渲染控制 Ref
  const targetBufferRef = useRef<string>('');
  const currentRenderedLengthRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const isStreamActiveRef = useRef<boolean>(false);
  const lastFormatTimeRef = useRef<number>(0);

  // 消息提示函数
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 明亮 / 暗黑主题状态管理
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // 初始化加载配置、主题与排版
  useEffect(() => {
    const newSyncId = PreviewSyncService.generateSyncId();
    setSyncId(newSyncId);

    const savedConfig = LocalStorageService.getLLMConfig();
    if (savedConfig && savedConfig.apiKey) {
      setCustomConfig(savedConfig);
      setLlmMode('custom');
    }

    // 初始化读取本地主题模式
    const savedTheme = localStorage.getItem('snapwrite_ui_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setThemeMode('dark');
      document.documentElement.classList.add('dark');
    } else {
      setThemeMode('light');
      document.documentElement.classList.remove('dark');
    }

    // 默认通过本地规则引擎初始化渲染静态 HTML 预览
    const initialHtml = GZHStyleEngine.format(DEFAULT_MARKDOWN, 'moyu-green');
    setFormattedHtml(initialHtml);
    PreviewSyncService.publishUpdate(newSyncId, initialHtml, DEFAULT_MARKDOWN);

    // 网页关闭/卸载时及时回收释放服务端 previewStore 数据
    const handleUnload = () => {
      PreviewSyncService.clearPreview(newSyncId);
    };
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
      PreviewSyncService.clearPreview(newSyncId);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // 切换明暗黑主题类
  const handleToggleTheme = () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextMode);

    if (typeof document !== 'undefined') {
      if (nextMode === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('snapwrite_ui_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('snapwrite_ui_theme', 'light');
      }
    }
  };

  /**
   * 使用 rAF (requestAnimationFrame) 驱动的平滑打字机动画循环
   */
  const startRafLoop = (currentSyncId: string) => {
    const step = () => {
      const target = targetBufferRef.current;
      const currentLen = currentRenderedLengthRef.current;

      if (currentLen < target.length) {
        const nextLen = Math.min(currentLen + 4, target.length);
        const slicedHtml = target.slice(0, nextLen);

        currentRenderedLengthRef.current = nextLen;
        const cleanedHtml = slicedHtml
          .replace(/^```(?:html|xml)?\s*/gi, '')
          .replace(/\s*```$/gi, '')
          .replace(/```/g, '')
          .replace(/\*\*(.*?)\*\*/g, '<span leaf="" style="font-weight:bold;">$1</span>')
          .replace(/__(.*?)__/g, '<span leaf="" style="font-weight:bold;">$1</span>');

        setFormattedHtml(cleanedHtml);

        if (currentSyncId) {
          PreviewSyncService.publishUpdate(currentSyncId, cleanedHtml, content);
        }
      }

      if (isStreamActiveRef.current || currentRenderedLengthRef.current < targetBufferRef.current.length) {
        rafIdRef.current = requestAnimationFrame(step);
      } else {
        setIsFormatting(false);
      }
    };

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(step);
  };

  /**
   * 发起 SSE 流式排版逻辑
   */
  const handleFormatStream = async (
    targetContent: string = content,
    themeId: ThemeId = selectedThemeId,
    targetSyncId: string = syncId
  ) => {
    if (!targetContent.trim()) {
      showToast('请输入 Markdown 内容后再进行排版', 'error');
      return;
    }

    const now = Date.now();
    if (now - lastFormatTimeRef.current < 600) {
      return;
    }
    lastFormatTimeRef.current = now;

    // 更新实际渲染的主题状态
    setRenderedThemeId(themeId);
    setIsFormatting(true);
    setFormattedHtml('');

    targetBufferRef.current = '';
    currentRenderedLengthRef.current = 0;
    isStreamActiveRef.current = true;

    startRafLoop(targetSyncId);

    try {
      await LLMService.formatArticleStream(
        {
          content: targetContent,
          themeId,
          mode: llmMode,
          customConfig: customConfig || undefined,
        },
        (chunk) => {
          targetBufferRef.current += chunk;
        },
        () => {
          isStreamActiveRef.current = false;
          showToast('SSE 流式 AI 排版渲染完成！', 'success');
        }
      );
    } catch (err) {
      console.error('AI 排版请求异常:', err);
      isStreamActiveRef.current = false;
      setIsFormatting(false);
      showToast('AI 排版服务响应异常，请稍后重试。', 'error');
    }
  };

  // 一键复制富文本（一天只弹窗一次打赏引导）
  const handleCopy = async () => {
    if (!formattedHtml) return;

    const success = await ClipboardUtil.copyRichText(formattedHtml);
    if (success) {
      showToast('已复制高保真富文本至剪贴板！可直接在微信公众号编辑器 Ctrl+V 粘贴。', 'success');

      // 校验当天是否已弹出过打赏引导弹窗
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        const lastShownDate = localStorage.getItem('snapwrite_reward_shown_date');
        if (lastShownDate !== todayStr) {
          localStorage.setItem('snapwrite_reward_shown_date', todayStr);
          setIsRewardModalOpen(true);
        }
      } catch (err) {
        console.warn('读取打赏弹窗记录失败:', err);
        setIsRewardModalOpen(true);
      }
    } else {
      showToast('复制失败，请尝试手动全选预览内容。', 'error');
    }
  };

  // 响应从 Landing Page 直接点击开始排版/选主题
  const handleStartEditing = (themeId?: ThemeId) => {
    if (themeId) {
      setSelectedThemeId(themeId);
    }
    setCurrentView('editor');
  };

  // 响应 LLM 配置保存
  const handleLLMConfigSaved = (config: LLMConfig | null) => {
    if (config) {
      setCustomConfig(config);
      setLlmMode('custom');
      showToast(`已成功配置自定义模型: ${config.model}`, 'success');
    } else {
      setCustomConfig(null);
      setLlmMode('official');
      showToast('已切换为 SnapWrite 官方推荐模型', 'info');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* 顶部 Navigation Header */}
      <Header
        mode={llmMode}
        customModelName={customConfig?.model}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isFormatting={isFormatting}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        currentView={currentView}
        onSwitchView={setCurrentView}
      />

      {/* 视图分发：Landing Page 或 Editor 工作区 */}
      {currentView === 'landing' ? (
        <LandingPage onStartEditing={handleStartEditing} />
      ) : (
        <main className="flex-1 max-w-[1700px] w-full mx-auto px-3 py-2 sm:px-4 sm:py-3 grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch min-h-0 animate-in fade-in duration-300">
          {/* 左栏：Editor */}
          <div className="h-[calc(100vh-68px)] min-h-[500px]">
            <Editor
              content={content}
              onChange={(val) => {
                setContent(val);
                if (syncId && formattedHtml) {
                  PreviewSyncService.publishUpdate(syncId, formattedHtml, val);
                }
              }}
              selectedThemeId={selectedThemeId}
              onSelectTheme={(themeId) => {
                setSelectedThemeId(themeId);
              }}
              onFormat={() => handleFormatStream(content, selectedThemeId)}
              isFormatting={isFormatting}
            />
          </div>

          {/* 右栏：Preview */}
          <div className="h-[calc(100vh-68px)] min-h-[500px]">
            <Preview
              formattedHtml={formattedHtml}
              selectedThemeId={renderedThemeId}
              onCopy={handleCopy}
              onOpenQRCode={() => setIsQRCodeOpen(true)}
              isFormatting={isFormatting}
            />
          </div>
        </main>
      )}

      {/* 弹窗及通知组件 */}
      <QRCodeModal
        isOpen={isQRCodeOpen}
        onClose={() => setIsQRCodeOpen(false)}
        syncId={syncId}
      />

      <RewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
      />

      <LLMConfigModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onConfigSaved={handleLLMConfigSaved}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
