/**
 * @file components/features/HeroAnimationShowcase.tsx
 * @description Landing Page Hero 动态自动打字与实时 AI 排版演示组件（无限循环重播）
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Check } from 'lucide-react';

const MOCK_TYPING_TEXT = `# 拥抱 AI 排版新纪元
> "好的排版让阅读成为一种享受。"

- 自动提炼核心金句与下划线
- 嵌入首屏 SMIL 矢量开场动画
- 1 秒复制至微信公众号后台`;

export const HeroAnimationShowcase: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [isFormatted, setIsFormatted] = useState(false);
  const [replayCount, setReplayCount] = useState(0);

  // 打字机无限循环动画逻辑
  useEffect(() => {
    let isMounted = true;
    let charIndex = 0;
    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let resetTimeoutId: NodeJS.Timeout | null = null;

    const runCycle = () => {
      if (!isMounted) return;
      setTypedText('');
      setIsFormatted(false);
      charIndex = 0;

      intervalId = setInterval(() => {
        if (!isMounted) return;

        if (charIndex < MOCK_TYPING_TEXT.length) {
          setTypedText(MOCK_TYPING_TEXT.slice(0, charIndex + 1));
          charIndex++;
        } else {
          if (intervalId) clearInterval(intervalId);

          // 打字完成，400ms 后呈现格式化效果
          timeoutId = setTimeout(() => {
            if (!isMounted) return;
            setIsFormatted(true);

            // 展示格式化效果 3.5 秒后自动开启下一轮重播
            resetTimeoutId = setTimeout(() => {
              if (!isMounted) return;
              runCycle();
            }, 3500);
          }, 400);
        }
      }, 40);
    };

    runCycle();

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      if (resetTimeoutId) clearTimeout(resetTimeoutId);
    };
  }, [replayCount]);

  const handleManualReplay = () => {
    setReplayCount((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-4xl rounded-3xl bg-zinc-900/90 dark:bg-zinc-900/95 border border-zinc-800 p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left my-8">
      {/* 顶部 Window Chrome 控制栏 */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-zinc-500 font-mono ml-2">SnapWrite Live AI Auto-Formatting Demo</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>{isFormatted ? 'AI 智能渲染完成' : '文章自动打字中...'}</span>
          </div>

          <button
            onClick={handleManualReplay}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="手动重播打字排版动画"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 动态两栏展示：左栏 文章文字打字机 / 右栏 高保真排版产物 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch min-h-[260px]">
        {/* 左栏：文章文字打字 */}
        <div className="flex flex-col bg-zinc-950/80 rounded-2xl p-4 border border-zinc-800/80 font-mono text-xs text-zinc-300 relative overflow-hidden">
          <div className="text-[10px] text-zinc-500 font-semibold mb-2 flex items-center justify-between">
            <span>INPUT: ARTICLE TEXT</span>
            <span className="text-emerald-500">Live Typing</span>
          </div>

          <div className="flex-1 whitespace-pre-wrap leading-relaxed text-zinc-200">
            {typedText}
            <span className="inline-block w-1.5 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
          </div>
        </div>

        {/* 右栏：微信高保真富文本自动排版动效 */}
        <div className="flex flex-col bg-white rounded-2xl p-4 border border-zinc-200 text-zinc-900 relative overflow-hidden shadow-inner">
          <div className="text-[10px] text-zinc-400 font-semibold mb-2 flex items-center justify-between font-mono">
            <span>PREVIEW: WECHAT GZH</span>
            {isFormatted && (
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Formatted
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!isFormatted ? (
              <motion.div
                key="raw-preview"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-center items-center text-zinc-400 text-xs gap-2 py-8"
              >
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <span>实时捕捉输入中...</span>
              </motion.div>
            ) : (
              <motion.div
                key="formatted-preview"
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex-1 flex flex-col gap-3 text-left overflow-y-auto"
              >
                {/* 动态 SVG 墨韵开篇开场模块 */}
                <div className="rounded-xl overflow-hidden bg-[#F5F4ED] p-2 text-center border border-amber-200/60 shadow-sm">
                  <p className="text-[9px] font-bold text-[#B85235] tracking-widest uppercase">SPECIAL EDITORIAL</p>
                  <h3 className="text-base font-extrabold text-[#141413] mt-0.5 font-serif">拥抱 AI 排版新纪元</h3>
                  <div className="w-12 h-0.5 bg-[#B85235] mx-auto my-1.5 rounded-full" />
                  <p className="text-[10px] text-zinc-500">SnapWrite 自动转换</p>
                </div>

                {/* 精制引用卡片 */}
                <div className="bg-[#EEF2F7] border-l-4 border-[#1B365D] p-2.5 rounded-r-lg">
                  <p className="text-xs text-[#1B365D] font-medium italic">
                    「好的排版让阅读成为一种享受。」
                  </p>
                </div>

                {/* 列表项 */}
                <ul className="text-xs text-zinc-700 space-y-1 pl-1">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B85235]" />
                    <span>自动提炼核心金句与下划线</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B85235]" />
                    <span>嵌入首屏 SMIL 矢量开场动画</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B85235]" />
                    <span>1 秒复制至微信公众号后台</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
