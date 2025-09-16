# Career Development Platform - Flask Backend

這是一個職業發展和學習平台的 Flask 後端 API，提供完整的用戶管理、AI 諮詢、職位匹配、課程管理和學習分析功能。

## 功能特色

### 🔐 用戶管理
- 用戶註冊和認證
- 個人資料管理
- 技能標籤系統
- 學習統計追蹤

### 🤖 AI 諮詢
- 智能對話系統
- 職能分析
- 個人化建議
- 對話歷史記錄

### 💼 職位匹配
- 職位相容性分析
- 技能差距識別
- 學習建議生成
- 職業發展路徑

### 📚 課程管理
- 多平台課程整合 (YouTube, Hahow, Udemy)
- 課程搜索和篩選
- 學習進度追蹤
- 個人化推薦

### 📊 學習分析
- 學習時數統計
- 進度分析
- 成就追蹤
- 活動記錄

## 技術架構

- **框架**: Flask 2.3.3
- **資料庫**: SQLAlchemy (支援 SQLite/PostgreSQL)
- **認證**: JWT Token
- **跨域**: Flask-CORS
- **部署**: Docker 支援

## API 端點

### 用戶管理
\`\`\`
POST   /api/user/register          # 用戶註冊
GET    /api/user/profile           # 獲取個人資料
PUT    /api/user/profile           # 更新個人資料
POST   /api/user/skills            # 新增技能
DELETE /api/user/skills/<id>       # 刪除技能
GET    /api/user/learning-records  # 獲取學習記錄
\`\`\`

### AI 諮詢
\`\`\`
POST   /api/ai/chat                # 發送訊息給 AI
GET    /api/ai/conversation        # 獲取對話歷史
\`\`\`

### 職位匹配
\`\`\`
GET    /api/jobs                   # 獲取職位列表
POST   /api/jobs/<id>/analyze      # 分析職位相容性
\`\`\`

### 課程管理
\`\`\`
GET    /api/courses                # 獲取課程列表
POST   /api/courses/enroll         # 註冊課程
PUT    /api/courses/progress       # 更新學習進度
\`\`\`

### 推薦和分析
\`\`\`
GET    /api/recommendations/courses # 獲取課程推薦
GET    /api/analytics/learning      # 獲取學習分析
\`\`\`

## 快速開始

### 1. 環境設置
\`\`\`bash
# 克隆專案
git clone <repository-url>
cd backend

# 建立虛擬環境
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate     # Windows

# 安裝依賴
pip install -r requirements.txt
\`\`\`

### 2. 資料庫初始化
\`\`\`bash
# 初始化資料庫並填入範例資料
python seed_data.py
\`\`\`

### 3. 啟動服務
\`\`\`bash
# 開發模式
python app.py

# 或使用 Flask CLI
export FLASK_APP=app.py
flask run
\`\`\`

### 4. 使用 Docker
\`\`\`bash
# 建立並啟動服務
docker-compose up --build

# 背景執行
docker-compose up -d
\`\`\`

## 環境變數

建立 `.env` 檔案：
\`\`\`env
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=sqlite:///career_platform.db
FLASK_ENV=development
\`\`\`

## 資料庫模型

### User (用戶)
- 基本資料：姓名、信箱、電話、學歷、工作經驗
- 關聯：技能、對話記錄、學習記錄

### UserSkill (用戶技能)
- 技能名稱、熟練度等級、驗證狀態

### AIConversation (AI 對話)
- 對話類型、內容、時間戳記、會話 ID

### JobPosition (職位)
- 職位資訊、技能需求、薪資範圍、公司資訊

### Course (課程)
- 課程資訊、平台、評分、標籤、價格

### LearningRecord (學習記錄)
- 學習進度、時數、完成狀態、評價

## API 使用範例

### 用戶註冊
\`\`\`bash
curl -X POST http://localhost:5000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "張三",
    "email": "zhang@example.com",
    "education": "國立台灣大學資訊工程學系"
  }'
\`\`\`

### AI 對話
\`\`\`bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "message": "我想學習 Python 程式設計"
  }'
\`\`\`

### 職位分析
\`\`\`bash
curl -X POST http://localhost:5000/api/jobs/1/analyze \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

## 部署說明

### 生產環境設置
1. 設置環境變數
2. 使用 PostgreSQL 資料庫
3. 配置 Redis (可選，用於快取)
4. 設置反向代理 (Nginx)
5. 使用 Gunicorn 作為 WSGI 服務器

### Docker 部署
\`\`\`bash
# 生產環境
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

## 開發指南

### 新增 API 端點
1. 在 `app.py` 中定義路由
2. 實作業務邏輯
3. 更新資料庫模型 (如需要)
4. 撰寫測試

### 資料庫遷移
\`\`\`bash
# 建立遷移檔案
flask db migrate -m "描述變更"

# 執行遷移
flask db upgrade
\`\`\`

## 測試

\`\`\`bash
# 執行測試
python -m pytest tests/

# 測試覆蓋率
python -m pytest --cov=app tests/
\`\`\`

## 貢獻指南

1. Fork 專案
2. 建立功能分支
3. 提交變更
4. 建立 Pull Request

## 授權

MIT License
