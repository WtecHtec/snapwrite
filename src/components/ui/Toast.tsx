/**
 * @file components/ui/Toast.tsx
 * @description 符合 Apple iOS 悬浮通知特性的 Toast 即时反馈组件
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            onClick={() => onDismiss(toast.id)}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-apple border border-white/40 dark:border-zinc-800 shadow-apple-lg text-sm font-medium text-zinc-800 dark:text-zinc-100 cursor-pointer"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-wechat-green" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-apple-blue" />}
            <span>{toast.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
