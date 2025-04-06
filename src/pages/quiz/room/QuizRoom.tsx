import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// 🔧 roomCode로 퀴즈 생성 (mock)
const generateMockQuiz = (roomCode: string) => {
  const quizType = Math.random() > 0.5 ? "multiple" : "truefalse";
  const title = `방 번호: ${roomCode} 문제`;

  const multipleQuestions = [
    {
      id: "q1",
      text: "다음 중 올바른 설명은?",
      options: [
        { id: "a", text: "지구는 태양계에서 가장 큰 행성이다." },
        { id: "b", text: "지구는 태양계에서 세 번째 행성이다." },
        { id: "c", text: "지구는 유일한 생명체 존재 행성이다." },
        { id: "d", text: "지구는 태양계에서 가장 뜨거운 행성이다." },
      ],
      correctAnswer: "b",
      explanation: "지구는 태양으로부터 세 번째 행성입니다. 가장 큰 행성은 목성입니다.",
    },
    {
      id: "q2",
      text: "삼각형의 내각의 합은?",
      options: [
        { id: "a", text: "90도" },
        { id: "b", text: "180도" },
        { id: "c", text: "270도" },
        { id: "d", text: "360도" },
      ],
      correctAnswer: "b",
      explanation: "삼각형의 내각의 합은 항상 180도입니다.",
    },
  ];

  const trueFalseQuestions = [
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
      explanation: "삼각형은 항상 180도입니다. 360도는 사각형입니다.",
    },
  ];

  return {
    title,
    type: quizType,
    questions: quizType === "multiple" ? multipleQuestions : trueFalseQuestions,
  };
};

export default function QuizRoom() {
  const { roomCode } = useParams();
  const router = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(string | boolean | null)[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  useEffect(() => {
    if (roomCode) {
      const mockQuiz = generateMockQuiz(roomCode);
      setQuiz(mockQuiz);
      setUserAnswers(new Array(mockQuiz.questions.length).fill(null));
    }
  }, [roomCode]);

  const handleAnswerSelect = (answer: string | boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setFeedbackVisible(true);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);

    setTimeout(() => setFeedbackVisible(false), 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    return quiz
      ? Math.round(
          (quiz.questions.filter((q: any, i: number) => q.correctAnswer === userAnswers[i]).length /
            quiz.questions.length) *
            100
        )
      : 0;
  };

  if (!quiz) {
    return (
      <div className="text-center mt-10">
        <p>퀴즈를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
        <div className="mb-4 text-xl">정답률: {score}%</div>
        <h2 className="text-lg font-semibold mb-2">오답 해설</h2>
        {quiz.questions.map((q: any, i: number) => {
          if (userAnswers[i] !== q.correctAnswer) {
            return (
              <div key={q.id} className="bg-gray-100 p-3 rounded mb-3">
                <p>
                  <strong>{i + 1}. {q.text}</strong>
                </p>
                <p className="text-sm mt-1">해설: {q.explanation}</p>
              </div>
            );
          }
          return null;
        })}
        <div className="mt-4 flex justify-between">
          <Link to="/" className="btn-outline">홈으로</Link>
          <button
            className="btn-primary"
            onClick={() => {
              const newQuiz = generateMockQuiz(roomCode!);
              setQuiz(newQuiz);
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setIsAnswered(false);
              setShowExplanation(false);
              setUserAnswers(new Array(newQuiz.questions.length).fill(null));
              setQuizCompleted(false);
            }}
          >
            다시 풀기
          </button>
        </div>
      </div>
    );
  }

  const current = quiz.questions[currentQuestionIndex];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-xl font-bold mb-4">{quiz.title}</h1>
        <div className="text-gray-600 mb-4">{currentQuestionIndex + 1} / {quiz.questions.length}</div>

        <div className="mb-4 text-lg font-medium">{currentQuestionIndex + 1}. {current.text}</div>

        {quiz.type === "multiple" ? (
          <div className="space-y-3">
            {current.options.map((opt: any) => (
              <button
                key={opt.id}
                onClick={() => handleAnswerSelect(opt.id)}
                disabled={isAnswered}
                className={`block w-full text-left p-3 border rounded ${
                  selectedAnswer === opt.id
                    ? isAnswered && opt.id === current.correctAnswer
                      ? "bg-green-100 border-green-400"
                      : isAnswered
                        ? "bg-red-100 border-red-400"
                        : "bg-blue-100 border-blue-400"
                    : "border-gray-300"
                }`}
              >
                <span className="mr-2 font-bold">{opt.id}.</span> {opt.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-4">
            {["참", "거짓"].map((label, idx) => {
              const val = idx === 0;
              return (
                <button
                  key={label}
                  onClick={() => handleAnswerSelect(val)}
                  disabled={isAnswered}
                  className={`flex-1 p-3 border rounded ${
                    selectedAnswer === val
                      ? isAnswered && val === current.correctAnswer
                        ? "bg-green-100 border-green-400"
                        : isAnswered
                          ? "bg-red-100 border-red-400"
                          : "bg-blue-100 border-blue-400"
                      : "border-gray-300"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {isAnswered && showExplanation && (
          <div className="mt-4 text-sm bg-blue-50 border border-blue-200 p-3 rounded">
            <strong>해설:</strong> {current.explanation}
          </div>
        )}

        <div className="mt-4 flex justify-between">
          {isAnswered && !showExplanation && (
            <button onClick={() => setShowExplanation(true)} className="btn-outline">
              해설 보기
            </button>
          )}
          {isAnswered && (
            <button onClick={handleNextQuestion} className="btn-primary">
              {currentQuestionIndex < quiz.questions.length - 1 ? "다음 문제" : "결과 보기"}
            </button>
          )}
          {!isAnswered && (
            <button onClick={() => router("/")} className="btn-outline">
              나가기
            </button>
          )}
        </div>
      </div>

      {feedbackVisible && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className={`text-9xl ${selectedAnswer === current.correctAnswer ? "text-green-500" : "text-red-500"} animate-pulse`}>
            {selectedAnswer === current.correctAnswer ? "O" : "X"}
          </div>
        </div>
      )}
    </div>
  );
}
