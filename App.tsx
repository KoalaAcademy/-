"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { AIConsultationPage } from "./components/AIConsultationPage"
import { JobMatchingPage } from "./components/JobMatchingPage"
import { GrowthDashboard } from "./components/GrowthDashboard"
import { LearningPage } from "./components/LearningPage"
import { ProfilePage } from "./components/ProfilePage"
import { LearningRecordPage } from "./components/LearningRecordPage"

// 改成實際的圖片網址
const imgLogo = "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755599991/LOGO_ptjzjy.png" // 網站LOGO
const img =
  "https://res.cloudinary.com/dhcrtfirv/image/upload/v1755606141/%E9%A0%90%E8%A8%AD%E5%AD%B8%E5%93%A1%E5%A4%A7%E9%A0%AD%E7%85%A7_kwf8m3.png" // 學生大頭照

type PageType = "consultation" | "jobMatching" | "dashboard" | "learning" | "profile" | "learningRecord"
type Platform = "youtube" | "hahow" | "udemy"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("consultation")
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("youtube")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "Alen 學員",
    education: "",
    skills: [] as string[],
    experience: [] as string[],
  })

  const navigationItems = [
    { id: "consultation", label: "職能分析" },
    { id: "jobMatching", label: "職缺比對" },
    { id: "dashboard", label: "成長儀錶板" },
  ]

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
  }

  const Header = () => (
    <header className="bg-[#eefaff] border-b border-black/20 p-4 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={imgLogo || "/placeholder.svg"}
            alt="SKILL FLOW Logo"
            className="h-[50px] w-[150px] lg:h-[60px] lg:w-[200px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setCurrentPage("consultation")}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as PageType)}
              className={`text-xl lg:text-2xl tracking-[2px] lg:tracking-[4px] transition-colors whitespace-nowrap px-4 py-2 rounded-lg ${
                currentPage === item.id
                  ? "text-[#1e9fa9] font-bold bg-white/50 border border-[#1e9fa9]/30"
                  : "text-black hover:text-[#1e9fa9] hover:bg-white/30"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage("learning")}
            className="bg-[#05c6d5] text-white px-4 py-2 lg:px-6 lg:py-3 text-lg lg:text-xl tracking-[2px] lg:tracking-[3px] border border-[#05c6d5] shadow-lg hover:bg-[#04b5c4] transition-all duration-300 transform hover:scale-105 rounded-lg font-medium"
          >
            開始學習
          </button>
          <div className="flex flex-col items-center">
            <img
              src={img || "/placeholder.svg"}
              alt="User Avatar"
              onClick={() => setCurrentPage("profile")}
              className={`w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-full border-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                currentPage === "profile" ? "border-[#1e9fa9]" : "border-white hover:border-[#1e9fa9]"
              }`}
            />
            <span className="text-xs lg:text-sm text-black/70 mt-1 font-medium">{userProfile.name}</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-12 h-12 flex items-center justify-center text-black hover:text-[#1e9fa9] transition-colors rounded-lg hover:bg-white/30"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">選單</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <nav className="p-6">
              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id as PageType)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                      currentPage === item.id
                        ? "bg-[#1e9fa9] text-white font-bold shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-gray-200 pt-4 mt-6 space-y-3">
                  <button
                    onClick={() => handlePageChange("learning")}
                    className="w-full bg-[#05c6d5] text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-[#04b5c4] transition-all duration-300 shadow-md"
                  >
                    開始學習
                  </button>
                  <button
                    onClick={() => handlePageChange("profile")}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt="User Avatar"
                      className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="text-left">
                      <div className="font-medium">{userProfile.name}</div>
                      <div className="text-sm text-gray-500">個人檔案</div>
                    </div>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )

  const renderPage = () => {
    switch (currentPage) {
      case "consultation":
        return <AIConsultationPage userProfile={userProfile} setUserProfile={setUserProfile} />
      case "jobMatching":
        return (
          <JobMatchingPage
            userProfile={userProfile}
            onStartLearning={() => setCurrentPage("learning")}
            onViewLearningRecord={() => setCurrentPage("learningRecord")}
          />
        )
      case "dashboard":
        return <GrowthDashboard userProfile={userProfile} onStartLearning={() => setCurrentPage("learning")} />
      case "learning":
        return (
          <LearningPage
            userProfile={userProfile}
            onCourseSelect={(platform) => {
              setSelectedPlatform(platform)
              setCurrentPage("learningRecord")
            }}
          />
        )
      case "profile":
        return (
          <ProfilePage
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onBack={() => setCurrentPage("consultation")}
          />
        )
      case "learningRecord":
        return <LearningRecordPage platform={selectedPlatform} onBack={() => setCurrentPage("learning")} />
      default:
        return <AIConsultationPage userProfile={userProfile} setUserProfile={setUserProfile} />
    }
  }

  return (
    <div className="min-h-screen bg-[#eefaff] w-full">
      <Header />
      <main className="max-w-7xl mx-auto w-full">{renderPage()}</main>
    </div>
  )
}
