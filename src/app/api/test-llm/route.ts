/**
 * @file app/api/test-llm/route.ts
 * @description 自定义 LLM API 连通性测试 API 代理
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = body.apiKey;
    const apiUrl = body.apiUrl || body.baseUrl || 'https://api.siliconflow.cn/v1/chat/completions';
    const model = body.model || body.modelName || 'Qwen/Qwen3-8B';

    if (!apiKey) {
      return NextResponse.json({ success: false, message: '缺少 API Key' }, { status: 400 });
    }

    // 简单构造最小非流式测试请求
    const testPayload = {
      model,
      messages: [{ role: 'user', content: 'hi' }],
      max_tokens: 5,
    };

    let targetUrl = apiUrl;
    if (!targetUrl.includes('/chat/completions') && !targetUrl.endsWith('/chat/completions')) {
      targetUrl = `${targetUrl.replace(/\/+$/, '')}/chat/completions`;
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: `成功连接至 ${targetUrl}！模型 [${model}] 可用。`,
      });
    } else {
      const errText = await response.text();
      return NextResponse.json(
        {
          success: false,
          message: `连接返回 HTTP ${response.status}: ${errText.slice(0, 120)}`,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `网络连通测试失败: ${error.message || '未知错误'}`,
      },
      { status: 500 }
    );
  }
}
