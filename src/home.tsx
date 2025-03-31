import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Header from "@_components/header"
import { Sparkles, QrCode, BarChart3 } from "lucide-react";


export default function Home() {
  const router = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)

  // School, grade, subject, and chapter data
  const schools = ["초등학교", "중학교", "고등학교"]
  const grades = {
    초등학교: ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"],
    중학교: ["1학년", "2학년", "3학년"],
    고등학교: ["1학년", "2학년", "3학년"],
  }
  const subjects = {
    초등학교: ["국어", "수학", "사회", "과학", "영어"],
    중학교: ["국어", "수학", "영어", "과학", "사회", "역사"],
    고등학교: ["국어", "수학", "영어", "물리", "화학", "생물", "지구과학", "한국사", "세계사", "경제", "윤리"],
  }

  // State for selections
  const [selectedSchool, setSelectedSchool] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedChapter, setSelectedChapter] = useState("")

  // Mock chapters based on subject selection
  const getChapters = () => {
    if (!selectedSubject) return []

    // This would normally come from an API or database
    const mockChapters = {
      국어: ["문학", "문법", "작문", "독해"],
      수학: ["수와 연산", "도형", "측정", "규칙성", "자료와 가능성"],
      영어: ["듣기", "말하기", "읽기", "쓰기", "문법"],
      과학: ["물질", "생명", "지구", "우주", "에너지"],
    }

    return mockChapters[selectedSubject as keyof typeof mockChapters] || []
  }

  const handleGenerateQuiz = () => {
    if (selectedSchool && selectedGrade && selectedSubject && selectedChapter) {
      // In a real app, this would create a quiz and redirect to it
      router.push(
        `/quiz/demo?school=${selectedSchool}&grade=${selectedGrade}&subject=${selectedSubject}&chapter=${selectedChapter}`,
      )
    } else {
      alert("모든 항목을 선택해주세요.")
    }
  }

  return (
    <main class="min-h-screen flex flex-col">
      <Header />

      <div class="flex-grow flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
        <div class="card w-full mb-8">
          <h2 class="section-title">자동 문제 생성</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* School selection */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">학교 단위</label>
              <select
                class="input-field w-full"
                value={selectedSchool}
                onChange={(e) => {
                  setSelectedSchool(e.target.value)
                  setSelectedGrade("")
                  setSelectedSubject("")
                  setSelectedChapter("")
                }}
              >
                <option value="">선택하세요</option>
                {schools.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade selection */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">학년</label>
              <select
                class="input-field w-full"
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value)
                  setSelectedSubject("")
                  setSelectedChapter("")
                }}
                disabled={!selectedSchool}
              >
                <option value="">선택하세요</option>
                {selectedSchool &&
                  grades[selectedSchool as keyof typeof grades]?.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
              </select>
            </div>

            {/* Subject selection */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">과목</label>
              <select
                class="input-field w-full"
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value)
                  setSelectedChapter("")
                }}
                disabled={!selectedGrade}
              >
                <option value="">선택하세요</option>
                {selectedSchool &&
                  subjects[selectedSchool as keyof typeof subjects]?.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
              </select>
            </div>

            {/* Chapter selection */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">단원명</label>
              <select
                class="input-field w-full"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                disabled={!selectedSubject}
              >
                <option value="">선택하세요</option>
                {getChapters().map((chapter) => (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div class="flex justify-center mt-6">
            <button class="btn-primary text-lg px-8 py-3" onClick={handleGenerateQuiz} disabled={!selectedChapter}>
              문제 생성하기
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="card text-center">
            <div className="mb-2">
              <Sparkles className="h-12 w-12 mx-auto text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">자동 문제 생성</h3>
            <p className="text-gray-600">AI를 활용한 4지선다형 또는 OX 문제를 자동으로 생성합니다.</p>
          </div>

          <div className="card text-center">
            <div className="mb-2">
              <QrCode className="h-12 w-12 mx-auto text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">QR 코드 공유</h3>
            <p className="text-gray-600">선생님은 생성된 퀴즈를 QR 코드로 학생들과 쉽게 공유할 수 있습니다.</p>
          </div>

          <div className="card text-center">
            <div className="mb-2">
              <BarChart3 className="h-12 w-12 mx-auto text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">성적 분석</h3>
            <p className="text-gray-600">정답률, 난이도, 출석률 등 상세한 리포트를 제공합니다.</p>
          </div>

        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
            <h2 class="text-2xl font-bold mb-6 dark:text-white">로그인</h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input type="email" class="input-field w-full" placeholder="이메일을 입력하세요" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input type="password" class="input-field w-full" placeholder="비밀번호를 입력하세요" />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  <label htmlFor="remember-me" class="ml-2 block text-sm text-gray-700">
                    로그인 상태 유지
                  </label>
                </div>

                <div class="text-sm">
                  <a to="#" class="text-indigo-600 hover:text-indigo-500">
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
              </div>

              <div class="flex justify-between mt-6">
                <button class="btn-outline" onClick={() => setShowLoginModal(false)}>
                  취소
                </button>
                <button
                  class="btn-primary"
                  onClick={() => {
                    // In a real app, this would authenticate the user
                    router.push("/dashboard")
                  }}
                >
                  로그인
                </button>
              </div>

              <div class="mt-4 flex items-center justify-center">
                <span class="text-sm text-gray-600">계정이 없으신가요?</span>
                <Link to="/register" class="ml-1 text-sm text-indigo-600 hover:text-indigo-500">
                  회원가입
                </Link>
              </div>

              <div class="mt-4">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500">또는</span>
                  </div>
                </div>

                <div class="mt-4 grid grid-cols-2 gap-3">
                  <button class="btn-outline flex items-center justify-center">
                    <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.839c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Google
                  </button>
                  <button class="btn-outline flex items-center justify-center">
                    <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Kakao
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}