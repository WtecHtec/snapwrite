/**
 * @file components/features/QRCodeModal.tsx
 * @description 手机扫码预览弹窗组件（符合 PRD 4.1 扫码无缝实时同步）
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { QRCodeUtil } from '@/utils/qrcode';
import { Smartphone, RefreshCw, Copy, Check } from 'lucide-react';

export interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncId: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, syncId }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && syncId) {
      // 构造预览链接
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      const url = `${origin}/preview/${syncId}`;
      setPreviewUrl(url);

      QRCodeUtil.generateDataUrl(url).then((dataUrl) => {
        setQrCodeDataUrl(dataUrl);
      });
    }
  }, [isOpen, syncId]);

  const handleCopyLink = () => {
    if (!previewUrl) return;
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="微信手机扫码预览">
      <div className="flex flex-col items-center gap-4 text-center py-2">
        <p className="text-xs text-gray-500 dark:text-zinc-400">
          使用微信或手机浏览器扫描下方二维码，即可在手机端实时同步预览排版效果
        </p>

        {/* 二维码容器 */}
        <div className="p-3 bg-white rounded-2xl border border-gray-200 shadow-apple-md flex items-center justify-center min-h-[200px] min-w-[200px]">
          {qrCodeDataUrl ? (
            <img src={qrCodeDataUrl} alt="预览二维码" className="w-48 h-48 rounded-lg" />
          ) : (
            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
          )}
        </div>

        {/* 实时同步状态指示 badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-700 dark:text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-wechat-green animate-pulse" />
          <span>双向实时同步频道已连接 (每 10 秒准实时自动更新)</span>
        </div>

        {/* 复制链接备选 */}
        <div className="w-full flex items-center gap-2 pt-2 border-t border-gray-200/50 dark:border-zinc-800">
          <input
            readOnly
            value={previewUrl}
            className="flex-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 font-mono truncate"
          />
          <Button variant="outline" size="sm" onClick={handleCopyLink}>
            {copied ? <Check className="w-3.5 h-3.5 text-wechat-green" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制' : '复制链接'}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
