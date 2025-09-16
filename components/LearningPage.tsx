import React, { useState } from 'react';
import { Play, CheckCircle, Clock, Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
const YoutubeIcon = 'data:image/jpeg;base64,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'
const HahowIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8FraIA0bQAqJxUvrXB6eYA0bPc+PQAzq8Ap5v6/v4Azq5bw7vW8O7o9/Z+zsjv/PqQ59ia6dw3176/8enP9e+i29ex39tuyMHh9PKH0csRsaaZ2NMptKqz4t85uK/N7Oq07+VR3Mdw4c4/2MBr4c258Oaq7OF749PW9/F+7myVAAADaklEQVR4nO3caXuiMBSG4ZK0GBAVRUetO1rr/P8/OKaOXSyrJTmH9H2+u9zXCViW8vCAEEIIIYQQQgghhBBCCCGEEEIIIYQQy3rTkPorGK0XBcGM+ksYrBdJz/Meqb+GsS4+d4Xz/z5XhfPZ1eemsD+QH0AHhfHA++RzT/h1fu4J+zfzc00YP3/3uSQMM33uCMNlps8VYbhc5PjcEBb5XBDmr083hOG0aH4OCKerEl/LhetNqa/VwnXZ+my5sNL8Wiys7Gup8Km6r5XC7Sao7mujcFZjfq0U9moNsI3Cp5ojhJBfEELIPwgh5B+EEPIPQgj5ByGE/IMwX7hLknQ/fJ3ElF+/QvcLhS98XynVFelwzJj5A+E17RTpqEPJKKgB4SXlJyOWk2xMqJEqnVBasmtSeF6w3cOYUpNVs0I9SG7GxoVnY8pqezQgFL4aUZJuMiHUS7VPifqSGeH5rwE2W6MhIaOVakooRPdE6frInFCoPSXsPYNCoV4oZddMCnkQjQqFGlLaLpkVCnWkxL1lWOgL8sNGw0LhHyh1OtNC+k3RuFAo4nVqXuinlD4bQur9qQWhoN3Z2BDSDtGGUCTOCxXl4bAVIenu1IpQ+IS/iXaElKc07AgpfzAsCf2560LCZWprhnR7U0tCIcie+mJLqMiuLFoTkm2ItoR0G6I1oXBdKBTVZVN7QqpdjT3hznkh1VlFa0Kf6iqNNSHZ4YU9IdUZRQghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEII7xPK6PrKxHdSKDfvVx8mQtUytkIoF+tPLw1faxlbIJSr9e2r6xjZC+VmmvHycCSUG8Lz/HJunwyHFY2shdL7U/AW8VBVWauMhcU+nZ5jqZGtUC6WFW7vjcvXKlOh9Kr4dPGpxMhSWN2n658KlypDYT2frrMvmCM7ofSe73jGTGefO0dmQilndz5DJ9fISii9e326/kumkZFQeoMfPgPpb5aRj1AOGrg9a5J+M3IRyqihZ1hNDjdGHkI5a/D2ups5chDKaNvsm5+NnIRB1Gv+7ccHxUUoTfh040RxEBrz6XYXI6UweNya/ZDjm5FIGMtgtTX/Mcekm5D9FylCCCGEEEIIIYQQQgghhBBCCCGEEEIu9Q9EWVKU8SsuOAAAAABJRU5ErkJggg=='
const UdemyIcon =  'https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_200_200/company-logo_200_200/0/1723593046388/udemy_logo?e=2147483647&v=beta&t=_tl_e0tunbg9SkCl3nXHQEaQu4FlCGi4UU2chO9yBRs'

interface UserProfile {
  name: string;
  education: string;
  skills: string[];
  experience: string[];
}

interface LearningPageProps {
  userProfile: UserProfile;
  onCourseSelect?: (platform: 'youtube' | 'hahow' | 'udemy') => void;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  students: number;
  price: string;
  platform: 'youtube' | 'hahow' | 'udemy';
  thumbnail: string;
  progress: number;
  tags: string[];
}

export function LearningPage({ userProfile, onCourseSelect }: LearningPageProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'youtube' | 'hahow' | 'udemy'>('youtube');
  const [selectedJob, setSelectedJob] = useState('Python 後端工程師');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6; // 每頁顯示6個課程

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: YoutubeIcon, color: 'border-red-500' },
    { id: 'hahow', name: 'Hahow', icon: HahowIcon, color: 'border-green-500' },
    { id: 'udemy', name: 'Udemy', icon: UdemyIcon, color: 'border-purple-500' }
  ];

  // 擴展課程數據，每個平台有更多課程
  const mockCourses: Course[] = [
    // YouTube 課程
    {
      id: '1',
      title: 'Python 基礎程式設計完整教學',
      instructor: '彭彭',
      duration: '12hr 30m',
      rating: 4.8,
      students: 15420,
      price: 'Free',
      platform: 'youtube',
      thumbnail: '/api/placeholder/300/200',
      progress: 65,
      tags: ['Python', 'Basic', 'Programming']
    },
    {
      id: '4',
      title: 'Django 網頁框架入門到精通',
      instructor: '技術達人',
      duration: '15hr 20m',
      rating: 4.9,
      students: 8930,
      price: 'Free',
      platform: 'youtube',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Django', 'Web Framework', 'Python']
    },
    {
      id: '6',
      title: 'Flask 輕量級網頁開發',
      instructor: '程式教學頻道',
      duration: '8hr 45m',
      rating: 4.7,
      students: 12340,
      price: 'Free',
      platform: 'youtube',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Flask', 'Web Development', 'Python']
    },
    {
      id: '7',
      title: 'Python 爬蟲技術實戰',
      instructor: '數據分析師',
      duration: '10hr 15m',
      rating: 4.6,
      students: 9876,
      price: 'Free',
      platform: 'youtube',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Python', 'Web Scraping', 'Data']
    },
    {
      id: '8',
      title: 'Python 機器學習入門',
      instructor: 'AI研究員',
      duration: '20hr 30m',
      rating: 4.8,
      students: 18500,
      price: 'Free',
      platform: 'youtube',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Python', 'Machine Learning', 'AI']
    },
    {
      id: '9',
      title: 'Python 自動化腳本開發',
      instructor: '自動化專家',
      duration: '6hr 20m',
      rating: 4.5,
      students: 7890,
      price: 'Free',
      platform: 'youtube',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Python', 'Automation', 'Scripts']
    },
    {
      id: '10',
      title: 'Python 資料庫操作實戰',
      instructor: '後端工程師',
      duration: '9hr 10m',
      rating: 4.7,
      students: 11200,
      price: 'Free',
      platform: 'youtube',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Python', 'Database', 'SQL']
    },
    // Hahow 課程
    {
      id: '2',
      title: '資料庫設計 - 有效的使用系統資料',
      instructor: '專業講師',
      duration: '10hr 0m',
      rating: 4.8,
      students: 1250,
      price: 'NT$ 2,400',
      platform: 'hahow',
      thumbnail: '/api/placeholder/300/200',
      progress: 21,
      tags: ['MySQL', 'Database']
    },
    {
      id: '5',
      title: 'JavaScript 現代前端開發',
      instructor: '前端專家',
      duration: '20hr 15m',
      rating: 4.6,
      students: 12500,
      price: 'NT$ 1,200',
      platform: 'hahow',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['JavaScript', 'Frontend', 'Modern']
    },
    {
      id: '11',
      title: 'React 完整開發指南',
      instructor: 'React專家',
      duration: '25hr 30m',
      rating: 4.9,
      students: 8900,
      price: 'NT$ 3,200',
      platform: 'hahow',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['React', 'Frontend', 'JavaScript']
    },
    {
      id: '12',
      title: 'Node.js 後端開發實戰',
      instructor: '後端達人',
      duration: '18hr 45m',
      rating: 4.7,
      students: 6750,
      price: 'NT$ 2,800',
      platform: 'hahow',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Node.js', 'Backend', 'JavaScript']
    },
    {
      id: '13',
      title: 'Vue.js 從零開始',
      instructor: 'Vue專家',
      duration: '22hr 10m',
      rating: 4.8,
      students: 5400,
      price: 'NT$ 2,600',
      platform: 'hahow',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Vue.js', 'Frontend', 'JavaScript']
    },
    {
      id: '14',
      title: '全端開發完整訓練',
      instructor: '全端工程師',
      duration: '45hr 20m',
      rating: 4.9,
      students: 3200,
      price: 'NT$ 4,800',
      platform: 'hahow',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Full Stack', 'Web Development', 'Complete']
    },
    // Udemy 課程
    {
      id: '3',
      title: 'Complete Python Developer Bootcamp',
      instructor: 'Dr. Angela Yu',
      duration: '100hr+',
      rating: 4.7,
      students: 89342,
      price: 'NT$ 1,790',
      platform: 'udemy',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Python', 'Web Development', 'Advanced']
    },
    {
      id: '15',
      title: 'The Complete JavaScript Course 2024',
      instructor: 'Jonas Schmedtmann',
      duration: '69hr',
      rating: 4.8,
      students: 156789,
      price: 'NT$ 1,590',
      platform: 'udemy',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['JavaScript', 'Frontend', 'Complete']
    },
    {
      id: '16',
      title: 'React - The Complete Guide 2024',
      instructor: 'Maximilian Schwarzmüller',
      duration: '48hr',
      rating: 4.9,
      students: 234567,
      price: 'NT$ 1,690',
      platform: 'udemy',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['React', 'Frontend', 'Complete']
    },
    {
      id: '17',
      title: 'Machine Learning A-Z',
      instructor: 'Kirill Eremenko',
      duration: '44hr',
      rating: 4.6,
      students: 123456,
      price: 'NT$ 1,890',
      platform: 'udemy',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Machine Learning', 'Data Science', 'Python']
    },
    {
      id: '18',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      duration: '65hr',
      rating: 4.8,
      students: 198765,
      price: 'NT$ 1,790',
      platform: 'udemy',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['Web Development', 'Full Stack', 'Complete']
    },
    {
      id: '19',
      title: 'AWS Certified Solutions Architect',
      instructor: 'Stephane Maarek',
      duration: '26hr',
      rating: 4.7,
      students: 87654,
      price: 'NT$ 2,090',
      platform: 'udemy',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      tags: ['AWS', 'Cloud', 'Architecture']
    }
  ];

  const filteredCourses = mockCourses.filter(course => course.platform === selectedPlatform);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 當平台改變時重置頁碼
  const handlePlatformChange = (platform: 'youtube' | 'hahow' | 'udemy') => {
    setSelectedPlatform(platform);
    setCurrentPage(1);
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="bg-white border border-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* 課程封面 */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-16 h-16 text-white bg-black/50 rounded-full p-4" />
        </div>
        {course.progress > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
            {course.progress}% 完成
          </div>
        )}
      </div>

      {/* 課程資訊 */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{course.title}</h3>
        
        {/* 標籤 */}
        <div className="flex flex-wrap gap-2 mb-3">
          {course.tags.map((tag, index) => (
            <span key={index} className={`px-2 py-1 rounded-xl text-xs ${
              course.platform === 'youtube' ? 'bg-red-100 text-red-800' :
              course.platform === 'hahow' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {tag}
            </span>
          ))}
        </div>

        {/* 講師與評分 */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">by {course.instructor}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{course.rating}</span>
          </div>
        </div>

        {/* 課程詳情 */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <span>{course.students.toLocaleString()} 位學生</span>
        </div>

        {/* 進度條 */}
        {course.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">學習進度</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* 價格與按鈕 */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{course.price}</span>
          <button 
            onClick={() => onCourseSelect && onCourseSelect(course.platform)}
            className={`px-4 py-2 rounded-lg text-white font-medium text-sm lg:px-6 lg:text-base ${
              course.platform === 'youtube' ? 'bg-red-500 hover:bg-red-600' :
              course.platform === 'hahow' ? 'bg-green-500 hover:bg-green-600' :
              'bg-purple-500 hover:bg-purple-600'
            } transition-colors`}
          >
            {course.progress > 0 ? '繼續學習' : '開始學習'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#eefaff] min-h-[calc(100vh-100px)] p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* 職業選擇 */}
        <div className="flex flex-col lg:flex-row lg:items-center mb-8 space-y-4 lg:space-y-0">
          <span className="text-xl lg:text-3xl text-black/70 lg:mr-4">選擇職業:</span>
          <select 
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="bg-white border border-black/20 rounded px-4 py-2 lg:px-6 lg:py-3 text-base lg:text-xl min-w-[300px]"
          >
            <option>Python 後端工程師</option>
            <option>Frontend 開發工程師</option>
            <option>Full Stack 開發工程師</option>
            <option>資料分析師</option>
          </select>
        </div>

        {/* 平台選擇 */}
        <div className="flex flex-col lg:flex-row lg:items-center mb-8 space-y-4 lg:space-y-0">
          <span className="text-xl lg:text-3xl text-black/70 lg:mr-8">選擇平台:</span>
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformChange(platform.id as any)}
                className={`w-24 h-16 lg:w-32 lg:h-20 bg-white rounded-2xl border-4 ${
                  selectedPlatform === platform.id ? platform.color : 'border-gray-300'
                } flex items-center justify-center hover:shadow-lg transition-all`}
              >
                <div 
                  className="w-12 h-8 lg:w-16 lg:h-12 bg-cover bg-center"
                  style={{ backgroundImage: `url('${platform.icon}')` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 課程列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* 分頁 - 修復功能 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 lg:space-x-4 mt-8">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border border-gray-300 ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* 頁碼 */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 lg:px-4 lg:py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border border-gray-300 ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 課程統計信息 */}
        <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
          <span>
            顯示第 {(currentPage - 1) * coursesPerPage + 1} - {Math.min(currentPage * coursesPerPage, filteredCourses.length)} 項，
            共 {filteredCourses.length} 個課程
          </span>
        </div>

        {/* 學習建議 */}
        <div className="bg-white rounded-lg border border-black/20 p-4 lg:p-6 mt-8">
          <h3 className="text-xl font-bold mb-4">AI 學習建議</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">建議優先學習：</h4>
              <ul className="space-y-1 text-sm">
                <li>• Python 基礎語法和數據結構</li>
                <li>• Web 框架 (Django/Flask)</li>
                <li>• 資料庫操作 (SQL)</li>
                <li>• API 設計與開發</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">學習時程建議：</h4>
              <ul className="space-y-1 text-sm">
                <li>• 每週至少 10-15 小時</li>
                <li>• 3-6 個月達到初級水準</li>
                <li>• 搭配實作專案練習</li>
                <li>• 定期複習和測驗</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
