/**
 * @file components/features/LLMConfigModal.tsx
 * @description 用户自定义 LLM 配置抽屉组件 (保存至 localStorage 键名 snapwrite_custom_config: { apiKey, apiUrl, model })
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LLMConfig } from '@/domain/llm/types';
import { LocalStorageService } from '@/services/storage/LocalStorageService';
import { LLMService } from '@/services/llm/LLMService';
import { ShieldCheck, RefreshCw, CheckCircle2, AlertCircle, Trash2, Cpu } from 'lucide-react';

export interface LLMConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: (config: LLMConfig | null) => void;
}

export const LLMConfigModal: React.FC<LLMConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('https://api.siliconflow.cn/v1/chat/completions');
  const [model, setModel] = useState<string>('Qwen/Qwen3-8B');

  const [testing, setTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // 初始化读取本地 localStorage (snapwrite_custom_config) 中的配置
  useEffect(() => {
    if (isOpen) {
      const saved = LocalStorageService.getLLMConfig();
      if (saved) {
        setApiKey(saved.apiKey || '');
        setApiUrl(saved.apiUrl || 'https://api.siliconflow.cn/v1/chat/completions');
        setModel(saved.model || 'Qwen/Qwen3-8B');
      }
      setTestResult(null);
    }
  }, [isOpen]);

  // 测试 API 连通性
  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: '请先填写 API Key' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    const res = await LLMService.testConnection({ apiKey, apiUrl, model });
    setTesting(false);
    setTestResult(res);
  };

  // 保存配置
  const handleSave = () => {
    if (!apiKey.trim()) {
      LocalStorageService.clearLLMConfig();
      onConfigSaved(null);
      onClose();
      return;
    }

    const config: LLMConfig = {
      apiKey: apiKey.trim(),
      apiUrl: apiUrl.trim() || 'https://api.siliconflow.cn/v1/chat/completions',
      model: model.trim() || 'Qwen/Qwen3-8B',
    };
    LocalStorageService.saveLLMConfig(config);
    onConfigSaved(config);
    onClose();
  };

  // 恢复默认官方模型
  const handleClear = () => {
    setApiKey('');
    LocalStorageService.clearLLMConfig();
    onConfigSaved(null);
    setTestResult({ success: true, message: '已恢复使用 SnapWrite 官方默认模型' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="自定义 LLM 模型配置">
      <div className="flex flex-col gap-4 py-1">
        {/* 隐私与安全告示 Banner */}
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-start gap-2 text-xs text-blue-900 dark:text-blue-200">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-blue-600 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">隐私安全保证：</span>
            您的配置数据仅以 <code className="font-mono text-[11px]">snapwrite_custom_config</code> 保存在本地浏览器，绝不上传服务器。
          </div>
        </div>

        {/* 表单项：API Key, API URL, Model */}
        <div className="flex flex-col gap-3">
          <Input
            label="API Key (密钥)"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="填写您的 API Key (例如 sk-***)"
          />

          <Input
            label="API URL (接口地址)"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="例如: https://api.siliconflow.cn/v1/chat/completions"
          />

          <Input
            label="Model (模型名称)"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="例如: Qwen/Qwen3-8B 或 gpt-4o"
          />
        </div>

        {/* 测试反馈提示 */}
        {testResult && (
          <div
            className={`p-3 rounded-xl text-xs font-medium border flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-wechat-green flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* 底部按键动作条 */}
        <div className="pt-3 border-t border-gray-200/60 dark:border-zinc-800 flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-gray-500">
            <Trash2 className="w-3.5 h-3.5" />
            <span>恢复官方模型</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleTestConnection} disabled={testing}>
              {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Cpu className="w-3.5 h-3.5" />}
              <span>{testing ? '测试中...' : '测试连接'}</span>
            </Button>

            <Button variant="primary" size="sm" onClick={handleSave}>
              <span>保存配置</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
