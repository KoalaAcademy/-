import React, { useState } from 'react';
import { Send, Upload, X } from 'lucide-react';
const img6 = "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755603939/%E7%84%A1%E5%B0%BE%E7%86%8A%E5%8A%A9%E7%90%86_1_y7xshi.png"; // 考拉助教大頭照
interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface UserProfile {
  name: string;
  education: string;
  skills: string[];
  experience: string[];
}

interface AIConsultationPageProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

export function AIConsultationPage({ userProfile, setUserProfile }: AIConsultationPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '請告訴我您目前的學歷',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAnalyzing(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, messages.length);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsAnalyzing(false);
      updateUserProfile(inputValue, messages.length);
    }, 1500);
  };

  const generateAIResponse = (input: string, messageCount: number): string => {
    const responses = [
      "很好！請分享您具備的技能或專業能力，例如程式語言、工具使用經驗等。",
      "謝謝您的分享！請告訴我您的工作經驗或相關專案經歷。",
      "根據您提供的資料，我正在分析您的職能匹配度。讓我為您找出最適合的職缺和學習建議。",
      "分析完成！我建議您可以往 Python 後端工程師方向發展。您目前具備基礎條件，建議加強資料庫操作和框架應用能力。"
    ];
    
    return responses[Math.min(messageCount, responses.length - 1)] || 
           "感謝您的分享，我會持續分析您的職能狀況並提供個人化建議。";
  };

  const updateUserProfile = (input: string, messageCount: number) => {
    if (messageCount === 1) {
      setUserProfile(prev => ({ ...prev, education: input }));
    } else if (messageCount === 2) {
      const skills = input.split(/[，,、\s]+/).filter(skill => skill.trim());
      setUserProfile(prev => ({ ...prev, skills }));
    } else if (messageCount === 3) {
      const experience = input.split(/[，,、\s]+/).filter(exp => exp.trim());
      setUserProfile(prev => ({ ...prev, experience }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `已上傳檔案: ${file.name}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fileMessage]);
      setShowFileUpload(false);
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: '我已收到您的檔案，正在分析您的背景資料...',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // 文件上傳彈窗
  const FileUploadModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-2 border-black p-8 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">上傳相關文件</h3>
          <button
            onClick={() => setShowFileUpload(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <Upload className="w-full h-full" />
          </div>
          <p className="text-lg mb-2">拖曳文件到此處或點擊上傳</p>
          <p className="text-gray-500 mb-4">支援 圖片、PDF、DOC、DOCX</p>
          
          <label className="inline-block bg-yellow-200 border border-black px-6 py-3 rounded-lg cursor-pointer hover:bg-yellow-300 transition-colors">
            <span className="text-lg font-medium">選擇文件</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#eefaff] min-h-[calc(100vh-100px)] p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* AI助理頭像區域 - 居中設計 */}
        <div className="flex justify-center mb-8">
          <div className="relative text-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white border-4 lg:border-8 border-white shadow-lg overflow-hidden mx-auto">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${img6}')` }}
              />

            </div>
            <div className="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 w-4 h-4 lg:w-6 lg:h-6 bg-[#00B11B] rounded-full border-2 border-[#00582C]"></div>
            <div className="mt-3">
              <span className="text-lg lg:text-xl text-black/70 font-medium">考拉助教</span>
            </div>
          </div>
        </div>

        {/* 對話區域 */}
        <div className="bg-white rounded-lg border border-black/20 p-4 lg:p-6 mb-6 min-h-[300px] lg:min-h-[400px] max-h-[400px] lg:max-h-[500px] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-xs lg:max-w-md px-3 lg:px-4 py-2 lg:py-3 rounded-3xl ${
                    message.type === 'user' 
                      ? 'bg-[#FFF1AB] border border-black/50' 
                      : 'bg-white border border-black/50'
                  }`}
                >
                  <p className="text-base lg:text-lg">{message.content}</p>
                  <small className="text-xs text-gray-500 block mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))}
            {isAnalyzing && (
              <div className="flex justify-start">
                <div className="bg-white border border-black/50 rounded-3xl px-3 lg:px-4 py-2 lg:py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 輸入區域 */}
        <div className="bg-[#a1deff] border border-black/50 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button 
              onClick={() => setShowFileUpload(true)}
              className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors border border-blue-300 flex-shrink-0"
            >
              <Upload className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="請輸入內容"
                className="w-full bg-[#eefaff] border border-black/50 rounded-full px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg placeholder-black/60"
              />
            </div>
            
            <button 
              onClick={handleSendMessage}
              className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors flex-shrink-0"
            >
              <Send className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </button>
          </div>
        </div>

        {/* 用戶資料預覽 */}
        {(userProfile.education || userProfile.skills.length > 0) && (
          <div className="mt-6 bg-white rounded-lg border border-black/20 p-4">
            <h3 className="text-base lg:text-lg font-bold mb-3">目前收集到的資料：</h3>
            <div className="space-y-2 text-sm lg:text-base">
              {userProfile.education && (
                <p><strong>學歷：</strong> {userProfile.education}</p>
              )}
              {userProfile.skills.length > 0 && (
                <p><strong>技能：</strong> {userProfile.skills.join(', ')}</p>
              )}
              {userProfile.experience.length > 0 && (
                <p><strong>經驗：</strong> {userProfile.experience.join(', ')}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 文件上傳彈窗 */}
      {showFileUpload && <FileUploadModal />}
    </div>
  );
}
