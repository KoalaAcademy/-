import React, { useState, useEffect } from 'react';
import { ChevronDown, BarChart3, Target, BookOpen, Star, Calendar, Clock, TrendingUp, Award, CheckCircle2, ArrowRight, Briefcase, Users, Building } from 'lucide-react';

interface UserProfile {
  name: string;
  education: string;
  skills: string[];
  experience: string[];
}

interface JobMatchingPageProps {
  userProfile: UserProfile;
  onStartLearning?: () => void;
  onViewLearningRecord?: () => void;
}

interface JobRequirement {
  skill: string;
  required: number;
  current: number;
}

interface JobMatch {
  title: string;
  company: string;
  matchRate: number;
  requirements: JobRequirement[];
  developmentPath: string[];
  learningPlan: string[];
}

export function JobMatchingPage({ userProfile, onStartLearning, onViewLearningRecord }: JobMatchingPageProps) {
  const [selectedJob, setSelectedJob] = useState('Python 後端工程師');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState<JobMatch | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentTab, setCurrentTab] = useState<'matching' | 'development' | 'learning'>('matching');

  const jobOptions = [
    'Python 後端工程師',
    'Frontend 開發工程師',
    'Full Stack 開發工程師',
    '資料分析師',
    'DevOps 工程師',
    'AI/ML 工程師'
  ];

  const skillsMapping: { [key: string]: JobRequirement[] } = {
    'Python 後端工程師': [
      { skill: 'Python', required: 90, current: 70 },
      { skill: 'Django/Flask', required: 80, current: 40 },
      { skill: 'SQL/資料庫', required: 85, current: 60 },
      { skill: 'API 開發', required: 75, current: 50 },
      { skill: 'Docker', required: 70, current: 30 },
      { skill: 'AWS/雲端', required: 65, current: 25 }
    ],
    'Frontend 開發工程師': [
      { skill: 'JavaScript', required: 90, current: 80 },
      { skill: 'React/Vue', required: 85, current: 60 },
      { skill: 'HTML/CSS', required: 90, current: 85 },
      { skill: 'TypeScript', required: 75, current: 40 },
      { skill: 'Webpack', required: 60, current: 30 },
      { skill: 'UI/UX 設計', required: 55, current: 45 }
    ]
  };

  useEffect(() => {
    if (selectedJob) {
      setIsAnalyzing(true);
      setTimeout(() => {
        analyzeJobMatch();
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [selectedJob, userProfile]);

  const analyzeJobMatch = () => {
    const requirements = skillsMapping[selectedJob] || skillsMapping['Python 後端工程師'];
    
    const totalScore = requirements.reduce((sum, req) => sum + req.current, 0);
    const maxScore = requirements.reduce((sum, req) => sum + req.required, 0);
    const matchRate = Math.round((totalScore / maxScore) * 100);

    const analysisResult: JobMatch = {
      title: selectedJob,
      company: '科技公司',
      matchRate,
      requirements,
      developmentPath: [
        '後端工程師(初級) → 後端工程師(中級) → 資深後端工程師',
        '技術專家路線 或 管理路線',
        '架構師 或 技術主管'
      ],
      learningPlan: [
        '第1-2月：強化 Python 基礎與進階應用',
        '第3-4月：學習 Django 框架開發',
        '第5-6月：資料庫設計與 SQL 優化',
        '第7-8月：API 設計與微服務架構',
        '第9-10月：Docker 容器化技術',
        '第11-12月：雲端部署與 DevOps'
      ]
    };

    setAnalysisData(analysisResult);
  };

  const RadarChart = ({ data }: { data: JobRequirement[] }) => {
    const [animationProgress, setAnimationProgress] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 500);

      return () => clearTimeout(timer);
    }, [data]);

    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 lg:p-8">
        <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          技能雷達圖
        </h3>
        <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {/* 背景網格動畫 */}
            {[1, 2, 3, 4, 5].map((level) => (
              <circle
                key={level}
                cx="150"
                cy="150"
                r={level * 25 * animationProgress}
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="2"
                style={{
                  transition: 'r 1s ease-out',
                  transitionDelay: `${level * 0.1}s`
                }}
              />
            ))}
            
            {/* 軸線動畫 */}
            {data.map((_, index) => {
              const angle = (index * 360) / data.length - 90;
              const radian = (angle * Math.PI) / 180;
              const x = 150 + 125 * Math.cos(radian) * animationProgress;
              const y = 150 + 125 * Math.sin(radian) * animationProgress;
              
              return (
                <line
                  key={index}
                  x1="150"
                  y1="150"
                  x2={x}
                  y2={y}
                  stroke="#e0e7ff"
                  strokeWidth="2"
                  style={{
                    transition: 'x2 1s ease-out, y2 1s ease-out',
                    transitionDelay: `${0.5 + index * 0.1}s`
                  }}
                />
              );
            })}

            {/* 需求技能區域動畫 */}
            <polygon
              points={data.map((item, index) => {
                const angle = (index * 360) / data.length - 90;
                const radian = (angle * Math.PI) / 180;
                const radius = (item.required / 100) * 125 * animationProgress;
                const x = 150 + radius * Math.cos(radian);
                const y = 150 + radius * Math.sin(radian);
                return `${x},${y}`;
              }).join(' ')}
              fill="rgba(99, 102, 241, 0.2)"
              stroke="rgba(99, 102, 241, 1)"
              strokeWidth="3"
              style={{
                transition: 'all 1.5s ease-out',
                transitionDelay: '1s'
              }}
            />

            {/* 當前技能區域動畫 */}
            <polygon
              points={data.map((item, index) => {
                const angle = (index * 360) / data.length - 90;
                const radian = (angle * Math.PI) / 180;
                const radius = (item.current / 100) * 125 * animationProgress;
                const x = 150 + radius * Math.cos(radian);
                const y = 150 + radius * Math.sin(radian);
                return `${x},${y}`;
              }).join(' ')}
              fill="rgba(34, 197, 94, 0.3)"
              stroke="rgba(34, 197, 94, 1)"
              strokeWidth="3"
              style={{
                transition: 'all 1.5s ease-out',
                transitionDelay: '1.5s'
              }}
            />

            {/* 技能標籤動畫 */}
            {data.map((item, index) => {
              const angle = (index * 360) / data.length - 90;
              const radian = (angle * Math.PI) / 180;
              const x = 150 + 145 * Math.cos(radian);
              const y = 150 + 145 * Math.sin(radian);
              
              return (
                <g key={index}>
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="15" 
                    fill="white" 
                    stroke="#6366f1" 
                    strokeWidth="2"
                    style={{
                      opacity: animationProgress,
                      transition: 'opacity 1s ease-out',
                      transitionDelay: `${2 + index * 0.1}s`
                    }}
                  />
                  <text
                    x={x}
                    y={y + 25}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="10"
                    fill="#374151"
                    fontWeight="600"
                    style={{
                      opacity: animationProgress,
                      transition: 'opacity 1s ease-out',
                      transitionDelay: `${2.2 + index * 0.1}s`
                    }}
                  >
                    {item.skill}
                  </text>
                </g>
              );
            })}

            {/* 中心點脈衝動畫 */}
            <circle
              cx="150"
              cy="150"
              r="3"
              fill="#6366f1"
              className="animate-pulse"
            />
          </svg>
        </div>
        
        <div className="flex justify-center space-x-4 lg:space-x-8 mt-4 lg:mt-6">
          <div className="flex items-center">
            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-indigo-500 rounded-full mr-2 lg:mr-3"></div>
            <span className="text-xs lg:text-sm font-medium text-gray-700">職缺需求</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full mr-2 lg:mr-3"></div>
            <span className="text-xs lg:text-sm font-medium text-gray-700">目前技能</span>
          </div>
        </div>
      </div>
    );
  };

  const DevelopmentPathTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* 職涯發展總覽 */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-200">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            {selectedJob} 職涯發展路徑
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">系統性規劃您的專業發展藍圖</p>
        </div>

        {/* 發展階段時間軸 */}
        <div className="relative">
          <div className="absolute top-1/2 left-4 right-4 lg:left-8 lg:right-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-y-1/2 rounded-full"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 relative z-10">
            {[
              { 
                title: '初級工程師', 
                time: '0-2年', 
                salary: '40-60K',
                skills: ['基礎程式設計', '程式碼品質', '團隊協作'],
                bgColor: 'bg-blue-500'
              },
              { 
                title: '中級工程師', 
                time: '2-5年', 
                salary: '60-90K',
                skills: ['系統設計', '效能優化', '專案管理'],
                bgColor: 'bg-purple-500'
              },
              { 
                title: '資深工程師', 
                time: '5-8年', 
                salary: '90-130K',
                skills: ['架構設計', '技術決策', '團隊領導'],
                bgColor: 'bg-indigo-500'
              },
              { 
                title: '技術專家/主管', 
                time: '8年以上', 
                salary: '130K+',
                skills: ['策略規劃', '組織管理', '技術視野'],
                bgColor: 'bg-gray-600'
              }
            ].map((stage, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 lg:w-16 lg:h-16 ${stage.bgColor} rounded-full flex items-center justify-center text-white text-lg lg:text-xl font-bold mb-3 lg:mb-4 mx-auto shadow-lg border-4 border-white`}>
                  {index + 1}
                </div>
                <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-200">
                  <h4 className="font-bold text-sm lg:text-lg mb-1 lg:mb-2">{stage.title}</h4>
                  <div className="text-xs lg:text-sm text-gray-600 mb-1">{stage.time}</div>
                  <div className="text-sm lg:text-lg font-bold text-green-600 mb-2 lg:mb-3">{stage.salary}</div>
                  <div className="space-y-1 hidden lg:block">
                    {stage.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="text-xs bg-gray-100 rounded-full px-2 py-1">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 雙路線發展 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* 技術專家路線 */}
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-xl p-6 lg:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl lg:rounded-2xl flex items-center justify-center text-white text-2xl lg:text-3xl mb-4 mx-auto">
              <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800">技術專家路線</h3>
            <p className="text-gray-600 text-sm lg:text-base">深度技術發展道路</p>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {[
              { level: '資深開發工程師', desc: '技術深度與廣度並重', years: '3-5年', icon: <Target className="w-4 h-4 lg:w-5 lg:h-5" /> },
              { level: '技術團隊領導', desc: '技術團隊領導者', years: '5-7年', icon: <Users className="w-4 h-4 lg:w-5 lg:h-5" /> },
              { level: '首席工程師', desc: '技術架構決策者', years: '7-10年', icon: <Award className="w-4 h-4 lg:w-5 lg:h-5" /> },
              { level: '技術長 (CTO)', desc: '技術策略制定者', years: '10年+', icon: <Building className="w-4 h-4 lg:w-5 lg:h-5" /> }
            ].map((item, index) => (
              <div key={index} className="flex items-center p-3 lg:p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 lg:mr-4">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm lg:text-base text-gray-800">{item.level}</div>
                  <div className="text-xs lg:text-sm text-gray-600">{item.desc}</div>
                </div>
                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.years}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 管理路線 */}
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-xl p-6 lg:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl lg:rounded-2xl flex items-center justify-center text-white text-2xl lg:text-3xl mb-4 mx-auto">
              <Users className="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800">管理發展路線</h3>
            <p className="text-gray-600 text-sm lg:text-base">領導力與管理能力</p>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {[
              { level: '團隊領導', desc: '小團隊管理經驗', years: '3-5年', icon: <Target className="w-4 h-4 lg:w-5 lg:h-5" /> },
              { level: '工程經理', desc: '部門技術管理', years: '5-7年', icon: <Users className="w-4 h-4 lg:w-5 lg:h-5" /> },
              { level: '工程總監', desc: '多團隊協調管理', years: '7-10年', icon: <Award className="w-4 h-4 lg:w-5 lg:h-5" /> },
              { level: '技術副總', desc: '技術組織戰略領導', years: '10年+', icon: <Building className="w-4 h-4 lg:w-5 lg:h-5" /> }
            ].map((item, index) => (
              <div key={index} className="flex items-center p-3 lg:p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3 lg:mr-4">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm lg:text-base text-gray-800">{item.level}</div>
                  <div className="text-xs lg:text-sm text-gray-600">{item.desc}</div>
                </div>
                <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {item.years}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 核心能力發展 */}
      <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-xl p-6 lg:p-8">
        <h3 className="text-xl lg:text-2xl font-bold text-center mb-6 lg:mb-8 text-gray-800">
          核心能力發展矩陣
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {[
            { 
              category: '技術能力', 
              color: 'blue',
              icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
              skills: ['程式設計精熟度', '系統架構設計', '新技術學習能力', '問題解決能力'] 
            },
            { 
              category: '軟技能', 
              color: 'green',
              icon: <Users className="w-5 h-5 lg:w-6 lg:h-6" />,
              skills: ['溝通協調能力', '團隊合作精神', '專案管理技巧', '客戶需求理解'] 
            },
            { 
              category: '領導力', 
              color: 'purple',
              icon: <Award className="w-5 h-5 lg:w-6 lg:h-6" />,
              skills: ['團隊領導能力', '決策判斷力', '策略思維能力', '變革管理能力'] 
            }
          ].map((category) => (
            <div key={category.category} className={`bg-${category.color}-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-${category.color}-200`}>
              <div className="flex items-center justify-center mb-4">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-${category.color}-500 text-white rounded-full flex items-center justify-center`}>
                  {category.icon}
                </div>
              </div>
              <h4 className={`text-lg lg:text-xl font-bold text-${category.color}-700 mb-3 lg:mb-4 text-center`}>
                {category.category}
              </h4>
              <div className="space-y-2 lg:space-y-3">
                {category.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className={`w-4 h-4 lg:w-5 lg:h-5 text-${category.color}-500 mr-2 lg:mr-3 flex-shrink-0`} />
                    <span className="text-xs lg:text-sm text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const LearningMapTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* 學習路徑總覽 */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-indigo-200">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            個人化學習藍圖
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">基於AI分析的專屬學習路徑規劃</p>
        </div>

        {/* 學習進度總覽 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {[
            { label: '總學習時數', value: '480小時', icon: Clock, color: 'blue' },
            { label: '課程模組', value: '12個', icon: BookOpen, color: 'green' },
            { label: '實作專案', value: '6個', icon: Briefcase, color: 'purple' },
            { label: '預估完成', value: '12個月', icon: Calendar, color: 'orange' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-lg border border-gray-200">
              <stat.icon className={`w-6 h-6 lg:w-8 lg:h-8 text-${stat.color}-500 mx-auto mb-2 lg:mb-3`} />
              <div className="text-lg lg:text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 階段式學習計劃 */}
      <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-xl p-6 lg:p-8">
        <h3 className="text-xl lg:text-2xl font-bold text-center mb-6 lg:mb-8 text-gray-800">階段式學習計劃</h3>
        
        <div className="space-y-4 lg:space-y-6">
          {[
            {
              phase: '基礎建立期',
              duration: '第1-3月',
              color: 'green',
              courses: [
                { name: 'Python 基礎語法與邏輯', platform: 'YouTube', hours: '40小時', difficulty: '入門' },
                { name: '資料結構與演算法', platform: 'Hahow', hours: '35小時', difficulty: '初級' },
                { name: 'Git 版本控制系統', platform: 'Udemy', hours: '15小時', difficulty: '入門' }
              ]
            },
            {
              phase: '框架應用期',
              duration: '第4-6月',
              color: 'blue',
              courses: [
                { name: 'Django Web 框架開發', platform: 'Hahow', hours: '50小時', difficulty: '中級' },
                { name: 'RESTful API 設計實作', platform: 'Udemy', hours: '30小時', difficulty: '中級' },
                { name: '資料庫設計與 SQL 優化', platform: 'YouTube', hours: '25小時', difficulty: '中級' }
              ]
            },
            {
              phase: '進階技術期',
              duration: '第7-9月',
              color: 'purple',
              courses: [
                { name: 'Docker 容器化技術', platform: 'Udemy', hours: '35小時', difficulty: '中高級' },
                { name: 'Redis 快取系統應用', platform: 'Hahow', hours: '20小時', difficulty: '中高級' },
                { name: '微服務架構設計', platform: 'YouTube', hours: '40小時', difficulty: '進階' }
              ]
            },
            {
              phase: '雲端部署期',
              duration: '第10-12月',
              color: 'orange',
              courses: [
                { name: 'AWS 雲端服務實戰', platform: 'Udemy', hours: '45小時', difficulty: '進階' },
                { name: 'CI/CD 自動化部署', platform: 'Hahow', hours: '30小時', difficulty: '進階' },
                { name: '系統監控與效能調校', platform: 'YouTube', hours: '25小時', difficulty: '進階' }
              ]
            }
          ].map((phase, phaseIndex) => (
            <div key={phaseIndex} className={`bg-${phase.color}-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border-l-4 border-${phase.color}-500`}>
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <h4 className={`text-lg lg:text-xl font-bold text-${phase.color}-700`}>{phase.phase}</h4>
                <div className={`bg-${phase.color}-100 text-${phase.color}-700 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium`}>
                  {phase.duration}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
                {phase.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="bg-white rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-bold text-gray-800 text-xs lg:text-sm">{course.name}</h5>
                      <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 flex-shrink-0" />
                    </div>
                    
                    <div className="space-y-1 lg:space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-1 lg:px-2 py-1 rounded text-xs ${
                          course.platform === 'YouTube' ? 'bg-red-100 text-red-700' :
                          course.platform === 'Hahow' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {course.platform}
                        </span>
                        <span className="text-gray-600">{course.hours}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">難度</span>
                        <span className={`px-1 lg:px-2 py-1 rounded text-xs ${
                          course.difficulty.includes('入門') ? 'bg-green-100 text-green-700' :
                          course.difficulty.includes('初級') || course.difficulty.includes('中級') ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {course.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 實作專案規劃 */}
      <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-xl p-6 lg:p-8">
        <h3 className="text-xl lg:text-2xl font-bold text-center mb-6 lg:mb-8 text-gray-800">實作專案里程碑</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {[
            {
              title: '個人部落格系統',
              difficulty: '初級',
              skills: ['Django', 'HTML/CSS', 'SQLite'],
              duration: '2週',
              description: '建立完整的部落格系統，包含文章發佈、分類、搜尋功能'
            },
            {
              title: 'RESTful API 服務',
              difficulty: '中級',
              skills: ['Django REST', 'Authentication', 'Database'],
              duration: '3週',
              description: '設計並實作 RESTful API，包含用戶認證與資料CRUD操作'
            },
            {
              title: '電商購物車系統',
              difficulty: '中高級',
              skills: ['Django', 'Redis', 'Payment API'],
              duration: '4週',
              description: '完整電商功能，包含商品管理、購物車、訂單處理'
            },
            {
              title: '微服務架構專案',
              difficulty: '進階',
              skills: ['Docker', 'Microservices', 'API Gateway'],
              duration: '6週',
              description: '將單體應用拆分為微服務架構，實現服務間通訊'
            },
            {
              title: '即時聊天應用',
              difficulty: '進階',
              skills: ['WebSocket', 'Redis', 'Real-time'],
              duration: '4週',
              description: '建立即時聊天系統，支援多人聊天室與私人訊息'
            },
            {
              title: '雲端部署專案',
              difficulty: '進階',
              skills: ['AWS', 'Docker', 'CI/CD'],
              duration: '3週',
              description: '將專案部署到雲端平台，建立自動化部署流程'
            }
          ].map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <h4 className="text-base lg:text-lg font-bold text-gray-800">{project.title}</h4>
                <div className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${
                  project.difficulty === '初級' ? 'bg-green-100 text-green-700' :
                  project.difficulty === '中級' ? 'bg-yellow-100 text-yellow-700' :
                  project.difficulty === '中高級' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {project.difficulty}
                </div>
              </div>
              
              <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-1 lg:gap-2 mb-3 lg:mb-4">
                {project.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-1 lg:px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs lg:text-sm text-gray-600">
                  <Clock className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  預估 {project.duration}
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-xs lg:text-sm font-medium">
                  查看詳情 <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 inline ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 行動呼籲 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white text-center">
        <h3 className="text-xl lg:text-2xl font-bold mb-4">準備好開始您的學習之旅了嗎？</h3>
        <p className="text-blue-100 mb-6 text-sm lg:text-base">根據個人化分析，我們為您量身打造了最適合的學習路徑</p>
        
        <div className="flex flex-col lg:flex-row justify-center space-y-3 lg:space-y-0 lg:space-x-4">
          <button 
            onClick={onStartLearning}
            className="bg-white text-blue-600 px-6 lg:px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            立即開始學習
          </button>
          <button 
            onClick={onViewLearningRecord}
            className="border-2 border-white text-white px-6 lg:px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            查看學習記錄
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#eefaff] min-h-[calc(100vh-100px)] p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* 選單區域 */}
        <div className="bg-white rounded-full border border-black/20 p-1 lg:p-2 mb-6 lg:mb-8 flex shadow-lg overflow-x-auto">
          <button
            onClick={() => setCurrentTab('matching')}
            className={`rounded-full px-4 lg:px-8 py-2 lg:py-3 flex-1 text-center transition-all duration-300 whitespace-nowrap ${
              currentTab === 'matching' 
                ? 'bg-[#bfffde] text-black shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            <span className="text-base lg:text-xl font-medium">職缺比對</span>
          </button>
          <button
            onClick={() => setCurrentTab('development')}
            className={`rounded-full px-4 lg:px-8 py-2 lg:py-3 flex-1 text-center transition-all duration-300 whitespace-nowrap ${
              currentTab === 'development' 
                ? 'bg-[#bfffde] text-black shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            <span className="text-base lg:text-xl font-medium">潛在發展路徑</span>
          </button>
          <button
            onClick={() => setCurrentTab('learning')}
            className={`rounded-full px-4 lg:px-8 py-2 lg:py-3 flex-1 text-center transition-all duration-300 whitespace-nowrap ${
              currentTab === 'learning' 
                ? 'bg-[#bfffde] text-black shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            <span className="text-base lg:text-xl font-medium">學習地圖</span>
          </button>
        </div>

        {/* 職業選擇 */}
        <div className="flex flex-col lg:flex-row lg:items-center mb-6 lg:mb-8 space-y-3 lg:space-y-0">
          <span className="text-xl lg:text-3xl text-black/70 lg:mr-4">選擇職業:</span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white border border-black/20 rounded-xl px-4 lg:px-6 py-2 lg:py-3 w-full lg:min-w-[300px] flex items-center justify-between text-base lg:text-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {selectedJob}
              <ChevronDown className={`w-5 h-5 lg:w-6 lg:h-6 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-black/20 rounded-xl mt-2 z-10 shadow-xl">
                {jobOptions.map((job) => (
                  <button
                    key={job}
                    onClick={() => {
                      setSelectedJob(job);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 lg:px-6 py-2 lg:py-3 hover:bg-gray-50 text-base lg:text-xl first:rounded-t-xl last:rounded-b-xl"
                  >
                    {job}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {isAnalyzing ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-b-2 border-[#1e9fa9] mx-auto mb-4"></div>
              <p className="text-lg lg:text-xl">正在分析職缺匹配度...</p>
            </div>
          </div>
        ) : analysisData ? (
          <div>
            {/* 職缺比對內容 */}
            {currentTab === 'matching' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <RadarChart data={analysisData.requirements} />
                  
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 lg:p-6 mt-6">
                    <h3 className="text-lg lg:text-xl font-bold mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-blue-600" />
                      職缺匹配度
                    </h3>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-6 lg:h-8 mr-4">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-6 lg:h-8 rounded-full flex items-center justify-center transition-all duration-1000 shadow-sm"
                          style={{ width: `${analysisData.matchRate}%` }}
                        >
                          <span className="text-white font-bold text-sm lg:text-base">{analysisData.matchRate}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs lg:text-sm text-gray-600 mt-2">
                      您與此職位的技能匹配度為 {analysisData.matchRate}%，建議加強不足的技能領域。
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-bold mb-4">技能差距分析</h3>
                  <div className="space-y-3 lg:space-y-4">
                    {analysisData.requirements.map((req, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm lg:text-base">{req.skill}</span>
                          <div className="flex space-x-1 lg:space-x-2">
                            <span className="text-xs lg:text-sm text-blue-600 bg-blue-50 px-1 lg:px-2 py-1 rounded">目前: {req.current}%</span>
                            <span className="text-xs lg:text-sm text-red-600 bg-red-50 px-1 lg:px-2 py-1 rounded">需求: {req.required}%</span>
                          </div>
                        </div>
                        <div className="relative w-full bg-gray-200 rounded-full h-3 lg:h-4">
                          <div 
                            className="absolute top-0 left-0 bg-blue-400 h-3 lg:h-4 rounded-full"
                            style={{ width: `${req.current}%` }}
                          />
                          <div 
                            className="absolute top-0 left-0 bg-red-200 h-3 lg:h-4 rounded-full border-2 border-red-400"
                            style={{ width: `${req.required}%` }}
                          />
                          <div 
                            className="absolute top-0 bg-red-400 h-3 lg:h-4 rounded-full"
                            style={{ 
                              left: `${req.current}%`, 
                              width: `${Math.max(0, req.required - req.current)}%`,
                              backgroundColor: req.current >= req.required ? 'transparent' : '#ef4444'
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          {req.current >= req.required ? (
                            <><CheckCircle2 className="w-3 h-3 text-green-500 mr-1" /> 已達標</>
                          ) : (
                            <><TrendingUp className="w-3 h-3 text-red-500 mr-1" /> 需提升 {req.required - req.current}%</>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'development' && <DevelopmentPathTab />}
            {currentTab === 'learning' && <LearningMapTab />}
          </div>
        ) : null}
      </div>
    </div>
  );
}
