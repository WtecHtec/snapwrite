/**
 * @file services/llm/LLMService.ts
 * @description LLM 服务调度器（支持 SSE 流式排版接收与连通性测试）
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
   * 发起 SSE 流式排版请求，并在接收每个 Chunk 时触发 onChunk 回调
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

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.replace('data: ', '').trim();
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
              // 忽略解析空块
            }
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
