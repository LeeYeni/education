import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Header from "@_components/header"
import { Sparkles, QrCode, BarChart3 } from "lucide-react";

export default function Home() {
  const router = useNavigate()

  // School, grade, subject, and chapter data
  const schools = ["초등학교"]
  const grades = {
    초등학교: ["3학년", "4학년", "5학년", "6학년"]
  }
  const subjects = {
    초등학교: ["수학"]
  }

  // State for selections
  const [selectedSchool, setSelectedSchool] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedChapter, setSelectedChapter] = useState("")

  //room-code
  const [roomCode, setRoomCode] = useState("");

  // Mock chapters based on subject selection
  const getChapters = () => {
    if (!selectedSubject) return []

    // This would normally come from an API or database
    const mockChaptersByGrade = {
      "3학년": ["수와 연산", "도형과 측정", "자료와 가능성"],
      "4학년": ["수와 연산", "변화와 관계", "도형과 측정", "자료와 가능성"],
      "5학년": ["자연수의 혼합계산", "약수와 배수", "규칙과 대응", "약분과 통분", "분수의 덧셈과 뺄셈", "다각형의 둘레와 넓이", "수의 범위와 어림하기", "분수의 곱셈", "합동과 대칭", "소수의 곱셈", "직육면체", "평균과 가능성"],
      "6학년": ["분수의 나눗셈(1)", "각기둥과 각뿔", "소수의 나눗셈(1)", "비와 비율", "여러 가지 그래프", "직육면체의 겉넓이와 부피", "분수의 나눗셈(2)", "소수의 나눗셈(2)", "공간과 입체", "비례식과 비례배분", "원의 둘레와 넓이", "원기둥,원뿔,구"],
    };


    return mockChaptersByGrade[selectedGrade as keyof typeof mockChaptersByGrade] || []
  }

  const handleGenerateQuiz = async () => {
    if (selectedSchool && selectedGrade && selectedSubject && selectedChapter) {
      const data = {
        school: selectedSchool,
        grade: selectedGrade,
        subject: selectedSubject,
        chapter: selectedChapter,
        roomCode: roomCode,
      }

      try {
        const response = await fetch("/api/quiz/log", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

    if (response.ok) {
            router(`/quiz/share/${roomCode}`); // ➡ 문제 공유 화면으로 이동
          } else {
            alert("문제 생성에 실패했습니다.");
          }
        } catch (error) {
          alert("서버와의 통신 중 오류가 발생했습니다.");
          console.error("❌ 오류:", error);
        }
      } else {
        alert("모든 항목과 방 번호를 입력해주세요.");
      }
    };

  return (
    <div class="min-h-screen flex flex-col">
      <Header />

      <main class="flex-grow flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
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
              <label class="block text-sm font-medium text-gray-700 mb-1">대단원</label>
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

          {/* Room code input */}
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">방 번호</label>
            <input
              class="input-field w-full"
              type="text"
              placeholder="예: abc123"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
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
      </main>
    </div>
  )
}