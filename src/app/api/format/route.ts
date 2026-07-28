/**
 * @file app/api/format/route.ts
 * @description 微信公众号 SSE (Server-Sent Events) 流式 AI 排版 API 路由
 * 支持精准包边界缓冲区 (buffer.split('\n\n'))，解决 Vercel 网关分包撕裂截断问题
 */

import { NextResponse } from 'next/server';
import { GZHPromptManager } from '@/prompts/gzhSystemPrompt';
import { GZHStyleEngine } from '@/domain/formatter/GZHStyleEngine';
import { ThemeId } from '@/domain/formatter/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { content, themeId, mode, customConfig } = await req.json();

    if (!content || !content.trim()) {
      return NextResponse.json({ error: '排版内容不能为空' }, { status: 400 });
    }

    // 确定 API 端点全路径 URL
    let endpointUrl = customConfig?.apiUrl || process.env.DEFAULT_LLM_API_URL || '';
    if (!endpointUrl) {
      const baseUrl = (customConfig?.baseUrl || process.env.DEFAULT_LLM_BASE_URL || 'https://api.siliconflow.cn/v1').replace(/\/+$/, '');
      endpointUrl = `${baseUrl}/chat/completions`;
    } else {
      if (!endpointUrl.includes('/chat/completions') && !endpointUrl.endsWith('/chat/completions')) {
        endpointUrl = `${endpointUrl.replace(/\/+$/, '')}/chat/completions`;
      }
    }

    const apiKey = customConfig?.apiKey || process.env.DEFAULT_LLM_API_KEY || '';
    const model = customConfig?.model || customConfig?.modelName || process.env.DEFAULT_LLM_MODEL || 'Qwen/Qwen3-8B';

    const systemPrompt = GZHPromptManager.getSystemPrompt((themeId as ThemeId) || 'moyu-green');
    const userPrompt = GZHPromptManager.buildUserPrompt(content);

    const requestPayload: any = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      stream: true,
    };

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (apiKey.trim()) {
          try {
            const llmRes = await fetch(endpointUrl, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestPayload),
            });

            if (!llmRes.ok || !llmRes.body) {
              throw new Error(`LLM 响应异常: HTTP ${llmRes.status}`);
            }

            const reader = llmRes.body.getReader();
            const decoder = new TextDecoder('utf-8');

            let buffer = '';

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              // 1. 增量解码流文本
              buffer += decoder.decode(value, { stream: true });

              // 2. 按标准的 SSE 消息双换行符 '\n\n' 进行拆包，留存未收全的半包至下一轮
              const events = buffer.split('\n\n');
              buffer = events.pop() || '';

              for (const event of events) {
                const trimmed = event.trim();
                if (!trimmed) continue;

                if (trimmed.startsWith('data:')) {
                  const dataStr = trimmed.slice(5).trim();
                  if (dataStr === '[DONE]') break;

                  try {
                    const json = JSON.parse(dataStr);
                    const delta = json.choices?.[0]?.delta?.content || '';
                    if (delta) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`));
                    }
                  } catch (e) {
                    // 忽略格式解析半包
                  }
                }
              }
            }

            // 清理末尾遗留的 Buffer
            if (buffer.trim()) {
              const trimmed = buffer.trim();
              if (trimmed.startsWith('data:')) {
                const dataStr = trimmed.slice(5).trim();
                if (dataStr && dataStr !== '[DONE]') {
                  try {
                    const json = JSON.parse(dataStr);
                    const delta = json.choices?.[0]?.delta?.content || '';
                    if (delta) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`));
                    }
                  } catch (e) {}
                }
              }
            }
          } catch (err: any) {
            console.warn('真实 LLM 连通异常，降级为规则引擎高保真流式生成:', err.message);
            await simulateRuleEngineStream(content, themeId as ThemeId, controller, encoder);
          }
        } else {
          await simulateRuleEngineStream(content, themeId as ThemeId, controller, encoder);
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '服务器内部错误' }, { status: 500 });
  }
}

/**
 * 规则引擎打字机流式输出模拟
 */
async function simulateRuleEngineStream(
  content: string,
  themeId: ThemeId,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  const fullHtml = GZHStyleEngine.format(content, themeId);
  const chunkSize = 25;

  for (let i = 0; i < fullHtml.length; i += chunkSize) {
    const slice = fullHtml.slice(i, i + chunkSize);
    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: slice })}\n\n`));
    await new Promise((r) => setTimeout(r, 20));
  }
}
