/**
 * @file components/ui/GlassCard.tsx
 * @description 符合 Apple 材质与深度规范的毛玻璃卡片容器组件
 * backdrop-filter: blur(20px) saturate(180%) + 光影渐变边框
 */

'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  interactive = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-apple border border-white/50 dark:border-zinc-800/80 shadow-apple-md',
          interactive && 'transition-all duration-300 hover:shadow-apple-lg hover:border-white/80 hover:bg-white/80',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
