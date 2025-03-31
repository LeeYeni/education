const mockQuizResults = {
  id: "quiz_abc123",
  title: "중학교 1학년 수학 - 도형",
  date: "2023-05-15",
  totalStudents: 30,
  participatedStudents: 28,
  averageScore: 85,
  questions: [
    {
      id: "q1",
      text: "다음 중 올바른 설명은?",
      correctAnswer: "b",
      correctCount: 24,
      wrongCount: 4,
      options: [
        { id: "a", text: "지구는 태양계에서 가장 큰 행성이다.", count: 2 },
        { id: "b", text: "지구는 태양계에서 세 번째 행성이다.", count: 24 },
        { id: "c", text: "지구는 태양계에서 유일하게 생명체가 존재하는 행성이다.", count: 1 },
        { id: "d", text: "지구는 태양계에서 가장 뜨거운 행성이다.", count: 1 }
      ]
    },
    {
      id: "q2",
      text: "다음 중 삼각형의 내각의 합은?",
      correctAnswer: "b",
      correctCount: 26,
      wrongCount: 2,
      options: [
        { id: "a", text: "90도", count: 1 },
        { id: "b", text: "180도", count: 26 },
        { id: "c", text: "270도", count: 0 },
        { id: "d", text: "360도", count: 1 }
      ]
    },
    {
      id: "q3",
      text: "다음 중 물의 화학식은?",
      correctAnswer: "a",
      correctCount: 27,
      wrongCount: 1,
      options: [
        { id: "a", text: "H2O", count: 27 },
        { id: "b", text: "CO2", count: 0 },
        { id: "c", text: "O2", count: 0 },
        { id: "d", text: "H2O2", count: 1 }
      ]
    },
    {
      id: "q4",
      text: "다음 중 한글을 창제한 조선의 왕은?",
      correctAnswer: "b",
      correctCount: 25,
      wrongCount: 3,
      options: [
        { id: "a", text: "태조", count: 1 },
        { id: "b", text: "세종대왕", count: 25 },
        { id: "c", text: "정조", count: 2 },
        { id: "d", text: "고종", count: 0 }
      ]
    },
    {
      id: "q5",
      text: "다음 중 영어 알파벳의 개수는?",
      correctAnswer: "c",
      correctCount: 20,
      wrongCount: 8,
      options: [
        { id: "a", text: "24개", count: 3 },
        { id: "b", text: "25개", count: 2 },
        { id: "c", text: "26개", count: 20 },
        { id: "d", text: "27개", count: 3 }\
