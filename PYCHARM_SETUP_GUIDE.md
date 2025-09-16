# 在 PyCharm 中執行職業發展學習平台專案

## 📋 前置需求

### 必要軟體
- **PyCharm Professional** (推薦) 或 PyCharm Community
- **Python 3.8+**
- **Node.js 18+** 和 **npm**
- **PostgreSQL** 或 **SQLite** (開發用)

## 🚀 專案設置步驟

### 第一步：開啟專案
1. 啟動 PyCharm
2. 選擇 `File` → `Open`
3. 選擇專案根目錄
4. PyCharm 會自動偵測到這是一個混合專案 (Python + JavaScript)

### 第二步：設置 Python 後端

#### 1. 建立虛擬環境
\`\`\`bash
# 在 PyCharm Terminal 中執行
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
\`\`\`

#### 2. 安裝 Python 依賴
\`\`\`bash
pip install -r requirements.txt
\`\`\`

#### 3. 配置 PyCharm Python 解釋器
- 前往 `File` → `Settings` → `Project` → `Python Interpreter`
- 點擊齒輪圖示 → `Add`
- 選擇 `Existing environment`
- 選擇 `backend/venv/bin/python` (或 Windows 的 `backend/venv/Scripts/python.exe`)

### 第三步：設置資料庫

#### 選項 A：使用 SQLite (簡單開發)
\`\`\`bash
# 在 backend 目錄中
python -c "
from app import app, db
with app.app_context():
    db.create_all()
    print('資料庫建立成功!')
"
\`\`\`

#### 選項 B：使用 PostgreSQL (生產環境)
1. 安裝 PostgreSQL
2. 建立資料庫：
\`\`\`sql
CREATE DATABASE career_platform;
CREATE USER career_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE career_platform TO career_user;
\`\`\`

3. 更新 `backend/config.py` 中的資料庫連接字串

### 第四步：設置環境變數

#### 在 PyCharm 中設置環境變數
1. 前往 `Run` → `Edit Configurations`
2. 選擇或建立 Flask 配置
3. 在 `Environment variables` 中添加：

\`\`\`
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///career_platform.db
JWT_SECRET_KEY=your-jwt-secret-here
\`\`\`

### 第五步：設置前端 (Next.js)

#### 1. 安裝 Node.js 依賴
\`\`\`bash
# 在專案根目錄
npm install
\`\`\`

#### 2. 設置前端環境變數
建立 `.env.local` 檔案：
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

## 🏃‍♂️ 執行專案

### 方法一：在 PyCharm 中執行

#### 1. 設置 Flask 執行配置
- 前往 `Run` → `Edit Configurations`
- 點擊 `+` → `Flask Server`
- 設置：
  - **Name**: `Flask Backend`
  - **Target type**: `Script path`
  - **Target**: `backend/app.py`
  - **Working directory**: `backend`
  - **Environment variables**: (如上所述)

#### 2. 設置 Next.js 執行配置
- 點擊 `+` → `npm`
- 設置：
  - **Name**: `Next.js Frontend`
  - **Command**: `run`
  - **Scripts**: `dev`
  - **Working directory**: 專案根目錄

#### 3. 執行服務
1. 先執行 Flask Backend (點擊綠色播放按鈕)
2. 再執行 Next.js Frontend
3. 前端會在 `http://localhost:3000` 啟動
4. 後端會在 `http://localhost:5000` 啟動

### 方法二：使用終端機

#### 終端機 1 - 後端
\`\`\`bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python app.py
\`\`\`

#### 終端機 2 - 前端
\`\`\`bash
npm run dev
\`\`\`

## 🔧 PyCharm 專案配置建議

### 1. 設置專案結構
在 PyCharm 中標記資料夾：
- `backend` → Sources Root
- `components` → Sources Root
- `backend/venv` → Excluded

### 2. 安裝有用的插件
- **JavaScript and TypeScript** (內建)
- **Database Tools and SQL** (Professional 版內建)
- **Docker** (如果使用 Docker)

### 3. 設置程式碼格式化
- Python: 使用 Black 或 autopep8
- JavaScript/TypeScript: 使用 Prettier

## 🐛 除錯設置

### Flask 後端除錯
1. 在 Flask 執行配置中啟用 Debug 模式
2. 在程式碼中設置中斷點
3. 使用 Debug 模式執行

### 前端除錯
1. 在瀏覽器開發者工具中除錯
2. 使用 `console.log` 進行除錯
3. PyCharm Professional 支援 JavaScript 除錯

## 📊 資料庫管理

### 在 PyCharm 中查看資料庫
1. 開啟 Database 工具視窗
2. 添加資料來源 (SQLite 或 PostgreSQL)
3. 可以直接在 PyCharm 中執行 SQL 查詢

### 初始化測試資料
\`\`\`bash
cd backend
python seed_data.py
\`\`\`

## 🚀 部署準備

### 建立生產環境配置
\`\`\`bash
# 建立 requirements.txt
pip freeze > requirements.txt

# 建立 Next.js 生產版本
npm run build
\`\`\`

## ❗ 常見問題解決

### 1. 模組找不到錯誤
- 確認 Python 解釋器設置正確
- 確認虛擬環境已啟動
- 檢查 PYTHONPATH 設置

### 2. 資料庫連接錯誤
- 檢查資料庫服務是否執行
- 確認連接字串正確
- 檢查防火牆設置

### 3. CORS 錯誤
- 確認 Flask-CORS 已安裝並配置
- 檢查前端 API URL 設置

### 4. 埠號衝突
- 更改 Flask 或 Next.js 的預設埠號
- 檢查其他服務是否佔用埠號

## 📝 開發工作流程

1. **啟動開發環境**：執行後端和前端服務
2. **資料庫遷移**：有資料庫變更時執行遷移
3. **測試 API**：使用 PyCharm 的 HTTP Client 或 Postman
4. **前端開發**：在瀏覽器中即時預覽變更
5. **除錯**：使用 PyCharm 的除錯工具

## 🎯 下一步

- 設置自動化測試
- 配置 CI/CD 流程
- 部署到雲端平台 (Vercel + Heroku/Railway)
- 設置監控和日誌記錄

---

**提示**：如果遇到任何問題，請檢查 PyCharm 的事件日誌 (`Help` → `Show Log in Explorer`) 來獲取詳細的錯誤資訊。
