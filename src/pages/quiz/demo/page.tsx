import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

// Mock quiz data generator
const generateMockQuiz = (school: string, grade: string, subject: string, chapter: string) => {
  // This would be replaced with an actual API call to generate questions
  const quizType = Math.random() > 0.5 ? "multiple" : "truefalse"

  if (quizType === "multiple") {
    return {
      title: `${school} ${grade} ${subject} - ${chapter}`,
      type: "multiple",
      questions: [
        {
          id: "q1",
          text: "다음 중 올바른 설명은?",
          options: [
            { id: "a", text: "지구는 태양계에서 가장 큰 행성이다." },
            { id: "b", text: "지구는 태양계에서 세 번째 행성이다." },
            { id: "c", text: "지구는 태양계에서 유일하게 생명체가 존재하는 행성이다." },
            { id: "d", text: "지구는 태양계에서 가장 뜨거운 행성이다." },
          ],
          correctAnswer: "b",
          explanation:
            "지구는 태양으로부터 세 번째 위치에 있는 행성입니다. 태양계에서 가장 큰 행성은 목성이며, 다른 행성에도 생명체가 존재할 가능성이 있습니다.",
        },
        {
          id: "q2",
          text: "다음 중 삼각형의 내각의 합은?",
          options: [
            { id: "a", text: "90도" },
            { id: "b", text: "180도" },
            { id: "c", text: "270도" },
            { id: "d", text: "360도" },
          ],
          correctAnswer: "b",
          explanation: "삼각형의 내각의 합은 항상 180도입니다. 이는 기하학의 기본 원리 중 하나입니다.",
        },
        {
          id: "q3",
          text: "다음 중 물의 화학식은?",
          options: [
            { id: "a", text: "H2O" },
            { id: "b", text: "CO2" },
            { id: "c", text: "O2" },
            { id: "d", text: "H2O2" },
          ],
          correctAnswer: "a",
          explanation: "물의 화학식은 H2O로, 수소 원자 2개와 산소 원자 1개로 구성되어 있습니다.",
        },
        {
          id: "q4",
          text: "다음 중 한글을 창제한 조선의 왕은?",
          options: [
            { id: "a", text: "태조" },
            { id: "b", text: "세종대왕" },
            { id: "c", text: "정조" },
            { id: "d", text: "고종" },
          ],
          correctAnswer: "b",
          explanation: "한글은 조선의 제4대 왕인 세종대왕(1397-1450)에 의해 창제되었으며, 1446년에 반포되었습니다.",
        },
        {
          id: "q5",
          text: "다음 중 영어 알파벳의 개수는?",
          options: [
            { id: "a", text: "24개" },
            { id: "b", text: "25개" },
            { id: "c", text: "26개" },
            { id: "d", text: "27개" },
          ],
          correctAnswer: "c",
          explanation: "영어 알파벳은 A부터 Z까지 총 26개의 문자로 구성되어 있습니다.",
        },
      ],
    }
  } else {
    return {
      title: `${school} ${grade} ${subject} - ${chapter}`,
      type: "truefalse",
      questions: [
        {
          id: "q1",
          text: "지구는 태양계에서 세 번째 행성이다.",
          correctAnswer: true,
          explanation: "지구는 태양으로부터 세 번째 위치에 있는 행성입니다.",
        },
        {
          id: "q2",
          text: "삼각형의 내각의 합은 360도이다.",
          correctAnswer: false,
          explanation: "삼각형의 내각의 합은 180도입니다. 360도는 사각형의 내각의 합입니다.",
        },
        {
          id: "q3",
          text: "물의 화학식은 H2O이다.",
          correctAnswer: true,
          explanation: "물의 화학식은 H2O로, 수소 원자 2개와 산소 원자 1개로 구성되어 있습니다.",
        },
        {
          id: "q4",
          text: "한글은 세종대왕이 창제하였다.",
          correctAnswer: true,
          explanation: "한글은 조선의 제4대 왕인 세종대왕(1397-1450)에 의해 창제되었으며, 1446년에 반포되었습니다.",
        },
        {
          id: "q5",
          text: "영어 알파벳은 총 24개이다.",
          correctAnswer: false,
          explanation: "영어 알파벳은 A부터 Z까지 총 26개의 문자로 구성되어 있습니다.",
        },
      ],
    }
  }
}

