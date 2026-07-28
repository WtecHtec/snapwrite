/**
 * @file app/preview/[id]/page.tsx
 * @description 手机扫码独立预览页面（扫码打开时开启 5s 周期同步拉取渲染，支持手动刷新）
 */

'use client';

import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { PreviewSyncService } from '@/services/sync/PreviewSyncService';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface MobilePreviewPageProps {
  params: {
    id: string;
  };
}

export default function MobilePreviewPage({ params }: MobilePreviewPageProps) {
  const syncId = params?.id;

  const [formattedHtml, setFormattedHtml] = useState<string>('');
  const [updatedAt, setUpdatedAt] = useState<number>(Date.now());
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // 抓取服务端及本地最新预览内容
  const loadPreview = async () => {
    if (!syncId) return;
    setErrorMsg('');

    const data = await PreviewSyncService.fetchPreviewRemote(syncId);
    if (data && data.html) {
      setFormattedHtml(data.html);
      setUpdatedAt(data.updatedAt);
      setErrorMsg('');
    } else {
      if (!formattedHtml) {
        setErrorMsg('该预览已关闭或页面已卸载释放');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!syncId) return;

    let isMounted = true;

    // 1. 首次扫码进入即刻载入
    loadPreview();

    // 2. 只有扫码在手机端预览时，开启 5s 周期同步渲染轮询
    const intervalId = setInterval(() => {
      if (isMounted) {
        loadPreview();
      }
    }, 5000);

    // 3. 同设备 BroadcastChannel 实时订阅
    const unsubscribe = PreviewSyncService.subscribeToUpdates(syncId, (newHtml) => {
      if (isMounted) {
        setFormattedHtml(newHtml);
        setUpdatedAt(Date.now());
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      unsubscribe();
    };
  }, [syncId]);

  if (loading && !formattedHtml) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F7] text-zinc-600">
        <RefreshCw className="w-8 h-8 animate-spin text-wechat-green mb-3" />
        <p className="text-sm font-medium">正在加载 SnapWrite 扫码预览...</p>
      </div>
    );
  }

  if (errorMsg && !formattedHtml) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F7] text-zinc-600 text-center">
        <AlertCircle className="w-10 h-10 text-amber-500 mb-3" />
        <p className="text-sm font-semibold text-zinc-800 mb-1">{errorMsg}</p>
        <p className="text-xs text-gray-400 mb-4">桌面端编辑页面可能已重新生成或关闭</p>
        <button
          onClick={loadPreview}
          className="px-4 py-2 rounded-xl bg-wechat-green text-white text-xs font-semibold shadow-apple-sm"
        >
          重新拉取
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 flex flex-col items-center">
      {/* 顶部手机浏览浮动 Chrome */}
      <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-wechat-green flex items-center justify-center text-white text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-zinc-800">SnapWrite 移动预览</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400 font-mono">5s 自动刷新中</span>
          <button
            onClick={loadPreview}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            title="手动刷新"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 手机视角文章内容展示容器 (100% 保持防横向溢出) */}
      <main className="w-full max-w-[480px] bg-white min-h-[calc(100vh-48px)] p-4 sm:p-5 shadow-sm">
        <div id="mobile-gzh-preview-container" className="w-full text-zinc-900 leading-relaxed overflow-x-hidden">
          {formattedHtml ? parse(formattedHtml) : null}
        </div>
      </main>
    </div>
  );
}
