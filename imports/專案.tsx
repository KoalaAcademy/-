// ===== 專案配置檔案 =====

// package.json
export const packageJson = {
  "name": "career-analysis-system",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0",
    "recharts": "^2.8.0",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
};

// vite.config.ts
export const viteConfig = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'recharts']
        }
      }
    }
  }
})
`;

// tsconfig.json
export const tsConfig = {
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
};

// tailwind.config.js
export const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#eefaff',
        'accent-blue': '#1e9fa9',
        'button-blue': '#05c6d5',
        'success-green': '#00B11B',
        'highlight-yellow': '#FFF1AB',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
`;

// .env 範例
export const envExample = `
# 應用程式設定
VITE_APP_TITLE=個人職能動態分析與學習輔助系統
VITE_APP_VERSION=1.0.0

# API 設定 (如果需要)
VITE_API_BASE_URL=https://api.example.com
VITE_API_KEY=your_api_key_here

# 分析工具 (如果需要)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
`;

// README.md
export const readmeContent = `
# 個人職能動態分析與學習輔助系統

一個基於 React + TypeScript + Tailwind CSS 開發的響應式職能分析平台。

## 🚀 快速開始

### 環境要求
- Node.js 18+ 
- npm 或 yarn

### 安裝依賴
\`\`\`bash
npm install
\`\`\`

### 開發模式
\`\`\`bash
npm run dev
\`\`\`

### 建構生產版本
\`\`\`bash
npm run build
\`\`\`

## 📁 專案結構
\`\`\`
src/
├── components/          # React 元件
│   ├── ui/             # 基礎 UI 元件
│   ├── AIConsultationPage.tsx
│   ├── JobMatchingPage.tsx
│   ├── GrowthDashboard.tsx
│   ├── LearningPage.tsx
│   ├── LearningRecordPage.tsx
│   └── ProfilePage.tsx
├── assets/             # 靜態資源
├── styles/             # 樣式檔案
├── utils/              # 工具函數
├── types/              # TypeScript 型別
├── App.tsx            # 主應用元件
└── main.tsx           # 入口點
\`\`\`

## 🎯 主要功能
- ✅ AI 職能諮詢對話
- ✅ 動態技能雷達圖分析
- ✅ 職業發展路徑規劃
- ✅ 多平台學習整合 (YouTube, Hahow, Udemy)
- ✅ 學習進度追蹤
- ✅ 響應式設計 (支援手機、平板、桌面)
- ✅ 檔案上傳功能
- ✅ 定期通知設定

## 🛠️ 技術棧
- React 18 + TypeScript
- Tailwind CSS v4
- Vite
- Lucide React (圖示)
- Recharts (圖表)
- ESLint + Prettier

## 📱 響應式設計
- 手機版：漢堡選單導航
- 平板版：優化的觸控體驗  
- 桌面版：完整功能介面

## 🎨 設計特色
- 現代化扁平設計
- 流暢的動畫效果
- 無障礙設計支援
- 深色/淺色主題切換

## 📈 效能優化
- 程式碼分割
- 圖片懶載入
- React.memo 和 useMemo 最佳化
- Vite 快速建構

## 🚢 部署建議
- Vercel (推薦)
- Netlify
- GitHub Pages
- 任何支援靜態檔案的伺服器

## 📝 授權
MIT License
`;

// ESLint 設定
export const eslintConfig = `
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
`;

// Prettier 設定
export const prettierConfig = {
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
};

// index.html 模板
export const indexHtml = `
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="個人職能動態分析與學習輔助系統" />
    <meta name="keywords" content="職能分析,學習輔助,技能發展,職業規劃" />
    <title>個人職能動態分析系統</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

// main.tsx 入口檔案
export const mainTsx = `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;

// 型別定義檔案
export const types = `
// src/types/index.ts
export type PageType = 'consultation' | 'jobMatching' | 'dashboard' | 'learning' | 'profile' | 'learningRecord';
export type Platform = 'youtube' | 'hahow' | 'udemy';

export interface UserProfile {
  name: string;
  education: string;
  skills: string[];
  experience: string[];
}

export interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export interface JobRequirement {
  skill: string;
  required: number;
  current: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  progress: number;
}

export interface NotificationSettings {
  enabled: boolean;
  email: string;
  times: string[];
}
`;

// 工具函數
export const utils = `
// src/utils/index.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return \`\${minutes}:\${remainingSeconds.toString().padStart(2, '0')}\`;
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};
`;

