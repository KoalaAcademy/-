import React, { useState } from 'react';
import { Edit3, Mail, Phone, MapPin, Calendar, Award, User, Plus } from 'lucide-react';
const img = 'https://res.cloudinary.com/dhcrtfirv/image/upload/v1755606141/%E9%A0%90%E8%A8%AD%E5%AD%B8%E5%93%A1%E5%A4%A7%E9%A0%AD%E7%85%A7_kwf8m3.png'// 個人資料預設大頭照
interface UserProfile {
  name: string;
  education: string;
  skills: string[];
  experience: string[];
}

interface ProfilePageProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  onBack: () => void;
}

interface ExtendedProfile extends UserProfile {
  email: string;
  phone: string;
  workExperience: string;
  bio: string;
  totalHours: number;
  completedCourses: number;
  certificates: number;
  skillsGrowth: number;
}

export function ProfilePage({ userProfile, setUserProfile, onBack }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState(''); // 新增技能輸入狀態
  const [profile, setProfile] = useState<ExtendedProfile>({
    name: userProfile.name || 'Allen 學員',
    email: 'allen@example.com',
    phone: '0912-345-678',
    education: userProfile.education || '國立台灣大學資訊工程學系',
    workExperience: userProfile.experience.join(', ') || '2年軟體開發經驗',
    bio: '熱愛學習新技術的軟體工程師，目標是成為全端開發專家。',
    skills: userProfile.skills.length > 0 ? userProfile.skills : ['Python', 'JavaScript', 'React', 'Node.js'],
    experience: userProfile.experience,
    totalHours: 125,
    completedCourses: 15,
    certificates: 8,
    skillsGrowth: 42
  });

  const handleSave = () => {
    setUserProfile({
      name: profile.name,
      education: profile.education,
      skills: profile.skills,
      experience: profile.workExperience.split(',').map(exp => exp.trim())
    });
    setIsEditing(false);
  };

  const handleSkillAdd = (skillToAdd?: string) => {
    const skill = skillToAdd || newSkill.trim();
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill(''); // 清空輸入框
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSkillAdd();
    }
  };

  return (
    <div className="bg-[#eefaff] min-h-[calc(100vh-100px)] p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* 頁面標題 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-2xl lg:text-4xl font-bold text-black">個人檔案</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-black text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-gray-800 transition-colors w-fit"
          >
            <Edit3 className="w-5 h-5" />
            <span>{isEditing ? '取消' : '編輯'}</span>
          </button>
        </div>

        <p className="text-base lg:text-lg text-gray-600 mb-8">管理您的個人資訊和學習專長</p>

        {/* 個人基本資訊 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* 頭像 */}
            <div className="relative self-center lg:self-start">
              <div 
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-cover bg-center border-4 border-pink-200"
                style={{ backgroundImage: `url('${img}')` }}
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 lg:w-12 lg:h-12 bg-pink-200 rounded-full flex items-center justify-center">
                <span className="text-lg lg:text-2xl">❤️</span>
              </div>
            </div>

            {/* 基本資訊 */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-lg lg:text-xl font-medium">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-base lg:text-lg">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">電話</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-base lg:text-lg">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">學歷</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.education}
                    onChange={(e) => setProfile(prev => ({ ...prev, education: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-base lg:text-lg">{profile.education}</p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">工作經驗</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.workExperience}
                    onChange={(e) => setProfile(prev => ({ ...prev, workExperience: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-base lg:text-lg">{profile.workExperience}</p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">個人簡介</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-base lg:text-lg">{profile.bio}</p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto"
              >
                儲存
              </button>
            </div>
          )}
        </div>

        {/* 技能標籤 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-8 mb-8">
          <h3 className="text-xl lg:text-2xl font-bold mb-6">技能標籤</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {profile.skills.map((skill, index) => (
              <div key={index} className="relative group">
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                  {skill}
                </span>
                {isEditing && (
                  <button
                    onClick={() => handleSkillRemove(skill)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                placeholder="新增技能..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-3 border border-gray-300 rounded-lg"
              />
              <button 
                onClick={() => handleSkillAdd()}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>新增</span>
              </button>
            </div>
          )}
        </div>

        {/* 學習統計 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-8">
          <h3 className="text-xl lg:text-2xl font-bold mb-6">學習統計</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="text-center">
              <div className="text-2xl lg:text-4xl font-bold text-blue-600">{profile.totalHours}</div>
              <div className="text-xs lg:text-sm text-gray-600">總學習時數</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-4xl font-bold text-green-600">{profile.completedCourses}</div>
              <div className="text-xs lg:text-sm text-gray-600">完成課程</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-4xl font-bold text-purple-600">{profile.certificates}</div>
              <div className="text-xs lg:text-sm text-gray-600">獲得成就</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-4xl font-bold text-orange-600">{profile.skillsGrowth}%</div>
              <div className="text-xs lg:text-sm text-gray-600">技能提升</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
