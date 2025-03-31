import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "@_components/header"

export default function CreateQuiz() {
  const router = useNavigate()

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
  const [quizType, setQuizType] = useState<"multiple" | "truefalse">("multiple")
  const [questionCount, setQuestionCount] = useState(5)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [timeLimit, setTimeLimit] = useState(0) // 0 means no time limit
  const [showQRCode, setShowQRCode] = useState(false)
  const [quizId, setQuizId] = useState("")

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
      // In a real app, this would create a quiz and get an ID from the server
      const mockQuizId = `quiz_${Math.random().toString(36).substring(2, 10)}`
      setQuizId(mockQuizId)
      setShowQRCode(true)
    } else {
      alert("모든 항목을 선택해주세요.")
    }
  }

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <Header userType="teacher" userName="김선생님" />

      {/* Main content */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">퀴즈 생성</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            학교, 학년, 과목, 단원을 선택하여 자동으로 문제를 생성하세요.
          </p>
        </div>

        {!showQRCode ? (
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

              {/* Quiz type */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">문제 유형</label>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio h-4 w-4 text-indigo-600"
                      checked={quizType === "multiple"}
                      onChange={() => setQuizType("multiple")}
                    />
                    <span class="ml-2 text-gray-700">4지선다형</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio h-4 w-4 text-indigo-600"
                      checked={quizType === "truefalse"}
                      onChange={() => setQuizType("truefalse")}
                    />
                    <span class="ml-2 text-gray-700">OX 문제</span>
                  </label>
                </div>
              </div>

              {/* Question count */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">문제 수</label>
                <select
                  class="input-field w-full"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                >
                  <option value="3">3문제</option>
                  <option value="5">5문제</option>
                  <option value="10">10문제</option>
                  <option value="15">15문제</option>
                  <option value="20">20문제</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">난이도</label>
                <select
                  class="input-field w-full"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")}
                >
                  <option value="easy">쉬움</option>
                  <option value="medium">보통</option>
                  <option value="hard">어려움</option>
                </select>
              </div>

              {/* Time limit */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">시간 제한 (분)</label>
                <select
                  class="input-field w-full"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                >
                  <option value="0">제한 없음</option>
                  <option value="5">5분</option>
                  <option value="10">10분</option>
                  <option value="15">15분</option>
                  <option value="30">30분</option>
                </select>
              </div>
            </div>

            <div class="flex justify-center mt-8">
              <button
                class="btn-primary text-lg px-8 py-3"
                onClick={handleGenerateQuiz}
                disabled={!selectedChapter}
              >
                문제 생성하기
              </button>
            </div>
          </div>
        ) : (
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">퀴즈가 생성되었습니다!</h2>
              <p class="text-gray-600">아래 QR 코드를 학생들과 공유하여 퀴즈를 시작하세요.</p>
            </div>

            <div class="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
                <div class="mb-4 bg-white dark:bg-gray-600 p-4 rounded-lg inline-block">
                  {/* Mock QR code */}
                  <div class="h-48 w-48 bg-white dark:bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <div class="grid grid-cols-5 grid-rows-5 gap-1 h-40 w-40">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          class={`${Math.random() > 0.7 ? "bg-black" : "bg-white"} ${
                            (i < 5 && (i % 5 < 2 || i % 5 > 3)) ||
                            (i > 19 && (i % 5 < 2 || i % 5 > 3)) ||
                            (i % 5 === 0 && i > 4 && i < 20) ||
                            (i % 5 === 4 && i > 4 && i < 20)
                              ? "bg-black"
                              : ""
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-2">퀴즈 ID: {quizId}</p>
                <button class="btn-outline text-sm">QR 코드 다운로드</button>
              </div>

              <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg max-w-md">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">퀴즈 정보</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">학교:</span>
                    <span class="font-medium">{selectedSchool}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">학년:</span>
                    <span class="font-medium">{selectedGrade}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">과목:</span>
                    <span class="font-medium">{selectedSubject}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">단원:</span>
                    <span class="font-medium">{selectedChapter}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">문제 유형:</span>
                    <span class="font-medium">{quizType === "multiple" ? "4지선다형" : "OX 문제"}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">문제 수:</span>
                    <span class="font-medium">{questionCount}문제</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">난이도:</span>
                    <span class="font-medium">
                      {difficulty === "easy" ? "쉬움" : difficulty === "medium" ? "보통" : "어려움"}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">시간 제한:</span>
                    <span class="font-medium">{timeLimit === 0 ? "제한 없음" : `${timeLimit}분`}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
              <div class="mb-4 md:mb-0">
                <h3 class="text-lg font-medium text-gray-900 mb-2">퀴즈 링크</h3>
                <div class="flex items-center">
                  <input
                    type="text"
                    value={`https://quiz-generator.example.com/quiz/${quizId}`}
                    readOnly
                    class="input-field w-64 md:w-80"
                  />
                  <button class="ml-2 btn-outline">복사</button>
                </div>
              </div>

              <div class="flex space-x-4">
                <button onClick={() => setShowQRCode(false)} class="btn-outline">
                  다시 만들기
                </button>
                <Link to={`/quiz/results/${quizId}`} class="btn-primary">
                  결과 대시보드
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}