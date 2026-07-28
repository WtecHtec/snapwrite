/**
 * @file components/features/LandingPage.tsx
 * @description Apple 风格高质感 SnapWrite 产品 Landing Page（带打字排版循环动效与 GitHub 参考链接）
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { HeroAnimationShowcase } from './HeroAnimationShowcase';
import { Sparkles, Palette, Zap, Smartphone, Copy, CheckCircle, ArrowRight, ShieldCheck, Github, ExternalLink } from 'lucide-react';
import { GZH_THEMES } from '@/domain/formatter/GZHThemeIndex';
import { ThemeId } from '@/domain/formatter/types';

export interface LandingPageProps {
  onStartEditing: (selectedThemeId?: ThemeId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartEditing }) => {
  const themeList = Object.values(GZH_THEMES);

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      {/* 1. Hero 核心展示首屏 */}
      <section className="w-full max-w-6xl px-4 pt-12 pb-12 md:pt-16 md:pb-20 flex flex-col items-center text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-wechat-green text-xs font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>SnapWrite — 专为微信公众号打造的 AI 排版神器</span>
        </motion.div>

        {/* 核心 Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15] text-zinc-900 dark:text-white"
        >
          把 <span className="bg-gradient-to-r from-wechat-green via-emerald-500 to-teal-500 bg-clip-text text-transparent">文字</span> 转化为极具视效力的公众号排版
        </motion.h1>

        {/* 核心 Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl font-normal leading-relaxed"
        >
          输入任意文章文字，内置 6 大大师级主题风格、智能首屏 SMIL 矢量开场动画、1:1 移动端高保真预览，一键复制即刻粘贴发布。
        </motion.p>

        {/* 核心 CTA Button 组 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-wechat-green hover:bg-emerald-600 text-white shadow-apple-md font-semibold px-8 py-3.5 text-base rounded-2xl flex items-center gap-2 transition-all hover:scale-105"
            onClick={() => onStartEditing('moyu-green')}
          >
            <span>立即开始排版</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <a
            href="#themes-section"
            className="px-6 py-3.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow transition-all"
          >
            探索 6 大主题预设 👇
          </a>
        </motion.div>

        {/* 动态打字与 AI 自动排版 Live Showcase 组件 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full flex justify-center mt-4"
        >
          <HeroAnimationShowcase />
        </motion.div>

        {/* 平台兼容背书 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-wechat-green" />
            <span>微信公众号编辑器 100% 格式兼容</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-wechat-green" />
            <span>内联 CSS 安全渲染，零样式剥离</span>
          </div>
        </div>
      </section>

      {/* 2. 核心特性矩阵 (Feature Cards Grid) */}
      <section className="w-full max-w-6xl px-4 py-12 border-t border-gray-200/60 dark:border-zinc-800">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">为什么选择 SnapWrite？</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">告别繁重易错的传统排版编辑器，享受任意文章文字与 AI 的流畅交互</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/70 dark:border-zinc-800 shadow-apple-sm flex flex-col items-start hover:shadow-apple-md transition-all hover:-translate-y-1">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-wechat-green mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">首屏 SMIL 矢量动画</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              内置墨韵晕染、打字机流、画卷展开等 5 大首屏 SMIL 矢量开场动画，由 LLM 大模型智能判断并优雅嵌入。
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/70 dark:border-zinc-800 shadow-apple-sm flex flex-col items-start hover:shadow-apple-md transition-all hover:-translate-y-1">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-500 mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">6 大大师级主题调色</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              摸鱼绿、红白色系、石墨极简、留白禅意、摸鱼票据、橄榄手记。每一套都经过严苛调色与层级打磨。
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/70 dark:border-zinc-800 shadow-apple-sm flex flex-col items-start hover:shadow-apple-md transition-all hover:-translate-y-1">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-500 mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">1:1 移动端真实渲染</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              内置 375px iPhone 高保真模拟器，文本防横向溢出自动换行，智能保持用户阅读滚动位置。
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/70 dark:border-zinc-800 shadow-apple-sm flex flex-col items-start hover:shadow-apple-md transition-all hover:-translate-y-1">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 mb-4">
              <Copy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">1 秒富文本复制粘贴</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              无缝将渲染产物一键复制到剪贴板，直接粘贴至微信公众号后台，全套内联 CSS 零样式丢失。
            </p>
          </div>
        </div>
      </section>

      {/* 3. 6 大主题画廊 (Interactive Themes Gallery Section) */}
      <section id="themes-section" className="w-full max-w-6xl px-4 py-16 border-t border-gray-200/60 dark:border-zinc-800">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">6 大精选排版主题</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">点击任意主题，即可直接使用该风格开始排版</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themeList.map((t) => (
            <div
              key={t.id}
              onClick={() => onStartEditing(t.id)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 p-5 shadow-sm hover:shadow-apple-md hover:border-wechat-green transition-all flex flex-col justify-between hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: t.primaryColor }}
                    />
                    {t.name}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 group-hover:text-wechat-green transition-colors">
                    使用此主题 →
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {t.description}
                </p>
              </div>

              {/* 色卡小标识 */}
              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>主色调</span>
                <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {t.primaryColor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 参考开源项目 & 参考链接 (References Section) */}
      <section className="w-full max-w-6xl px-4 py-12 border-t border-gray-200/60 dark:border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
            <Github className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
            <span>开源参考与致谢项目</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">感谢以下优质开源项目与设计社区的灵感启发</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://github.com/WtecHtec/snapwrite"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 hover:border-wechat-green shadow-sm hover:shadow transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:text-wechat-green transition-colors">
                <Github className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-wechat-green transition-colors">WtecHtec/snapwrite</p>
                <p className="text-[11px] text-zinc-400">SnapWrite 官方 GitHub 仓库</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-wechat-green transition-colors" />
          </a>

          <a
            href="https://github.com/isjiamu/gzh-design-skill"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 hover:border-wechat-green shadow-sm hover:shadow transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:text-wechat-green transition-colors">
                <Github className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-wechat-green transition-colors">isjiamu/gzh-design-skill</p>
                <p className="text-[11px] text-zinc-400">微信公众号设计 Skill 灵感</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-wechat-green transition-colors" />
          </a>

          <a
            href="https://github.com/zjp1997720/zhijian-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 hover:border-wechat-green shadow-sm hover:shadow transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:text-wechat-green transition-colors">
                <Github className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-wechat-green transition-colors">zjp1997720/zhijian-skills</p>
                <p className="text-[11px] text-zinc-400">智见 AI 排版 Skill 灵感</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-wechat-green transition-colors" />
          </a>
        </div>
      </section>

      {/* 5. Bottom Call To Action */}
      <section className="w-full bg-gradient-to-r from-emerald-600 to-wechat-green text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            准备好开始高效排版了吗？
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-100 max-w-xl">
            无需繁琐配置，贴入文章文字即可享受 AI 级专业公众号美学排版。
          </p>
          <Button
            size="lg"
            className="mt-8 bg-white text-emerald-900 hover:bg-emerald-50 shadow-apple-lg font-bold px-8 py-3.5 rounded-2xl transition-all hover:scale-105"
            onClick={() => onStartEditing('moyu-green')}
          >
            免费体验 SnapWrite 排版 🚀
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-xs text-zinc-400 border-t border-gray-200/50 dark:border-zinc-800">
        <p>© 2026 SnapWrite. 微信公众号 AI 高效排版系统.</p>
      </footer>
    </div>
  );
};
