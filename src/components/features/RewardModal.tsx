/**
 * @file components/features/RewardModal.tsx
 * @description 一键复制成功后的打赏引导弹窗（每天仅展示一次）
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Heart, Coffee, X, CheckCircle2 } from 'lucide-react';

export interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          title="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 复制成功状态图标 */}
        <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-wechat-green flex items-center justify-center mb-3 shadow-inner">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          已成功复制到剪贴板！
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-5">
          请前往微信公众号后台编辑器按下 <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700 font-mono text-[10px]">Ctrl + V</kbd> 或 <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700 font-mono text-[10px]">⌘ + V</kbd> 直接粘贴
        </p>

        <div className="w-full border-t border-dashed border-gray-200 dark:border-zinc-800 my-1" />

        {/* 打赏引导卡片 */}
        <div className="mt-4 flex flex-col items-center w-full">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
            <Coffee className="w-4 h-4" />
            <span>请开发者喝杯咖啡 ☕</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-3 px-2">
            如果 SnapWrite 帮助您提升了公众号排版效率，欢迎打赏支持此开源项目的持续维护与升级 ❤️
          </p>

          {/* 打赏二维码微信图片 (public/wx.png) */}
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-zinc-700 shadow-md mb-4 bg-white p-2">
            <div className="relative w-full h-full">
              <Image
                src="/wx.png"
                alt="微信赞赏码"
                fill
                className="object-contain rounded-xl"
                priority
              />
            </div>
          </div>

          <Button
            variant="wechat"
            size="md"
            className="w-full bg-wechat-green hover:bg-emerald-600 text-white rounded-xl font-medium"
            onClick={onClose}
          >
            <Heart className="w-4 h-4 mr-1.5 fill-current" />
            <span>知道啦，非常感谢！</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
