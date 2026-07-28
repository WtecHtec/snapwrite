/**
 * @file services/sync/PreviewSyncService.ts
 * @description 桌面编辑端与手机扫码预览端的双向数据同步服务
 * 极简零日志刷屏：仅在渲染完全结束或主动扫码时才发起 1 次 HTTP POST 服务端同步
 */

import { LocalStorageService } from '../storage/LocalStorageService';

export class PreviewSyncService {
  /**
   * 生成唯一预览同步 ID
   */
  public static generateSyncId(): string {
    return 'snap_' + Math.random().toString(36).substring(2, 9);
  }

  /**
   * 发布最新排版结果到同步频道
   * @param syncId 唯一同步 ID
   * @param html 渲染后的 HTML
   * @param markdown 原始文章文本
   * @param syncToServer 是否向服务端发起 HTTP POST（默认 false，仅本地与页签广播；只有在渲染完成或主动扫码时传 true）
   */
  public static publishUpdate(
    syncId: string,
    html: string,
    markdown: string,
    syncToServer: boolean = false
  ): void {
    // 1. 本地存储 & 同域标签页 BroadcastChannel 广播 (0ms 瞬间完成，零网络请求)
    LocalStorageService.savePreviewContent(syncId, html, markdown);

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const channel = new BroadcastChannel('snapwrite_preview_channel');
        channel.postMessage({ syncId, html });
        channel.close();
      } catch (e) {
        // 忽略广播通道异常
      }
    }

    // 2. 只有在指定 syncToServer 为 true 时（渲染最终完成 / 主动扫码），才发起 1 次 HTTP POST 推送
    if (syncToServer && typeof window !== 'undefined' && syncId && html) {
      fetch(`/api/preview/${syncId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html, markdown }),
      }).catch((err) => {
        console.warn('服务端预览同步推送告警:', err);
      });
    }
  }

  /**
   * 获取指定 ID 的同步预览数据
   */
  public static async fetchPreviewRemote(syncId: string): Promise<{ html: string; updatedAt: number } | null> {
    if (!syncId) return null;

    try {
      const res = await fetch(`/api/preview/${syncId}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.html) {
          return { html: data.html, updatedAt: data.updatedAt || Date.now() };
        }
      }
    } catch (e) {
      // 忽略网络异常，转本地兜底
    }

    return this.fetchPreviewLocal(syncId);
  }

  /**
   * 本地读取兜底
   */
  public static fetchPreviewLocal(syncId: string) {
    return LocalStorageService.getPreviewContent(syncId);
  }

  /**
   * 网页关闭或注销时，即时释放服务端 previewStore 避免数据冗余
   */
  public static clearPreview(syncId: string): void {
    if (typeof window === 'undefined' || !syncId) return;

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(`/api/preview/${syncId}`);
      } else {
        fetch(`/api/preview/${syncId}`, { method: 'DELETE', keepalive: true }).catch(() => {});
      }
    } catch (e) {
      // 忽略清理异常
    }
  }

  /**
   * 监听实时更新（用于同设备标签页双向绑定）
   */
  public static subscribeToUpdates(syncId: string, callback: (html: string) => void): () => void {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) {
      return () => {};
    }

    const channel = new BroadcastChannel('snapwrite_preview_channel');
    const handler = (event: MessageEvent) => {
      if (event.data && event.data.syncId === syncId && event.data.html) {
        callback(event.data.html);
      }
    };

    channel.addEventListener('message', handler);

    return () => {
      channel.removeEventListener('message', handler);
      channel.close();
    };
  }
}
