/**
 * @file domain/llm/types.ts
 * @description LLM 配置与模型定义（符合单一职责原则，独立于 UI 框架）
 */

// 用户自定义 LLM 配置数据结构
export interface LLMConfig {
  /** LLM API Key */
  apiKey: string;
  /** LLM API 完整接口地址（例如：https://api.siliconflow.cn/v1/chat/completions） */
  apiUrl: string;
  /** 模型名称（例如：Qwen/Qwen3-8B） */
  model: string;
}

// 模型调用类型（官方默认模型 vs 用户自定义模型）
export type LLMMode = 'official' | 'custom';

// 排版请求参数定义
export interface FormatRequest {
  /** 待排版的文章原文 */
  content: string;
  /** 目标主题 ID */
  themeId: string;
  /** LLM 运行模式 */
  mode: LLMMode;
  /** 用户自定义配置（仅在 mode === 'custom' 时使用） */
  customConfig?: LLMConfig;
}

// 排版响应数据结构
export interface FormatResponse {
  /** 格式化后的符合微信公众号规范的 Inline-CSS HTML */
  formattedHtml: string;
  /** 排版使用的模版主题 ID */
  themeId: string;
  /** 执行耗时 (ms) */
  executionTimeMs: number;
}
