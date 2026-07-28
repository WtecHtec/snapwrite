import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://snapwrite.wtechtec.com'),
  title: 'SnapWrite — 微信公众号 AI 高级图文排版工具',
  description: '把文章文字转化为极具视效力的公众号排版。内置 6 大大师级视觉主题、首屏 SMIL 矢量开场动画、1:1 移动端高保真渲染预览与 1 秒复制。',
  keywords: [
    '微信公众号排版',
    '公众号AI排版',
    '微信文章排版工具',
    'SnapWrite',
    '公众号图文美化',
    'SMIL矢量动画排版',
    '微信编辑器模版',
  ],
  authors: [{ name: 'SnapWrite Team' }],
  icons: {
    icon: '/vite.svg',
    shortcut: '/vite.svg',
    apple: '/vite.svg',
  },
  openGraph: {
    title: 'SnapWrite — 微信公众号 AI 高级图文排版工具',
    description: '把文章文字转化为极具视效力的公众号排版。内置 6 大大师级视觉主题、首屏 SMIL 矢量开场动画、1:1 移动端高保真渲染预览。',
    url: 'https://snapwrite.wtechtec.com',
    siteName: 'SnapWrite',
    images: [
      {
        url: '/vite.svg',
        width: 512,
        height: 512,
        alt: 'SnapWrite Logo',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapWrite — 微信公众号 AI 高级图文排版工具',
    description: '把文章文字转化为极具视效力的公众号排版。内置 6 大大师级视觉主题与首屏 SMIL 矢量开场动画。',
    images: ['/vite.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Analytics GA4 (G-EMFHKZRC90) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EMFHKZRC90"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EMFHKZRC90');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-[#F5F5F7] dark:bg-black text-zinc-900 dark:text-zinc-100 antialiased selection:bg-wechat-green selection:text-white">
        {children}
      </body>
    </html>
  );
}
