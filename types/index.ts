// 基本型別定義
export type PageType = 'consultation' | 'jobMatching' | 'dashboard' | 'learning' | 'profile' | 'learningRecord';
export type Platform = 'youtube' | 'hahow' | 'udemy';

// 使用者資料介面
export interface UserProfile {
  name: string;
  education: string;
  skills: string[];
  experience: string[];
}

// 訊息介面
export interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

// 工作需求介面
export interface JobRequirement {
  skill: string;
  required: number;
  current: number;
}

// 工作匹配介面
export interface JobMatch {
  title: string;
  company: string;
  matchRate: number;
  requirements: JobRequirement[];
  developmentPath: string[];
  learningPlan: string[];
}

// 課程單元介面
export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  progress: number;
}

// 通知設定介面
export interface NotificationSettings {
  enabled: boolean;
  email: string;
  times: string[];
}

// 影片進度介面
export interface VideoProgress {
  currentTime: number;
  duration: number;
  progress: number;
}

// 課程筆記介面
export interface LessonNote {
  id: string;
  lessonId: string;
  content: string;
  timestamp: number;
  createdAt: Date;
}

// 學習統計介面
export interface LearningStats {
  totalHours: number;
  completedCourses: number;
  inProgressCourses: number;
  certificates: number;
}

// 技能評估介面
export interface SkillAssessment {
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
}

// 成就介面
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}
