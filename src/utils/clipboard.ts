/**
 * @file utils/clipboard.ts
 * @description 微信公众号富文本专属剪贴板复制工具
 * 可防止直接 Ctrl+C 导致内联样式与 <span leaf=""> 格式在微信编辑器中丢失
 */

export class ClipboardUtil {
  /**
   * 将 HTML 格式化为 ClipboardItem 富文本数据写入系统剪贴板
   * @param html 带 Inline-CSS 的 HTML 字符串
   * @returns 复制成功状态
   */
  public static async copyRichText(html: string): Promise<boolean> {
    if (typeof window === 'undefined' || !navigator.clipboard) {
      return false;
    }

    try {
      // 构造包含 text/html 和 text/plain 的 MIME Blob
      const blobHtml = new Blob([html], { type: 'text/html' });
      const blobText = new Blob([this.stripHtml(html)], { type: 'text/plain' });

      const item = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText,
      });

      await navigator.clipboard.write([item]);
      return true;
    } catch (e) {
      console.warn('使用 ClipboardItem API 复制富文本失败，尝试 fallback 方案:', e);
      return this.fallbackCopy(html);
    }
  }

  /**
   * 兜底方案：使用隐藏可编辑 div 模拟 DOM 选中并执行 execCommand('copy')
   */
  private static fallbackCopy(html: string): boolean {
    try {
      const container = document.createElement('div');
      container.innerHTML = html;
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      document.body.appendChild(container);

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(container);
      selection?.removeAllRanges();
      selection?.addRange(range);

      const success = document.execCommand('copy');

      selection?.removeAllRanges();
      document.body.removeChild(container);
      return success;
    } catch (err) {
      console.error('Fallback 复制失败:', err);
      return false;
    }
  }

  /**
   * 过滤 HTML 标签获取纯文本
   */
  private static stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
