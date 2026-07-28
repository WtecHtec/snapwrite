/**
 * @file app/api/preview/[id]/route.ts
 * @description 跨设备/手机端扫码预览 服务端内存缓存 API 路由
 * 支持即时写入、查询以及网页关闭时的及时释放 (DELETE / beacon)
 */

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface PreviewItem {
  html: string;
  markdown: string;
  updatedAt: number;
}

// 在 Node 进程级别全局共享预览数据 Map
const globalForPreview = global as unknown as {
  previewStore?: Map<string, PreviewItem>;
};

const previewStore =
  globalForPreview.previewStore || new Map<string, PreviewItem>();

if (process.env.NODE_ENV !== 'production') {
  globalForPreview.previewStore = previewStore;
}

/**
 * GET /api/preview/[id]
 * 手机端或其他设备获取最新的排版预览 HTML
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const syncId = params.id;
  if (!syncId) {
    return NextResponse.json({ error: '缺少 syncId 参数' }, { status: 400 });
  }

  const data = previewStore.get(syncId);
  if (!data) {
    return NextResponse.json({ error: '未找到预览数据或页面已关闭' }, { status: 404 });
  }

  return NextResponse.json({ success: true, ...data });
}

/**
 * POST /api/preview/[id]
 * 桌面端同步最新 HTML / Markdown 至服务端内存
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const syncId = params.id;
  if (!syncId) {
    return NextResponse.json({ error: '缺少 syncId 参数' }, { status: 400 });
  }

  try {
    const { html, markdown } = await req.json();
    const item: PreviewItem = {
      html: html || '',
      markdown: markdown || '',
      updatedAt: Date.now(),
    };

    previewStore.set(syncId, item);

    // 自动清理超过 1 小时的历史冗余预览
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    for (const [key, val] of previewStore.entries()) {
      if (val.updatedAt < oneHourAgo) {
        previewStore.delete(key);
      }
    }

    return NextResponse.json({ success: true, syncId, updatedAt: item.updatedAt });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || '保存预览失败' }, { status: 500 });
  }
}

/**
 * DELETE /api/preview/[id]
 * 网页关闭或注销时及时清除 previewStore 中的缓存，避免冗余
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const syncId = params.id;
  if (syncId && previewStore.has(syncId)) {
    previewStore.delete(syncId);
  }
  return NextResponse.json({ success: true, message: '预览数据已及时释放清除' });
}
