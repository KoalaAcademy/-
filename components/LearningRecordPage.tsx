"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, Settings, CheckCircle, X, Upload, Plus } from "lucide-react"
const exampleImage =
  "https://images.ctfassets.net/kftzwdyauwt9/6iIFQWljkBQ1loe6iH6mDm/de19507b7e71a625bad9e4ea3267a269/oai_invideo_hero.png?w=3840&q=90&fm=webp" // 預設影片預覽圖
interface LearningRecordPageProps {
  courseId?: string
  platform?: "youtube" | "hahow" | "udemy"
  onBack: () => void
}

interface VideoProgress {
  currentTime: number
  duration: number
  progress: number
}

interface LessonNote {
  id: string
  lessonId: string
  content: string
  timestamp: number
  createdAt: Date
}

interface CourseLesson {
  id: string
  title: string
  duration: string
  completed: boolean
  progress: number
}

interface NotificationSettings {
  enabled: boolean
  email: string
  times: string[]
}

export function LearningRecordPage({ courseId = "1", platform = "youtube", onBack }: LearningRecordPageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState<VideoProgress>({
    currentTime: 0,
    duration: 3600,
    progress: 35,
  })
  const [currentNote, setCurrentNote] = useState("")
  const [notes, setNotes] = useState<LessonNote[]>([])
  const [selectedLessonId, setSelectedLessonId] = useState("3")
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState("所有章節")
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enabled: false,
    email: "",
    times: [],
  })
  const [newTime, setNewTime] = useState("")
  const [courseLessons, setCourseLessons] = useState<CourseLesson[]>([
    { id: "1", title: "第1章：Python基礎語法", duration: "35分鐘", completed: true, progress: 100 },
    { id: "2", title: "第2章：資料結構與演算法", duration: "42分鐘", completed: false, progress: 0 },
    { id: "3", title: "第3章：物件導向程式設計", duration: "38分鐘", completed: false, progress: 65 },
    { id: "4", title: "第4章：檔案處理與例外處理", duration: "45分鐘", completed: false, progress: 0 },
    { id: "5", title: "第5章：模組與套件", duration: "50分鐘", completed: false, progress: 0 },
    { id: "6", title: "第6章：網路程式設計", duration: "55分鐘", completed: false, progress: 0 },
  ])

  const playerRef = useRef<any>(null)
  const [youtubeVideoId, setYoutubeVideoId] = useState("dQw4w9WgXcQ") // Example video ID
  const [lastProgressUpdate, setLastProgressUpdate] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentLesson = courseLessons.find((lesson) => lesson.id === selectedLessonId) || courseLessons[2]

  const sendProgressToFlask = async (currentTime: number, duration: number, lessonId: string) => {
    try {
      const response = await fetch("/api/learning-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          lessonId,
          currentTime,
          duration,
          progress: (currentTime / duration) * 100,
          platform: "youtube",
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        console.error("Failed to save progress to Flask backend")
      }
    } catch (error) {
      console.error("Error sending progress to Flask:", error)
    }
  }

  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    progressIntervalRef.current = setInterval(() => {
      if (isPlaying && playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime?.() || videoProgress.currentTime
        const duration = playerRef.current.getDuration?.() || videoProgress.duration

        setVideoProgress((prev) => {
          const newProgress = Math.min((currentTime / duration) * 100, 100)
          return {
            currentTime,
            duration,
            progress: newProgress,
          }
        })

        if (currentTime - lastProgressUpdate >= 10) {
          sendProgressToFlask(currentTime, duration, selectedLessonId)
          setLastProgressUpdate(currentTime)
        }

        if (currentTime / duration >= 0.9) {
          setCourseLessons((prev) =>
            prev.map((lesson) =>
              lesson.id === selectedLessonId ? { ...lesson, completed: true, progress: 100 } : lesson,
            ),
          )
        }
      }
    }, 1000)

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying, selectedLessonId, lastProgressUpdate])

  const onYouTubePlayerReady = (event: any) => {
    playerRef.current = event.target
  }

  const onYouTubePlayerStateChange = (event: any) => {
    setIsPlaying(event.data === 1)
  }

  useEffect(() => {
    if (platform === "youtube") {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
      ;(window as any).onYouTubeIframeAPIReady = () => {
        ;new (window as any).YT.Player("youtube-player", {
          height: "100%",
          width: "100%",
          videoId: youtubeVideoId,
          events: {
            onReady: onYouTubePlayerReady,
            onStateChange: onYouTubePlayerStateChange,
          },
        })
      }
    }
  }, [youtubeVideoId, platform])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSaveNote = () => {
    if (currentNote.trim()) {
      const newNote: LessonNote = {
        id: Date.now().toString(),
        lessonId: selectedLessonId,
        content: currentNote,
        timestamp: videoProgress.currentTime,
        createdAt: new Date(),
      }
      setNotes((prev) => [...prev, newNote])
      setCurrentNote("")
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    const newTime = clickPosition * videoProgress.duration
    setVideoProgress((prev) => ({
      ...prev,
      currentTime: newTime,
      progress: clickPosition * 100,
    }))
  }

  const handleLessonToggle = (lessonId: string) => {
    setCourseLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, completed: !lesson.completed, progress: !lesson.completed ? 100 : 0 }
          : lesson,
      ),
    )
  }

  const handleSelectAll = () => {
    const allCompleted = courseLessons.every((lesson) => lesson.completed)
    setCourseLessons((prev) =>
      prev.map((lesson) => ({
        ...lesson,
        completed: !allCompleted,
        progress: !allCompleted ? 100 : 0,
      })),
    )
  }

  const handleAddTime = () => {
    if (newTime && !notificationSettings.times.includes(newTime)) {
      setNotificationSettings((prev) => ({
        ...prev,
        times: [...prev.times, newTime],
      }))
      setNewTime("")
    }
  }

  const handleRemoveTime = (timeToRemove: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      times: prev.times.filter((time) => time !== timeToRemove),
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("檔案上傳:", file.name)
      setShowFileUpload(false)
    }
  }

  const isPaidCourse = platform === "hahow" || platform === "udemy"

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
  )

  const NotificationModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">定期學習通知</h3>
          <button
            onClick={() => setShowNotificationModal(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notificationSettings.enabled}
                onChange={(e) => setNotificationSettings((prev) => ({ ...prev, enabled: e.target.checked }))}
                className="w-5 h-5"
              />
              <span>啟用學習提醒</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">電子郵件</label>
            <input
              type="email"
              value={notificationSettings.email}
              onChange={(e) => setNotificationSettings((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="請輸入您的電子郵件"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">提醒時間</label>
            <div className="flex space-x-2 mb-3">
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleAddTime}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {notificationSettings.times.map((time, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
                  <span>{time}</span>
                  <button onClick={() => handleRemoveTime(time)} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
          <button
            onClick={() => setShowNotificationModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
          >
            取消
          </button>
          <button
            onClick={() => setShowNotificationModal(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto"
          >
            確認設定
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#eefaff]">
      {isPaidCourse ? (
        <div className="p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
              <h1 className="text-xl lg:text-2xl font-bold">30天學會Python實戰課程</h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={onBack}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm lg:text-base"
                >
                  ← 回到學習頁面
                </button>
                <button
                  onClick={() => window.open("https://hahow.in", "_blank")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm lg:text-base"
                >
                  課程連結
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                  <h3 className="text-lg font-bold text-green-600">章節進度</h3>
                  <select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
                  >
                    <option>所有章節</option>
                    <option>第1章</option>
                    <option>第2章</option>
                    <option>第3章</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={courseLessons.every((lesson) => lesson.completed)}
                      onChange={handleSelectAll}
                    />
                    <span className="font-medium">全選</span>
                  </label>

                  {courseLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={lesson.completed}
                        onChange={() => handleLessonToggle(lesson.id)}
                        className="w-5 h-5"
                      />
                      <div className="flex-1">
                        <span className={lesson.completed ? "text-green-600 line-through" : "text-gray-800"}>
                          {lesson.title}
                        </span>
                      </div>
                      {lesson.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">已完成章節</span>
                    <span>
                      {courseLessons.filter((lesson) => lesson.completed).length}/{courseLessons.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-black h-3 rounded-full"
                      style={{
                        width: `${(courseLessons.filter((lesson) => lesson.completed).length / courseLessons.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                <h3 className="text-lg font-bold mb-4">定期學習通知</h3>

                <label className="flex items-center space-x-3 mb-6">
                  <input
                    type="checkbox"
                    checked={notificationSettings.enabled}
                    onChange={(e) => setNotificationSettings((prev) => ({ ...prev, enabled: e.target.checked }))}
                    className="w-5 h-5"
                  />
                  <span>啟用學習提醒</span>
                </label>

                <button
                  onClick={() => setShowNotificationModal(true)}
                  className="w-full bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition-colors text-sm lg:text-base"
                >
                  定期通知學習
                </button>

                {notificationSettings.times.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">已設定時間：</h4>
                    <div className="space-y-2">
                      {notificationSettings.times.map((time, index) => (
                        <div key={index} className="bg-green-50 p-2 rounded text-sm">
                          每日 {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row h-screen">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-black relative">
              {platform === "youtube" ? (
                <div id="youtube-player" className="w-full h-full"></div>
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: `url('${exampleImage}')` }}
                >
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white ml-1" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </button>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 lg:p-6 pointer-events-none">
                <div className="pointer-events-auto">
                  <div className="mb-4">
                    <div className="text-white text-sm mb-2">觀看進度 (自動追蹤)</div>
                    <div className="w-full bg-gray-600 rounded-full h-2 cursor-pointer" onClick={handleProgressClick}>
                      <div
                        className="bg-blue-500 h-2 rounded-full relative transition-all duration-300"
                        style={{ width: `${videoProgress.progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-white hover:text-blue-400 transition-colors"
                        onClick={() => playerRef.current?.seekTo(Math.max(0, videoProgress.currentTime - 10))}
                      >
                        <SkipBack className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => {
                          if (playerRef.current) {
                            isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()
                          }
                          setIsPlaying(!isPlaying)
                        }}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                      </button>
                      <button
                        className="text-white hover:text-blue-400 transition-colors"
                        onClick={() =>
                          playerRef.current?.seekTo(Math.min(videoProgress.duration, videoProgress.currentTime + 10))
                        }
                      >
                        <SkipForward className="w-6 h-6" />
                      </button>
                      <button className="text-white hover:text-blue-400 transition-colors">
                        <Volume2 className="w-6 h-6" />
                      </button>
                      <span className="text-white text-sm">
                        {formatTime(Math.floor(videoProgress.currentTime))} / {formatTime(videoProgress.duration)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-white text-sm font-medium hidden lg:block">{currentLesson.title}</span>
                      <div className="text-white text-xs bg-green-500 px-2 py-1 rounded">自動追蹤中</div>
                      <button className="text-white hover:text-blue-400 transition-colors">
                        <Settings className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-t border-gray-200 p-4 lg:p-6">
              <h3 className="font-bold text-lg mb-4">筆記專區</h3>

              <div className="mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="在此輸入學習筆記..."
                    rows={4}
                    className="w-full resize-none outline-none"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleSaveNote}
                      className="bg-black text-white px-6 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
                    >
                      儲存筆記
                    </button>
                  </div>
                </div>
              </div>

              {notes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">已保存的筆記</h4>
                  <div className="space-y-3 max-h-32 overflow-y-auto">
                    {notes.map((note) => (
                      <div key={note.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-yellow-600 font-medium">{formatTime(note.timestamp)}</span>
                          <span className="text-xs text-gray-500">{note.createdAt.toLocaleString()}</span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 order-first lg:order-last">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold">課程大綱</h3>
              <div className="text-sm text-green-600 mt-1">✓ 自動追蹤學習進度</div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {courseLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center space-x-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={lesson.completed}
                        onChange={() => handleLessonToggle(lesson.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          lesson.completed
                            ? "bg-green-500 border-green-500"
                            : lesson.id === selectedLessonId
                              ? "bg-yellow-200 border-yellow-400"
                              : "border-gray-300"
                        }`}
                      >
                        {lesson.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        {lesson.id === selectedLessonId && !lesson.completed && (
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        )}
                      </div>
                    </label>

                    <button
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`flex-1 text-left p-2 rounded transition-colors ${
                        selectedLessonId === lesson.id ? "bg-yellow-100 border border-yellow-300" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-medium text-sm">{lesson.title}</div>
                      <div className="text-xs text-gray-500 mt-1">進度: {lesson.progress}%</div>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setShowNotificationModal(true)}
                  className="w-full bg-[#06C755] text-white rounded-full px-6 py-3 flex items-center justify-center space-x-2 hover:bg-[#05b84f] transition-colors"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#06C755] font-bold text-sm">LINE</span>
                  </div>
                  <span className="text-sm lg:text-base">定期通知學習</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFileUpload && <FileUploadModal />}
      {showNotificationModal && <NotificationModal />}
    </div>
  )
}
