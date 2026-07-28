/**
 * @file services/storage/LocalStorageService.ts
 * @description 浏览器 localStorage 本地存储服务（API Key 仅存储于本地 snapwrite_custom_config 键名下）
 */

import { LLMConfig } from '@/domain/llm/types';

const STORAGE_KEYS = {
  LLM_CONFIG: 'snapwrite_custom_config',
  SELECTED_THEME: 'snapwrite_selected_theme_id',
  CURRENT_CONTENT: 'snapwrite_current_markdown_content',
  PREVIEW_SYNC_PREFIX: 'snapwrite_preview_sync_',
};

export class LocalStorageService {
  /**
   * 保存自定义 LLM 配置至 localStorage (key: snapwrite_custom_config)
   */
  public static saveLLMConfig(config: LLMConfig): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.LLM_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('保存 LLM 配置失败:', e);
    }
  }

  /**
   * 读取自定义 LLM 配置 (key: snapwrite_custom_config)
   */
  public static getLLMConfig(): LLMConfig | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LLM_CONFIG);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // 兼容可能遗留的不同键结构
      return {
        apiKey: parsed.apiKey || '',
        apiUrl: parsed.apiUrl || parsed.baseUrl || 'https://api.siliconflow.cn/v1/chat/completions',
        model: parsed.model || parsed.modelName || 'Qwen/Qwen3-8B',
      };
    } catch (e) {
      console.error('读取 LLM 配置失败:', e);
      return null;
    }
  }

  /**
   * 清除自定义 LLM 配置（恢复使用官方默认模型）
   */
  public static clearLLMConfig(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.LLM_CONFIG);
  }

  /**
   * 保存与获取排版预览内容
   */
  public static savePreviewContent(syncId: string, html: string, markdown: string): void {
    if (typeof window === 'undefined') return;
    try {
      const data = { html, markdown, updatedAt: Date.now() };
      localStorage.setItem(`${STORAGE_KEYS.PREVIEW_SYNC_PREFIX}${syncId}`, JSON.stringify(data));
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('snapwrite_preview_channel');
        channel.postMessage({ syncId, ...data });
        channel.close();
      }
    } catch (e) {
      console.error('保存预览同步内容失败:', e);
    }
  }

  public static getPreviewContent(syncId: string): { html: string; markdown: string; updatedAt: number } | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.PREVIEW_SYNC_PREFIX}${syncId}`);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('读取预览同步内容失败:', e);
      return null;
    }
  }
}
