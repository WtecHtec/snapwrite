/**
 * @file components/ui/Modal.tsx
 * @description 符合 Apple 交互规范的可中断物理弹窗组件（包含手势/模糊背景 Scrim）
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AppleSpringPresets } from '@/utils/spring';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 背景遮罩 Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* 物理弹窗内容卡片 */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={AppleSpringPresets.sheetModal}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-apple p-6 shadow-apple-lg border border-white/40 dark:border-zinc-800"
          >
            <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-zinc-800 pb-3 mb-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-200/50 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
