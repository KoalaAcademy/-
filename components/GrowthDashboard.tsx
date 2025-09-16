import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, BookOpen, Award } from 'lucide-react';
const img6 = "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755604195/%E5%AD%B8%E7%BF%92%E8%A8%98%E9%8C%84%E7%9A%84%E7%84%A1%E5%B0%BE%E7%86%8A%E5%8A%A9%E7%90%86_jfp3f0.png" //學習紀錄的考拉助理
interface UserProfile {
  name: string;
  education: string;
  skills: string[];
  experience: string[];
}

interface GrowthDashboardProps {
  userProfile: UserProfile;
  onStartLearning?: () => void;
}

interface LearningData {
  month: string;
  hours: number;
  courses: number;
}

interface SkillProgress {
  skill: string;
  progress: number;
  color: string;
}

export function GrowthDashboard({ userProfile, onStartLearning }: GrowthDashboardProps) {
  const [hasLearningData, setHasLearningData] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);

  // 模擬學習數據
  const learningTimeData: LearningData[] = [
    { month: '1月', hours: 20, courses: 2 },
    { month: '2月', hours: 35, courses: 3 },
    { month: '3月', hours: 45, courses: 4 },
    { month: '4月', hours: 30, courses: 3 },
    { month: '5月', hours: 55, courses: 5 },
    { month: '6月', hours: 40, courses: 4 },
  ];

  const skillProgressData: SkillProgress[] = [
    { skill: 'Python', progress: 75, color: '#8884d8' },
    { skill: 'JavaScript', progress: 60, color: '#82ca9d' },
    { skill: 'SQL', progress: 45, color: '#ffc658' },
    { skill: 'React', progress: 40, color: '#ff7c7c' },
    { skill: 'Django', progress: 30, color: '#8dd1e1' },
  ];

  useEffect(() => {
    // 檢查是否有學習數據
    const hasData = userProfile.skills.length > 0 || userProfile.experience.length > 0;
    setHasLearningData(hasData);
    
    if (hasData) {
      setTotalHours(learningTimeData.reduce((sum, data) => sum + data.hours, 0));
      setCompletedCourses(learningTimeData.reduce((sum, data) => sum + data.courses, 0));
    }
  }, [userProfile]);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div 
        className="w-48 h-48 bg-cover bg-center mb-8"
        style={{ backgroundImage: `url('${img6}')` }}
      />
      <h2 className="text-4xl font-bold text-black/65 mb-8 tracking-[2.56px]">
        尚無學習紀錄，先來學習吧!
      </h2>
      <button 
        onClick={onStartLearning}
        className="bg-[#fff1ab] border border-black rounded-xl px-16 py-6 text-3xl font-bold tracking-[9.6px] shadow-lg hover:shadow-xl transition-shadow"
      >
        開始學習
      </button>
    </div>
  );

  const LearningStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg border border-black/20 p-6 text-center">
        <Clock className="w-12 h-12 text-blue-500 mx-auto mb-3" />
        <div className="text-3xl font-bold text-gray-800">{totalHours}</div>
        <div className="text-sm text-gray-600">總學習時數</div>
      </div>
      
      <div className="bg-white rounded-lg border border-black/20 p-6 text-center">
        <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <div className="text-3xl font-bold text-gray-800">{completedCourses}</div>
        <div className="text-sm text-gray-600">完成課程數</div>
      </div>
      
      <div className="bg-white rounded-lg border border-black/20 p-6 text-center">
        <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-3" />
        <div className="text-3xl font-bold text-gray-800">{userProfile.skills.length}</div>
        <div className="text-sm text-gray-600">掌握技能</div>
      </div>
      
      <div className="bg-white rounded-lg border border-black/20 p-6 text-center">
        <Award className="w-12 h-12 text-orange-500 mx-auto mb-3" />
        <div className="text-3xl font-bold text-gray-800">85%</div>
        <div className="text-sm text-gray-600">學習達成率</div>
      </div>
    </div>
  );

  if (!hasLearningData) {
    return (
      <div className="bg-[#eefaff] min-h-[calc(100vh-100px)] p-6">
        <div className="max-w-6xl mx-auto">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#eefaff] min-h-[calc(100vh-100px)] p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* 統計卡片 */}
        <LearningStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 學習時數趨勢 */}
          <div className="bg-white rounded-lg border border-black/20 p-6">
            <h3 className="text-xl font-bold mb-4">月度學習時數</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={learningTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'hours' ? '學習時數' : '完成課程']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="hours" fill="#8884d8" name="hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 技能進度 */}
          <div className="bg-white rounded-lg border border-black/20 p-6">
            <h3 className="text-xl font-bold mb-4">技能掌握度</h3>
            <div className="space-y-4">
              {skillProgressData.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium">{skill.skill}</span>
                    <span className="text-lg font-bold">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${skill.progress}%`,
                        backgroundColor: skill.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 學習目標達成 */}
          <div className="bg-white rounded-lg border border-black/20 p-6">
            <h3 className="text-xl font-bold mb-4">本月學習目標</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span>完成 Python 進階課程</span>
                </div>
                <span className="text-green-600 font-bold">已完成</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  <span>學習 40 小時</span>
                </div>
                <span className="text-yellow-600 font-bold">進行中 (75%)</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mr-3"></div>
                  <span>完成專案實作</span>
                </div>
                <span className="text-gray-600 font-bold">待開始</span>
              </div>
            </div>
          </div>

          {/* 學習路徑進度 */}
          <div className="bg-white rounded-lg border border-black/20 p-6">
            <h3 className="text-xl font-bold mb-4">學習路徑進度</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: '已完成', value: 35, fill: '#4ade80' },
                    { name: '進行中', value: 25, fill: '#fbbf24' },
                    { name: '未開始', value: 40, fill: '#e5e7eb' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 mr-2"></div>
                <span className="text-sm">已完成</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
                <span className="text-sm">進行中</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 mr-2"></div>
                <span className="text-sm">未開始</span>
              </div>
            </div>
          </div>
        </div>

        {/* 成長歷程時間軸 */}
        <div className="bg-white rounded-lg border border-black/20 p-6 mt-8">
          <h3 className="text-xl font-bold mb-6">成長歷程</h3>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            <div className="space-y-6">
              {[
                { date: '2024-01', event: '開始學習 Python 基礎', type: 'start' },
                { date: '2024-02', event: '完成第一個 Web 專案', type: 'milestone' },
                { date: '2024-03', event: '學習 Django 框架', type: 'learning' },
                { date: '2024-04', event: '參與開源專案貢獻', type: 'achievement' },
                { date: '2024-05', event: '通過 Python 認證考試', type: 'certificate' },
                { date: '2024-06', event: '開始準備求職', type: 'current' }
              ].map((item, index) => (
                <div key={index} className="relative flex items-center">
                  <div className={`w-4 h-4 rounded-full border-4 ${
                    item.type === 'current' ? 'bg-blue-500 border-blue-200' :
                    item.type === 'achievement' ? 'bg-green-500 border-green-200' :
                    item.type === 'certificate' ? 'bg-purple-500 border-purple-200' :
                    'bg-gray-400 border-gray-200'
                  } relative z-10`}></div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-500">{item.date}</div>
                    <div className="text-lg font-medium">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
