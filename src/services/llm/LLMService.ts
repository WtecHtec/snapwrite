/**
 * @file services/llm/LLMService.ts
 * @description LLM 服务调度器（支持 SSE 流式排版接收与精确消息双换行符缓冲区拆包算法）
 */

import { LLMConfig, FormatRequest } from '@/domain/llm/types';

export class LLMService {
  /**
   * 测试自定义 LLM API 连通性
   */
  public static async testConnection(config: LLMConfig): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/test-llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      return {
        success: res.ok && data.success,
        message: data.message || (res.ok ? '连接测试成功！' : '连接失败，请检查配置。'),
      };
    } catch (e: any) {
      return {
        success: false,
        message: `网络连接异常: ${e.message || '未知错误'}`,
      };
    }
  }

  /**
   * 发起 SSE 流式排版请求（使用标准 buffer.split('\n\n') 精确拆包算法，防止分包撕裂）
   * @param request 排版请求对象
   * @param onChunk 文本 Chunk 增量回调
   * @param onDone 完成回调
   */
  public static async formatArticleStream(
    request: FormatRequest,
    onChunk: (chunk: string) => void,
    onDone: () => void
  ): Promise<void> {
    try {
      const response = await fetch('/api/format', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok || !response.body) {
        throw new Error(`请求失败: HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // 1. 增量解密字符数据流
        buffer += decoder.decode(value, { stream: true });

        // 2. 按标准的双换行符 '\n\n' 分割 SSE 完整事件包，留存未收全的半包
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';

        for (const event of events) {
          const trimmed = event.trim();
          if (!trimmed) continue;

          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.slice(5).trim();
            if (dataStr === '[DONE]') {
              onDone();
              return;
            }

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                onChunk(parsed.text);
              }
            } catch (e) {
              // 忽略解析空块或格式半包
            }
          }
        }
      }

      // 接收尾部遗留的 buffer 数据
      if (buffer.trim()) {
        const trimmed = buffer.trim();
        if (trimmed.startsWith('data:')) {
          const dataStr = trimmed.slice(5).trim();
          if (dataStr && dataStr !== '[DONE]') {
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                onChunk(parsed.text);
              }
            } catch (e) {}
          }
        }
      }

      onDone();
    } catch (error: any) {
      console.error('SSE 流式传输异常:', error);
      onDone();
    }
  }
}
