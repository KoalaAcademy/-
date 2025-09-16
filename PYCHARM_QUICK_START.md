# PyCharm 快速啟動指南

## 🚀 一鍵啟動步驟

### 1. 開啟專案
- 在 PyCharm 中開啟此專案資料夾
- PyCharm 會自動識別為 Flask + Next.js 專案

### 2. 設定 Python 解釋器
- File → Settings → Project → Python Interpreter
- 選擇 Python 3.12 虛擬環境 (.venv)
- 如果沒有虛擬環境，PyCharm 會提示建立

### 3. 安裝依賴
\`\`\`bash
# 後端依賴 (PyCharm 會自動提示)
pip install -r backend/requirements.txt

# 前端依賴
npm install
\`\`\`

### 4. 設定環境變數
- 複製 `.env.example` 為 `.env`
- 填入必要的環境變數值

### 5. 一鍵啟動
在 PyCharm 右上角選擇運行配置：
- **Flask Backend** - 只啟動後端 API
- **Next.js Frontend** - 只啟動前端
- **Full Stack Development** - 同時啟動前後端

## 🔧 PyCharm 特色功能

### 自動完成和除錯
- Flask 路由自動完成
- SQLAlchemy 模型智能提示
- 內建除錯器支援

### 資料庫工具
- 內建 SQLite 瀏覽器
- SQL 查詢執行
- 資料庫結構視覺化

### 版本控制
- Git 整合
- 變更追蹤
- 分支管理

## 📁 專案結構說明
\`\`\`
├── backend/           # Flask 後端
│   ├── app.py        # 主應用程式
│   ├── models.py     # 資料庫模型
│   └── requirements.txt
├── components/        # React 組件
├── app/              # Next.js 頁面
├── .idea/            # PyCharm 配置
└── .env              # 環境變數
\`\`\`

## 🎯 常用快捷鍵
- `Ctrl+Shift+F10` - 執行當前檔案
- `Shift+F9` - 除錯模式
- `Ctrl+Shift+R` - 重新啟動服務
- `Alt+F12` - 開啟終端機

現在您可以在 PyCharm 中無縫開發這個全端專案！
