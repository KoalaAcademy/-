# 個人職能動態分析與學習輔助系統 - 開發指南

## 專案概述
這是一個基於React和TypeScript開發的響應式網頁應用程式，旨在幫助使用者進行職能分析、職缺比對、學習進度追蹤和技能發展規劃。

## 技術棧
- **前端框架**: React 18+ with TypeScript
- **樣式框架**: Tailwind CSS v4.0
- **圖示庫**: Lucide React
- **圖表庫**: Recharts
- **開發工具**: Vite 或 Create React App
- **代碼品質**: ESLint + Prettier

## 專案結構
\`\`\`
├── src/
│   ├── components/          # 元件資料夾
│   │   ├── ui/             # 基礎UI元件 (ShadCN)
│   │   ├── AIConsultationPage.tsx
│   │   ├── JobMatchingPage.tsx
│   │   ├── GrowthDashboard.tsx
│   │   ├── LearningPage.tsx
│   │   ├── LearningRecordPage.tsx
│   │   └── ProfilePage.tsx
│   ├── assets/             # 靜態資源
│   │   ├── images/
│   │   └── icons/
│   ├── styles/            # 樣式檔案
│   │   └── globals.css
│   ├── utils/             # 工具函數
│   ├── types/             # TypeScript 型別定義
│   ├── App.tsx            # 主應用程式元件
│   └── main.tsx          # 應用程式入口點
├── public/               # 公開資源
├── package.json
└── README.md
\`\`\`

## 圖片資源對應表
所有圖片已轉換為可公開存取的URL：

### 主要圖示和LOGO
- **網站LOGO**: `https://res.cloudinary.com/dhcrtfirv/image/upload/v1755599991/LOGO_ptjzjy.png`
- **學員大頭照**: `https://res.cloudinary.com/dhcrtfirv/image/upload/v1755606141/%E9%A0%90%E8%A8%AD%E5%AD%B8%E5%93%A1%E5%A4%A7%E9%A0%AD%E7%85%A7_kwf8m3.png`
- **考拉助教**: `https://res.cloudinary.com/dhcrtfirv/image/upload/v1755603939/%E7%84%A1%E5%B0%BE%E7%86%8A%E5%8A%A9%E7%90%86_1_y7xshi.png`

### 平台圖示
- **YouTube**: Base64 編碼資料 (見程式碼)
- **Hahow**: Base64 編碼資料 (見程式碼)
- **Udemy**: `https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_200_200/company-logo_200_200/0/1723593046388/udemy_logo`

### 功能按鈕和UI元素
- **上傳按鈕**: `https://png.pngtree.com/png-clipart/20190921/original/pngtree-file-upload-icon-png-image_4718142.jpg`
- **定期通知按鈕**: `https://res.cloudinary.com/dhcrtfirv/image/upload/v1755609328/%E5%AE%9A%E6%9C%9F%E9%80%9A%E7%9F%A5%E5%AD%B8%E7%BF%92%E6%8C%89%E9%88%95_oxjnve.png`
- **發送訊息按鈕**: `https://res.cloudinary.com/dhcrtfirv/image/upload/v1755616702/SendMessageButton_zjk9bc.png`
- **上傳框外部**: `https://res.cloudinary.com/dhcrtfirv/image/upload/v1755608474/upload_outside_div_yd1clf.png`
- **上傳框內部**: `https://res.cloudinary.com/dhcrtfirv/image/upload/v1755608482/upload_inside_div_dnexse.png`

### 預設背景和佔位圖
- **白色背景**: `https://img.freepik.com/premium-photo/white-background-with-pattern-lines-drawn-it_206192-660.jpg`
- **課程封面**: `https://i.ytimg.com/vi/zdMUJJKFdsU/maxresdefault.jpg`

## 主要功能模組

### 1. AI 職能諮詢頁面 (AIConsultationPage)
- 使用者與AI助教對話
- 動態收集使用者資訊
- 檔案上傳功能
- 響應式聊天介面

### 2. 職缺比對頁面 (JobMatchingPage)
- 動態技能雷達圖
- 職業發展路徑視覺化
- 學習地圖規劃
- 三個主要標籤：職缺比對、潛在發展路徑、學習地圖

### 3. 成長儀錶板 (GrowthDashboard)
- 學習進度追蹤
- 技能發展統計
- 成就系統
- 進度視覺化圖表

### 4. 學習頁面 (LearningPage)
- 三大平台整合：YouTube、Hahow、Udemy
- 課程分類和搜尋
- 課程評分系統
- 平台切換功能

### 5. 學習記錄頁面 (LearningRecordPage)
- **YouTube**: 嵌入式影片播放器，自動追蹤觀看時長
- **Hahow/Udemy**: 手動勾選學習進度的付費課程模式
- 筆記功能
- 定期通知設定
- 檔案上傳功能

### 6. 個人資料頁面 (ProfilePage)
- 使用者基本資訊編輯
- 技能標籤管理
- 學習偏好設定

## 響應式設計規範

