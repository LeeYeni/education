import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export default function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const quizId = new URLSearchParams(location.search).get("quizId");

  useEffect(() => {
    // Mock quiz data based on quizId (In real case, fetch from server)
    const mockQuiz = {
      title: `Sample Quiz`,
      questions: [
        {
          id: "q1",
          text: "What is the capital of France?",
          options: [
            { id: "a", text: "Berlin" },
            { id: "b", text: "Madrid" },
            { id: "c", text: "Paris" },
            { id: "d", text: "Rome" },
          ],
          correctAnswer: "c",
          explanation: "Paris is the capital of France.",
        },
        {
          id: "q2",
          text: "Which of these is the largest planet?",
          options: [
            { id: "a", text: "Earth" },
            { id: "b", text: "Jupiter" },
            { id: "c", text: "Mars" },
            { id: "d", text: "Venus" },
          ],
          correctAnswer: "b",
          explanation: "Jupiter is the largest planet in our solar system.",
        },
      ],
    };

    setQuiz(mockQuiz);

    // Set a mock password for accessing the quiz
    setPassword("123456");
  }, [quizId]);

  const handleSubmitPassword = () => {
    if (enteredPassword === password) {
      setIsPasswordValid(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("퀴즈가 끝났습니다.");
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (!isPasswordValid) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">퀴즈에 접근하려면 비밀번호를 입력하세요</h2>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            className="border px-4 py-2 rounded mb-4"
          />
          <button
            onClick={handleSubmitPassword}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            비밀번호 확인
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold mb-4">{quiz.title}</h1>

        <h2 className="text-lg mb-4">{currentQuestion.text}</h2>

        <div className="space-y-2">
          {currentQuestion.options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              className={`w-full p-4 rounded-lg border ${
                userAnswers[currentQuestionIndex] === option.id
                  ? "bg-indigo-500 text-white"
                  : "bg-white"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={handleNextQuestion}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            {currentQuestionIndex < quiz.questions.length - 1
              ? "다음 문제"
              : "퀴즈 종료"}
          </button>
        </div>
      </div>
    </div>
  );
}
