/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Apple 风格与微信调色盘
        apple: {
          bg: '#F5F5F7',
          card: 'rgba(255, 255, 255, 0.72)',
          darkBg: '#000000',
          darkCard: 'rgba(28, 28, 30, 0.75)',
          blue: '#0071E3',
          gray: '#86868B',
        },
        wechat: {
          green: '#07C160',
          hover: '#06AD56',
          lightBg: '#F7F7F7',
        },
        // 6 套主题主色
        theme: {
          moyu: '#059669',     // 摸鱼绿
          red: '#DC2626',      // 红白
          graphite: '#52525B', // 石墨极简
          zen: '#4A5D52',      // 留白禅意
          ticket: '#059669',   // 摸鱼票据
          olive: '#1E1F23',    // 橄榄手记
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 16px 40px rgba(0, 0, 0, 0.12)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backdropBlur: {
        'apple': '20px',
      }
    },
  },
  plugins: [],
};