### 斷點設置
\`\`\`css
/* 手機版 */
@media (max-width: 768px) { ... }

/* 平板版 */
@media (min-width: 769px) and (max-width: 1024px) { ... }

/* 桌面版 */
@media (min-width: 1025px) { ... }
\`\`\`

### 行動裝置適配
- **導航**: 手機版使用漢堡選單 (左側滑出式)
- **圖片**: 使用 `object-cover` 和響應式寬高
- **文字**: 使用 `text-sm lg:text-base` 等響應式字體大小
- **間距**: 使用 `p-4 lg:p-6` 等響應式內距

## 動畫效果

### 技能雷達圖動畫
\`\`\`javascript
// 階段式動畫效果
1. 網格圓圈逐漸擴展 (0.5s 後開始)
2. 軸線逐步延伸 (1s 後開始)
3. 需求技能區域填充 (1.5s 後開始)
4. 當前技能區域填充 (2s 後開始)
5. 技能標籤淡入 (2.2s 後開始)
6. 中心點脈衝效果 (持續)
\`\`\`

### 過渡效果
- 頁面切換: `transition-all duration-300`
- 按鈕懸停: `hover:bg-blue-600 transition-colors`
- 模態框: `transform transition-transform duration-300 ease-in-out`

## 狀態管理
使用 React Hooks 進行本地狀態管理：

\`\`\`typescript
interface UserProfile {
  name: string;
  education: string;
  skills: string[];
  experience: string[];
}

interface PageState {
  currentPage: PageType;
  selectedPlatform: Platform;
  isMobileMenuOpen: boolean;
}
\`\`\`

## 顏色系統
\`\`\`css
:root {
  --primary-bg: #eefaff;      /* 主背景色 */
  --accent-blue: #1e9fa9;     /* 主題藍色 */
  --button-blue: #05c6d5;     /* 按鈕藍色 */
  --success-green: #00B11B;   /* 成功綠色 */
  --highlight-yellow: #FFF1AB; /* 高亮黃色 */
}
\`\`\`

## 開發指引

### 環境設置
1. **Node.js**: 建議 v18 或以上版本
2. **套件管理**: 使用 npm 或 yarn
3. **開發伺服器**: Vite 或 Webpack Dev Server

### 安裝依賴
\`\`\`bash
npm install react@18 react-dom@18 typescript
npm install tailwindcss@4.0 @tailwindcss/typography
npm install lucide-react recharts
npm install @types/react @types/react-dom
\`\`\`

### 開發命令
\`\`\`bash
# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 型別檢查
npm run type-check

# 程式碼格式化
npm run format
\`\`\`

### 程式碼規範
1. **元件命名**: 使用 PascalCase (ex: `UserProfile`)
2. **檔案命名**: 使用 PascalCase for components, camelCase for utilities
3. **CSS 類別**: 遵循 Tailwind CSS 約定
4. **TypeScript**: 強制型別檢查，避免 `any` 類型

### 效能最佳化
1. **圖片懶載入**: 使用 `loading="lazy"` 屬性
2. **程式碼分割**: 使用 React.lazy() 和 Suspense
3. **記憶化**: 適當使用 React.memo() 和 useMemo()
4. **Bundle 分析**: 定期檢查打包大小

## 部署建議

### 生產環境
1. **靜態託管**: Vercel, Netlify, GitHub Pages
2. **CDN**: 圖片和靜態資源使用 CDN
3. **環境變數**: 使用 `.env` 檔案管理設定
4. **錯誤監控**: 整合 Sentry 或類似服務

### SEO 優化
1. **Meta 標籤**: 設置適當的 title 和 description
2. **結構化數據**: 添加 Schema.org 標記
3. **無障礙設計**: 遵循 WCAG 2.1 AA 標準
4. **效能指標**: 優化 Core Web Vitals

## 測試策略
\`\`\`javascript
// 元件測試範例
import { render, screen } from '@testing-library/react';
import { AIConsultationPage } from './components/AIConsultationPage';

test('renders AI consultation interface', () => {
  render(<AIConsultationPage />);
  expect(screen.getByText('考拉助教')).toBeInTheDocument();
});
\`\`\`

## 未來功能擴展
1. **後端整合**: 串接 API 進行真實數據處理
2. **使用者認證**: 實現登入登出功能
3. **資料持久化**: 使用 localStorage 或資料庫
4. **多語言支援**: i18n 國際化
5. **PWA 功能**: 離線使用支援
6. **即時通知**: WebSocket 或 Server-Sent Events

## 維護和更新
- **依賴更新**: 定期更新套件版本
- **安全性掃描**: 使用 npm audit 檢查漏洞
- **效能監控**: 持續追蹤應用效能指標
- **使用者反饋**: 收集並回應使用者意見

---

**注意事項**: 
- 所有圖片URL需確保長期可存取性
- 在生產環境前務必測試所有響應式斷點
- 建議使用 TypeScript 嚴格模式以提高程式碼品質
- 定期備份重要的設計資產和程式碼
