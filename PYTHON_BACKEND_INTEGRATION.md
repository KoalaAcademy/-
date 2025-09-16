# Python Flask 後端整合指南

## 概述

這個職業發展和學習平台使用 Python Flask 作為後端 API 服務，提供完整的用戶管理、學習追蹤、AI 諮詢和職位匹配功能。前端使用 Next.js React 應用程式，透過 RESTful API 與 Flask 後端進行通訊。

## 為什麼整合能夠成功

### 1. 架構設計優勢
- **前後端分離**: Next.js 前端專注於用戶介面，Flask 後端專注於業務邏輯和資料處理
- **RESTful API**: 使用標準的 HTTP 方法和 JSON 格式進行通訊
- **CORS 支援**: Flask 後端配置了 CORS，允許前端跨域請求
- **JWT 認證**: 統一的身份驗證機制，確保安全性

### 2. 技術棧互補
- **Next.js**: 提供優秀的用戶體驗和 SEO 優化
- **Flask**: 輕量級且靈活的 Python 框架，適合快速開發 API
- **SQLAlchemy**: 強大的 ORM，簡化資料庫操作
- **PostgreSQL**: 可靠的關聯式資料庫，支援複雜查詢

## 後端功能特色

### 🔐 用戶管理系統
\`\`\`python
# 用戶註冊和登入
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
PUT /api/auth/profile
\`\`\`

**功能包括:**
- JWT Token 認證
- 密碼加密存儲
- 用戶資料管理
- 個人檔案更新

### 📚 學習管理系統
\`\`\`python
# 課程和學習進度管理
GET /api/courses
GET /api/courses/<course_id>
POST /api/learning/progress
GET /api/learning/progress/<user_id>
\`\`\`

**功能包括:**
- 課程資料管理
- 學習進度自動追蹤
- YouTube 影片觀看記錄
- 完成狀態更新

### 🤖 AI 諮詢服務
\`\`\`python
# AI 驅動的職業諮詢
POST /api/ai/consultation
GET /api/ai/consultation/<user_id>
POST /api/ai/career-advice
\`\`\`

**功能包括:**
- 個人化職業建議
- 技能評估分析
- 學習路徑推薦
- 諮詢記錄保存

### 💼 職位匹配系統
\`\`\`python
# 智能職位匹配
POST /api/jobs/match
GET /api/jobs/recommendations/<user_id>
POST /api/jobs/apply
\`\`\`

**功能包括:**
- 基於技能的職位匹配
- 個人化職位推薦
- 申請狀態追蹤
- 匹配度分析

### 📊 學習分析儀表板
\`\`\`python
# 學習數據分析
GET /api/analytics/learning/<user_id>
GET /api/analytics/progress/<user_id>
GET /api/analytics/skills/<user_id>
\`\`\`

**功能包括:**
- 學習時間統計
- 進度可視化
- 技能發展追蹤
- 成就系統

## 快速開始

### 1. 環境設置
\`\`\`bash
# 進入後端目錄
cd backend

# 安裝依賴
pip install -r requirements.txt

# 設置環境變數
export FLASK_APP=app.py
export FLASK_ENV=development
export DATABASE_URL=postgresql://username:password@localhost/dbname
export JWT_SECRET_KEY=your-secret-key
\`\`\`

### 2. 資料庫初始化
\`\`\`bash
# 初始化資料庫
python -c "from app import db; db.create_all()"

# 載入測試資料
python seed_data.py
\`\`\`

### 3. 啟動服務
\`\`\`bash
# 開發模式
flask run --host=0.0.0.0 --port=5000

# 或使用 Docker
docker-compose up
\`\`\`

### 4. 前端配置
在 Next.js 專案中設置 API 基礎 URL：

\`\`\`javascript
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};
\`\`\`

## API 使用範例

### 用戶註冊
\`\`\`javascript
const registerUser = async (userData) => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      full_name: userData.fullName
    }),
  });
  
  const result = await response.json();
  if (result.access_token) {
    localStorage.setItem('token', result.access_token);
  }
  return result;
};
\`\`\`

### 學習進度追蹤
\`\`\`javascript
const trackProgress = async (courseId, progress) => {
  const response = await fetch('http://localhost:5000/api/learning/progress', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      course_id: courseId,
      progress_percentage: progress,
      current_video_time: videoCurrentTime,
      video_duration: videoDuration
    }),
  });
  
  return response.json();
};
\`\`\`

### AI 諮詢請求
\`\`\`javascript
const getCareerAdvice = async (userProfile) => {
  const response = await fetch('http://localhost:5000/api/ai/career-advice', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      current_skills: userProfile.skills,
      career_goals: userProfile.goals,
      experience_level: userProfile.experience
    }),
  });
  
  return response.json();
};
\`\`\`

## 部署建議

### 開發環境
- 使用 `flask run` 進行本地開發
- 前端使用 `npm run dev` 啟動 Next.js 開發服務器
- 資料庫使用本地 PostgreSQL 實例

### 生產環境
- 使用 Gunicorn 作為 WSGI 服務器
- 配置 Nginx 作為反向代理
- 使用 Docker 容器化部署
- 資料庫使用雲端 PostgreSQL 服務（如 Supabase）

### Docker 部署
\`\`\`bash
# 構建和啟動服務
docker-compose up --build

# 後台運行
docker-compose up -d
\`\`\`

## 安全性考量

1. **JWT Token 管理**: 設置適當的過期時間和刷新機制
2. **CORS 配置**: 限制允許的來源域名
3. **輸入驗證**: 所有 API 端點都進行輸入驗證
4. **SQL 注入防護**: 使用 SQLAlchemy ORM 防止 SQL 注入
5. **密碼安全**: 使用 bcrypt 進行密碼哈希

## 監控和日誌

後端包含完整的日誌記錄系統：
- API 請求日誌
- 錯誤追蹤
- 性能監控
- 用戶行為分析

## 擴展性

這個架構設計支援：
- 水平擴展（多個 Flask 實例）
- 微服務拆分
- 快取層添加（Redis）
- 消息隊列整合（Celery）

## 總結

這個 Python Flask 後端與 Next.js 前端的整合方案提供了：
- 完整的用戶管理和認證系統
- 智能的學習追蹤和分析功能
- AI 驅動的職業諮詢服務
- 靈活的職位匹配系統
- 可擴展的架構設計

通過標準的 RESTful API 和現代的認證機制，確保了前後端的無縫整合和優秀的用戶體驗。
