/**
 * @file app/preview/[id]/page.tsx
 * @description 手机扫码独立预览页面（首次载入即可查看高保真预览，支持手动刷新，无 2s 轮询喧扰）
 */

'use client';

import React, { useEffect, useState } from 'react';
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
    setLoading(true);
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

    // 1. 首次载入抓取
    loadPreview();

    // 2. 同设备 BroadcastChannel 实时订阅
    const unsubscribe = PreviewSyncService.subscribeToUpdates(syncId, (newHtml) => {
      if (isMounted) {
        setFormattedHtml(newHtml);
        setUpdatedAt(Date.now());
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [syncId]);

  if (loading && !formattedHtml) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-wechat-lightBg text-zinc-600">
        <RefreshCw className="w-8 h-8 animate-spin text-wechat-green mb-3" />
        <p className="text-sm font-medium">正在加载 SnapWrite 扫码预览...</p>
      </div>
    );
  }

  if (errorMsg && !formattedHtml) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-wechat-lightBg text-zinc-600 text-center">
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
    <div className="min-h-screen bg-white text-zinc-900 pb-12">
      {/* 微信公众号手机端阅读 Header 标识 */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1.5 font-medium text-wechat-green">
          <Sparkles className="w-4 h-4" />
          <span>SnapWrite 手机实时预览</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">
            {new Date(updatedAt).toLocaleTimeString()}
          </span>
          <button
            onClick={loadPreview}
            disabled={loading}
            className="p-1 rounded-lg hover:bg-gray-100 transition-all text-gray-500"
            title="刷新最新排版"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 微信文章正文展示区 */}
      <main className="max-w-md mx-auto p-4">
        <div
          id="gzh-mobile-article"
          dangerouslySetInnerHTML={{ __html: formattedHtml }}
        />
      </main>

      {/* 底部微信客户端 Action 模拟 */}
      <footer className="max-w-md mx-auto px-4 mt-8 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
        <span>阅读 10000+</span>
        <div className="flex gap-4 text-gray-500 font-medium">
          <span>赞 88</span>
          <span>在看 66</span>
        </div>
      </footer>
    </div>
  );
}