export default function QuizDemo() {
  const router = useNavigate()
  const searchParams = useLocation()

  const school = searchParams.get("school") || ""
  const grade = searchParams.get("grade") || ""
  const subject = searchParams.get("subject") || ""
  const chapter = searchParams.get("chapter") || ""

  const [quiz, setQuiz] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userAnswers, setUserAnswers] = useState<(string | boolean | null)[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [feedbackVisible, setFeedbackVisible] = useState(false)

  useEffect(() => {
    // Generate mock quiz data
    const mockQuiz = generateMockQuiz(school, grade, subject, chapter)
    setQuiz(mockQuiz)

    // Initialize user answers array
    setUserAnswers(new Array(mockQuiz.questions.length).fill(null))
  }, [school, grade, subject, chapter])

  const handleAnswerSelect = (answer: string | boolean) => {
    if (isAnswered) return

    setSelectedAnswer(answer)
    setIsAnswered(true)

    // Show feedback
    setFeedbackVisible(true)

    // Update user answers
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestionIndex] = answer
    setUserAnswers(newUserAnswers)

    // Hide feedback after 1 second
    setTimeout(() => {
      setFeedbackVisible(false)
    }, 1000)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const calculateScore = () => {
    if (!quiz) return 0

    let correctCount = 0
    quiz.questions.forEach((question: any, index: number) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    return Math.round((correctCount / quiz.questions.length) * 100)
  }

  if (!quiz) {
    return (
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
          <p class="mt-4 text-lg text-gray-700 dark:text-gray-300">퀴즈를 생성하는 중입니다...</p>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    const score = calculateScore()

    return (
      <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div class="bg-indigo-600 dark:bg-indigo-700 px-6 py-4">
              <h1 class="text-xl font-bold text-white">{quiz.title}</h1>
            </div>

            <div class="p-6">
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center h-24 w-24 rounded-full bg-indigo-100 text-indigo-600 text-3xl font-bold mb-4">
                  {score}%
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                  {score >= 80 ? "훌륭해요!" : score >= 60 ? "좋은 시도예요!" : "다시 도전해보세요!"}
                </h2>
                <p class="text-gray-600">
                  {quiz.questions.length}개 문제 중 {Math.round((score / 100) * quiz.questions.length)}개 맞았습니다.
                </p>
              </div>

              <div class="space-y-6 mb-8">
                <h3 class="text-lg font-medium text-gray-900">오답 노트</h3>

                {quiz.questions.map((question: any, index: number) => {
                  const isCorrect = userAnswers[index] === question.correctAnswer

                  if (!isCorrect) {
                    return (
                      <div key={question.id} class="bg-gray-50 p-4 rounded-md">
                        <p class="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.text}
                        </p>

                        {quiz.type === "multiple" ? (
                          <div class="ml-4 mb-2">
                            {question.options.map((option: any) => (
                              <div key={option.id} class="flex items-start">
                                <div
                                  class={`flex-shrink-0 mt-0.5 ${option.id === question.correctAnswer ? "text-green-600" : option.id === userAnswers[index] ? "text-red-600" : "text-gray-400"}`}
                                >
                                  {option.id === question.correctAnswer ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : option.id === userAnswers[index] ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : (
                                    <span class="inline-block h-5 w-5 text-center">{option.id}.</span>
                                  )}
                                </div>
                                <span
                                  class={`ml-2 ${option.id === question.correctAnswer ? "text-green-600 font-medium" : option.id === userAnswers[index] ? "text-red-600" : "text-gray-500"}`}
                                >
                                  {option.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div class="ml-4 mb-2 flex space-x-4">
                            <div
                              class={`flex items-center ${question.correctAnswer ? "text-green-600 font-medium" : "text-gray-500"}`}
                            >
                              <div
                                class={`flex-shrink-0 ${question.correctAnswer ? "text-green-600" : userAnswers[index] === true ? "text-red-600" : "text-gray-400"}`}
                              >
                                {question.correctAnswer ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <span>O</span>
                                )}
                              </div>
                              <span class="ml-1">참</span>
                            </div>

                            <div
                              class={`flex items-center ${!question.correctAnswer ? "text-green-600 font-medium" : "text-gray-500"}`}
                            >
                              <div
                                class={`flex-shrink-0 ${!question.correctAnswer ? "text-green-600" : userAnswers[index] === false ? "text-red-600" : "text-gray-400"}`}
                              >
                                {!question.correctAnswer ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <span>X</span>
                                )}
                              </div>
                              <span class="ml-1">거짓</span>
                            </div>
                          </div>
                        )}

                        <div class="mt-2 text-sm bg-blue-50 dark:bg-blue-900/30 p-3 rounded text-blue-800 dark:text-blue-300">
                          <span class="font-medium">해설:</span> {question.explanation}
                        </div>
                      </div>
                    )
                  }

                  return null
                })}
              </div>

              <div class="flex justify-between">
                <Link to="/dashboard" class="btn-outline">
                  대시보드로 돌아가기
                </Link>

                <button
                  onClick={() => {
                    setQuiz(generateMockQuiz(school, grade, subject, chapter))
                    setCurrentQuestionIndex(0)
                    setSelectedAnswer(null)
                    setIsAnswered(false)
                    setShowExplanation(false)
                    setUserAnswers(new Array(quiz.questions.length).fill(null))
                    setQuizCompleted(false)
                  }}
                  class="btn-primary"
                >
                  다시 풀기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div class="bg-indigo-600 dark:bg-indigo-700 px-6 py-4 flex justify-between items-center">
            <h1 class="text-xl font-bold text-white">{quiz.title}</h1>
            <div class="text-white">
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </div>
          </div>

          <div class="p-6">
            {/* Progress bar */}
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                class="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question */}
            <div class="mb-8">
              <h2 class="text-xl font-bold text-gray-900 mb-4">
                {currentQuestionIndex + 1}. {currentQuestion.text}
              </h2>

              {/* Multiple choice options */}
              {quiz.type === "multiple" && (
                <div class="space-y-3">
                  {currentQuestion.options.map((option: any) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      disabled={isAnswered}
                      class={`w-full text-left p-4 rounded-lg border ${
                        selectedAnswer === option.id
                          ? isAnswered && option.id === currentQuestion.correctAnswer
                            ? "bg-green-50 dark:bg-green-900/30 border-green-500"
                            : isAnswered
                              ? "bg-red-50 dark:bg-red-900/30 border-red-500"
                              : "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500"
                          : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      } transition-colors`}
                    >
                      <div class="flex items-center">
                        <div
                          class={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center border ${
                            selectedAnswer === option.id
                              ? isAnswered && option.id === currentQuestion.correctAnswer
                                ? "border-green-500 text-green-500"
                                : isAnswered
                                  ? "border-red-500 text-red-500"
                                  : "border-indigo-500 text-indigo-500"
                              : "border-gray-300 text-gray-500"
                          }`}
                        >
                          {option.id}
                        </div>
                        <span class="ml-3">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* True/False options */}
              {quiz.type === "truefalse" && (
                <div class="flex space-x-4">
                  <button
                    onClick={() => handleAnswerSelect(true)}
                    disabled={isAnswered}
                    class={`flex-1 p-4 rounded-lg border ${
                      selectedAnswer === true
                        ? isAnswered && currentQuestion.correctAnswer
                          ? "bg-green-50 border-green-500"
                          : isAnswered
                            ? "bg-red-50 border-red-500"
                            : "bg-indigo-50 border-indigo-500"
                        : "border-gray-300 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <div class="text-center text-lg font-medium">참 (O)</div>
                  </button>

                  <button
                    onClick={() => handleAnswerSelect(false)}
                    disabled={isAnswered}
                    class={`flex-1 p-4 rounded-lg border ${
                      selectedAnswer === false
                        ? isAnswered && !currentQuestion.correctAnswer
                          ? "bg-green-50 border-green-500"
                          : isAnswered
                            ? "bg-red-50 border-red-500"
                            : "bg-indigo-50 border-indigo-500"
                        : "border-gray-300 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <div class="text-center text-lg font-medium">거짓 (X)</div>
                  </button>
                </div>
              )}
            </div>

            {/* Feedback */}
            {feedbackVisible && (
              <div class="fixed inset-0 flex items-center justify-center pointer-events-none">
                <div
                  class={`text-9xl ${selectedAnswer === currentQuestion.correctAnswer ? "text-green-500" : "text-red-500"} animate-pulse`}
                >
                  {selectedAnswer === currentQuestion.correctAnswer ? "O" : "X"}
                </div>
              </div>
            )}

            {/* Explanation */}
            {isAnswered && showExplanation && (
              <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-800 dark:text-blue-300">
                <h3 class="font-bold mb-1">해설</h3>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div class="flex justify-between">
              {isAnswered && !showExplanation && (
                <button onClick={() => setShowExplanation(true)} class="btn-outline">
                  해설 보기
                </button>
              )}

              {!isAnswered && (
                <button onClick={() => router.push("/dashboard")} class="btn-outline">
                  나가기
                </button>
              )}

              {isAnswered && (
                <button onClick={handleNextQuestion} class="btn-primary">
                  {currentQuestionIndex < quiz.questions.length - 1 ? "다음 문제" : "결과 보기"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}