/**
 * @file components/ui/Input.tsx
 * @description 符合 Apple 极简光学字印与焦点环规范的 Input 输入框组件
 */

'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/80 dark:bg-zinc-800/80 border border-gray-300/70 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-apple-blue/50 focus:border-apple-blue transition-all shadow-apple-sm',
              error && 'border-red-500 focus:ring-red-500/50',
              className
            )
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
