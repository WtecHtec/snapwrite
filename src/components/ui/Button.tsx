/**
 * @file components/ui/Button.tsx
 * @description 符合 Apple Design 规范的连贯物理动画按钮组件
 * 包含 pointer-down 即时按压反馈 (scale: 0.97)、高光边缘与毛玻璃支持
 */

'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { AppleSpringPresets } from '@/utils/spring';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'wechat' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none select-none cursor-pointer border';

  const variants = {
    primary: 'bg-apple-blue hover:bg-blue-600 text-white border-transparent shadow-apple-sm',
    secondary: 'bg-gray-200/80 dark:bg-zinc-800/80 hover:bg-gray-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-transparent',
    wechat: 'bg-wechat-green hover:bg-wechat-hover text-white border-transparent shadow-apple-sm',
    outline: 'bg-transparent border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200',
    ghost: 'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
    glass: 'bg-white/60 dark:bg-zinc-900/60 backdrop-blur-apple border-white/40 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 shadow-glass',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <motion.button
      whileTap={AppleSpringPresets.buttonPress}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </motion.button>
  );
};
