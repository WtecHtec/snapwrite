/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
    // 确保 Vercel Serverless Function 构建打包追踪包含 stylemd 目录
    outputFileTracingIncludes: {
      '/api/**/*': ['./stylemd/**/*'],
    },
  },
};

module.exports = nextConfig;