// 常數定義
export const constants = `
// src/constants/index.ts

// 圖片資源 URLs
export const IMAGES = {
  LOGO: "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755599991/LOGO_ptjzjy.png",
  USER_AVATAR: "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755606141/%E9%A0%90%E8%A8%AD%E5%AD%B8%E5%93%A1%E5%A4%A7%E9%A0%AD%E7%85%A7_kwf8m3.png",
  AI_ASSISTANT: "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755603939/%E7%84%A1%E5%B0%BE%E7%86%8A%E5%8A%A9%E7%90%86_1_y7xshi.png",
  NOTIFICATION_BUTTON: "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755609328/%E5%AE%9A%E6%9C%9F%E9%80%9A%E7%9F%A5%E5%AD%B8%E7%BF%92%E6%8C%89%E9%88%95_oxjnve.png",
  SEND_BUTTON: "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755616702/SendMessageButton_zjk9bc.png",
  WHITE_BG: "https://img.freepik.com/premium-photo/white-background-with-pattern-lines-drawn-it_206192-660.jpg",
  COURSE_COVER: "https://i.ytimg.com/vi/zdMUJJKFdsU/maxresdefault.jpg"
};

// 平台圖示
export const PLATFORM_ICONS = {
  YOUTUBE: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0QDQ0NDxAPDg0ODQ4ODxAPDQ8ODw4QFREXFhUSExUYHS0iGBolGxMTIjEhJSkrLi46Fx8/PzMsOCgtOisBCgoKDg0OGhAQGTUmICUtLy8tLS0yLS8vLS01Ly0vKy0uLS0tKy0tKy0vLS0tLS0vLS0tLSstLS0tLS0tKy0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwEDBAUGCAL/xABHEAACAgEBAggFDgYJAAAAAAAAAQIDBBEFBwYSITFBUWFxcoGRscHCExQiIzJCUlN2aGi0dIni0tIlNVRigoOyJDNDY2Rzk6Pi/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAEFAgQGAwf/xAA5EQEAAQMBAggNBAIDAAAAAAAAAQIDBBEGUQUSFCExQZGhFCIzNFJTYXGBscHR4SMyQnJighDB8f/aAAwDAQACEQMRAD8AnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z',
  HAHOW: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8FraIA0bQAqJxUvrXB6eYA0bPc+PQAzq8Ap5v6/v4Azq5bw7vW8O7o9/Z+zsjv/PqQ59ia6dw3176/8enP9e+i29ex39tuyMHh9PKH0csRsaaZ2NMptKqz4t85uK/N7Oq07+VR3Mdw4c4/2MBr4c258Oaq7OF749PW9/F+7myVAAADaklEQVR4nO3caXuiMBSG4ZK0GBAVRUetO1rr/P8/OKaOXSyrJTmH9H2+u9zXCViW8vCAEEIIIYQQQgghhBBCCCGEEEIIIYQQy3rTkPorGK0XBcGM+ksYrBdJz/Meqb+GsS4+d4Xz/z5XhfPZ1eemsD+QH0AHhfHA++RzT/h1fu4J+zfzc00YP3/3uSQMM33uCMNlts8VYbhc5PjcEBb5XBDmr083hOG0aH4OCKerEl/LhetNqa/VwnXZ+my5sNL8Wiys7Gup8Km6r5XC7Sao7mujcFZjfq0U9moNsI3Cp5ojhJBfEELIPwgh5B+EEPIPQgj5ByGE/IMwX7hLknQ/fJ3ElF+/QvcLhS98XynVFelwzJj5A+E17RTpqEPJKKgB4SXlJyOWk2xMqJEqnVBasmtSeF6w3cOYUpNVs0I9SG7GxoVnY8pqezQgFL4aUZJuMiHUS7VPifqSGeH5rwE2W6MhIaOVakooRPdE6frInFCoPSXsPYNCoV4oZddMCnkQjQqFGlLaLpkVCnWkxL1lWOgL8sNGw0LhHyh1OtNC+k3RuFAo4nVqXuinlD4bQur9qQWhoN3Z2BDSDtGGUCTOCxXl4bAVIenu1IpQ+IS/iXaElKc07AgpfzAsCf2560LCZWprhnR7U0tCIcie+mJLqMiuLFoTkm2ItoR0G6I1oXBdKBTVZVN7QqpdjT3hznkh1VlFa0Kf6iqNNSHZ4YU9IdUZRQghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEII7xPK6PrKxHdSKDfvVx8mQtUytkIoF+tPLw1faxlbIJSr9e2r6xjZC+VmmvHycCSUG8Lz/HJunwyHFY2shdL7U/AW8VBVWauMhcU+nZ5jqZGtUC6WFW7vjcvXKlOh9Kr4dPGpxMhSWN2n658KlypDYT2frrMvmCM7ofSe73jGTGefO0dmQilndz5DJ9fISyi9e326/kumkZFQeoMfPgPpb5aRj1AOGrg9a5J+M3IRyqihZ1hNDjdGHkI5a/D2ups5chDKaNvsm5+NnIRB1Gv+7ccHxUUoTfh040RxEBrz6XYXI6UweNya/ZDjm5FIGMtgtTX/Mcekm5D9FylCCCGEEEIIIYQQQgghhBBCCCGEEEIu9Q9EWVKU8SsuOAAAAABJRU5ErkJggg==',
  UDEMY: 'https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_200_200/company-logo_200_200/0/1723593046388/udemy_logo'
};

// 應用程式設定
export const APP_CONFIG = {
  TITLE: '個人職能動態分析與學習輔助系統',
  VERSION: '1.0.0',
  AUTHOR: 'Development Team',
  SUPPORT_EMAIL: 'support@example.com'
};

// 動畫持續時間 (毫秒)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  RADAR_CHART: 2000
};
`;

console.log('✅ 已成功轉換所有檔案為 VSCode 兼容格式');
console.log('📁 專案結構已準備完成');
console.log('🚀 可以直接在任何支援 React + TypeScript 的開發環境中執行');
