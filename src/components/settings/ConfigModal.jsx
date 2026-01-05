import { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useDraft } from '../../context/DraftContext';

export default function ConfigModal() {
    const { isDarkMode, toggleTheme, customConfig, setCustomConfig, isConfigModalOpen, setIsConfigModalOpen } = useDraft();
    const [localConfig, setLocalConfig] = useState(customConfig);

    useEffect(() => {
        // Sync local input with context when opening
        setLocalConfig(customConfig);
    }, [customConfig]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        if (!localConfig.apiKey.trim()) {
            toast.error('请输入 API 密钥');
            return;
        }
        // Save to Context (Memory Only)
        setCustomConfig(localConfig);
        toast.success('配置已应用！', {
            description: '本次会话将使用自定义 LLM 设置。'
        });
        setIsConfigModalOpen(false); // Close modal after applying
    };

    const handleClose = () => {
        setIsConfigModalOpen(false); // Just close the modal, keep dark mode?
        // Or user cancelled custom mode?
        // If they close without applying, maybe they just want to look around.
        // Let's just close the modal.
    };

    // We need to change how this modal is controlled.
    // BUT for now, to satisfy "Privacy", I will just update the persistence logic.
    // The issue of "blocking" is separate, but I should fix it if I can.
    // Let's assume the user wants to configure and then write.
    // So we definitely need to close the modal eventually.

    // Let's assume for this specific task: refactor storage only.
    // User didn't complain about blocking, just storage.
    // But blocking IS a bug if they can't use the app.
    // I entered "Custom Mode" -> Modal blocks -> I config -> Save -> Modal still blocks?
    // I'll leave the blocking logic as is for now unless I can quickly fix it in Context.
    // Current logic: `if (!isDarkMode) return null`.
    // If I want to fix blocking: add `isConfigOpen` state to context.

    // I'll stick to replacing the storage logic first.
    if (!isConfigModalOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'var(--bg-panel)',
                padding: '30px',
                borderRadius: '16px',
                width: '400px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                color: 'var(--text-main)',
                position: 'relative'
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        padding: '4px',
                        cursor: 'pointer'
                    }}
                >
                    <X size={20} />
                </button>

                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <AlertCircle size={24} color="var(--primary)" />
                    自定义 LLM 模式
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    暗黑模式已开启。您的密钥<strong>仅存储在内存中</strong>，不会保存到本地磁盘。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>API 地址</label>
                        <input
                            type="text"
                            name="apiUrl"
                            value={localConfig.apiUrl}
                            onChange={handleChange}
                            placeholder="https://api.openai.com/v1/chat/completions"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-app)', color: 'var(--text-main)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>模型名称</label>
                        <input
                            type="text"
                            name="model"
                            value={localConfig.model}
                            onChange={handleChange}
                            placeholder="gpt-4"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-app)', color: 'var(--text-main)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>API 密钥</label>
                        <input
                            type="password"
                            name="apiKey"
                            value={localConfig.apiKey}
                            onChange={handleChange}
                            placeholder="sk-..."
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-app)', color: 'var(--text-main)' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                            onClick={handleApply}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <Save size={18} /> 应用配置
                        </button>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '10px' }}>
                        配置仅在当前会话有效，刷新页面后将自动清除。
                    </p>
                </div>
            </div>
        </div>
    );
}
