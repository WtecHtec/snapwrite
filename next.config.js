/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // 使用 Webpack Native Asset Modules (asset/source) 将 .md 文件以纯文本形式静态编译打包进内存 Bundle 中
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = nextConfig;
