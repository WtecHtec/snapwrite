# SnapWrite - 微信公众号 AI 自动排版工具
 
![SnapWrite Banner](./image.png) 

SnapWrite 是一个基于 AI 的智能排版工具，专为微信公众号内容创作者设计。它能将普通文本一键转化为适配移动端阅读的精美 HTML 布局，让排版变得简单、高效、优雅。

## ✨ 核心功能 (Features)

- **🤖 AI 智能排版**: 一键将纯文本转换为结构清晰、样式精美的公众号图文。
- **📱 移动端所见即所得 (WYSIWYG)**: 内置高保真 iPhone 预览模型，实时查看手机端显示效果。
- **⚡️ 流式生成体验**: 模拟 AI 打字机效果，实时预览生成过程。
- **📝 双模编辑**: 
    - **极简模式**: 专注内容预览。
    - **虽然编辑模式**: 左侧源码、中间预览、右侧折叠面板的三栏高效布局。
- **📋 富文本复制**: 支持一键复制渲染后的富文本 (Rich Text)，直接粘贴至微信公众号后台或 Word 文档，保留所有样式。
- **⏱️ 版本管理**: 自动保存历次排版记录，支持随时回溯和切换版本。

## 🛠️ 技术栈 (Tech Stack)

- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/)
- **UI Framework**: Vanilla CSS (Variables & Flexbox/Grid), [Lucide React](https://lucide.dev/) (Icons)
- **Notification**: [Sonner](https://sonner.emilkowal.ski/)
- **Routing**: [React Router](https://reactrouter.com/)

## 🚀 快速开始 (Getting Started)

### 1. 克隆项目
```bash
git clone https://github.com/wtechtec/SnapWrite.git
cd SnapWrite
```

### 2. 安装依赖
```bash
npm install
# or
yarn install
```

### 3. 配置环境变量
在项目根目录创建 `.env` 文件，并配置 API 地址：

```env
VITE_API_URL=http://localhost:3000
```
> 注意：API 需要支持 `/api/snapwrite` 的 POST 请求，返回 JSON 格式数据。

### 4. 启动开发服务器
```bash
npm run dev
```
访问 `http://localhost:5173` 即可开始使用。

## 🤝 贡献 (Contributing)

欢迎提交 Issue 或 Pull Request！如果您有好的建议或想法，请随时告知。

## ☕️ 打赏 (Sponsor)

如果 SnapWrite 对您的工作有帮助，欢迎请作者喝一杯咖啡 ☕️，您的支持是我们持续更新的动力！

| 微信支付 | 支付宝 |
| :---: | :---: |
| <img src="./wx.png" alt="微信支付" width="200" /> | <img src="./zfb.png" alt="支付宝" width="200" /> |


## 📄 License

MIT License © 2026 SnapWrite

## 获取免费AI 点数可点击 [10万点](https://www.zaiwenai.com?channel-code=695b4120ff8fe129b816fc38)
